"use client";
import { Vector3 } from "three";
import { useUser } from "../../hooks/useZustand";
import { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PointerLockControls from "./PointerLockControls";
import { Mesh, BufferGeometry, NormalBufferAttributes } from "three";
import { useShallow } from "zustand/react/shallow";
import regainPointer from "@/helpers/regainPointer";
import OSC from "osc-js";

const SPEED = 0.01;
const keys = {
  KeyE: "god",
  KeyC: "free",
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  Space: "fast",
  KeyH: "help",
};
const moveFieldByKey = (key: keyof typeof keys) => keys[key];
// Distance from the ground from god view
const topView = new Vector3(0, 0, 20);
const lock = new Vector3(0, 0, 0);
const front = new Vector3(0, 0, -1);
const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    god: false,
    free: false,
    forward: false,
    backward: false,
    left: false,
    right: false,
    fast: false,
    help: false,
  });
  useEffect(() => {
    const handleKeyDown = (e: { code: any }) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e: { code: any }) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
};

export default function Player() {
  const direction = useRef(new Vector3());
  const frontVector = useRef(new Vector3());
  const sideVector = useRef(new Vector3());
  // const [ref, api] = useSphere(() => ({ mass: 1, type: 'Dynamic', position: [0, 10, 0], ...props }))
  const meshRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );

  const { fast, forward, backward, left, right, god, help, free } =
    usePlayerControls();
  const [godMode, freeState, about, osc, setPos, started, connected] = useUser(
    useShallow((s) => [
      s.god,
      s.free,
      s.about,
      s.osc,
      s.setPos,
      s.started,
      s.connected,
    ])
  );

  // god mode toggle
  useEffect(() => {
    if (!god || !started) return;
    useUser.getState().setZus("god", !godMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [god]);

  // free mode toggle
  useEffect(() => {
    if (!free || !started) return;
    useUser.getState().setZus("free", !freeState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [free]);

  // Regain Pointer after getting out of first person mode
  useEffect(() => {
    if (!godMode) return;
    regainPointer();
    timeout.current = 0;
    camera.lookAt(0, 0, 0);
    if (!connected) return;
    // return to origin
    const xyz = new OSC.Message("/listener/xyz", 0, 0, 0);
    const dir = new OSC.Message("/listener/orientation", 0, 0, 0, 1);
    const bundle = new OSC.Bundle(xyz, dir);
    osc?.send(bundle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [godMode]);

  // Regain Pointer after getting out of canvas
  useEffect(() => {
    if (!help || !started) return;
    regainPointer();
    useUser.getState().setZus("about", !about);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [help]);

  useEffect(() => {
    if (!about) return;
    regainPointer();
  }, [about]);

  // Three.js Code

  const { camera } = useThree();

  const timeout = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    !freeState && meshRef.current.position.copy(lock);
    !godMode && meshRef.current.getWorldPosition(camera.position);
    // Lazy to set timeout

    if (godMode && timeout.current < 1) {
      timeout.current += delta;
      camera.position.lerp(topView, 0.05);
    }

    if (freeState) {
      frontVector.current.set(0, 0, Number(backward) - Number(forward));
      sideVector.current.set(Number(left) - Number(right), 0, 0);
      direction.current
        .subVectors(frontVector.current, sideVector.current)
        .normalize()
        .multiplyScalar(fast ? SPEED * 4 : SPEED)
        .applyEuler(camera.rotation);
      direction.current.z = 0;
      // speed.current.fromArray(velocity.current)
      meshRef.current.position.add(direction.current);
    }
    if (!connected || godMode) return;
    const quat = camera.quaternion;
    const posVec = meshRef.current.position;
    setPos([posVec.x, posVec.y, posVec.z]);
    // Change to SPAT XYZ convention
    const xyz = new OSC.Message("/listener/xyz", posVec.x, posVec.y, posVec.z);
    // For some reason x and z has to be negated, I didn't do calculations since I don't fully understand them
    // Right now the rotation on the XY plane is definitely correct, just not sure for the vertical axis
    const dir = new OSC.Message(
      "/listener/orientation",
      // -quat.z,
      // quat.x,
      // -quat.y,
      // quat.w
      -quat.x,
      quat.y,
      -quat.z,
      quat.w
    );
    const bundle = new OSC.Bundle(xyz, dir);
    osc?.send(bundle);
  });

  return (
    <>
      <mesh position={[0, 0, 0]} ref={meshRef} visible={false} />

      {godMode ? <OrbitControls makeDefault /> : null}
      {!godMode && !about && <PointerLockControls makeDefault />}
    </>
  );
}
