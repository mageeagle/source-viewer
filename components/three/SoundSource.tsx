import {
  Vector3,
  MeshPhongMaterial,
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Color,
} from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import { setUser, subKey, useUser } from "@/hooks/useZustand";
import { useShallow } from "zustand/react/shallow";

export default function SoundSource({
  index,
  editor,
}: {
  index: number;
  editor?: boolean;
}) {
  const ball = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const mat = useRef<MeshPhongMaterial | null>(null);
  const posVec = useRef<Vector3>(
    new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5)
  );
  const color = useRef(new Color());
  // Workaround to avoid setting state for OSC
  const alpha = useRef(new Vector3(1, 1, 1));
  const activeID = useRef(useUser.getState().activeID);
  const activeGroup = useRef(useUser.getState().activeGroup);
  const activeObj = useRef(useUser.getState().activeObj);
  const sourceFade = useRef(useUser.getState().sourceFade);
  const [sourceNumDisplay, sourceSize] = useUser(
    useShallow((s) => [s.sourceNumDisplay, s.sourceSize])
  );
  useEffect(() => {
    const setZus = useUser.getState().setNestedZus;
    setZus("sourceColor", index, color.current);
    setZus("sourcePos", index, posVec.current);
    setZus("sourceAlpha", index, alpha.current);
    subKey(useUser, activeID, "activeID");
    subKey(useUser, activeGroup, "activeGroup");
    subKey(useUser, activeObj, "activeObj");
    subKey(useUser, sourceFade, "sourceFade");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Limiting Changes to Frame Rate
  useFrame((_, delta) => {
    if (!ball.current || !mat.current || !color.current) return;
    // Alpha Check
    const alphaCheck = () => {
      if (!mat.current) return;
      if (!(mat.current.opacity === alpha.current.x)) {
        if (
          mat.current.opacity > alpha.current.x &&
          mat.current.opacity - alpha.current.x < 0.1
        )
          mat.current.opacity = alpha.current.x;
        if (
          mat.current.opacity < alpha.current.x &&
          mat.current.opacity - alpha.current.x > -0.1
        )
          mat.current.opacity = alpha.current.x;
        if (
          mat.current.opacity > alpha.current.x &&
          mat.current.opacity - alpha.current.x > 0.1
        )
          mat.current.opacity -= 0.1;
        if (
          mat.current.opacity < alpha.current.x &&
          mat.current.opacity - alpha.current.x < -0.1
        )
          mat.current.opacity += 0.1;
      }
    };

    // Note: Lerping here only works from Color/Vector3
    // I would refrain from creating new Vector3/Color so there is a useRef with Vector3/Color inside
    // That is Changed / Compared instead

    // Source Fade
    if (!editor) {
      if (
        sourceFade.current &&
        mat.current.opacity > 0 &&
        posVec.current.equals(ball.current.position)
      ) {
        mat.current.opacity -= 0.1;
      }
    }
    if (posVec.current.equals(ball.current.position) && !sourceFade.current)
      alphaCheck();
    // Display source once it starts moving
    if (
      !posVec.current.equals(ball.current.position) &&
      !(mat.current.opacity > 0)
    ) {
      ball.current.position.lerp(posVec.current, 0.1);
      // Alpha Check
      if (!(mat.current.opacity === alpha.current.x)) {
        if (
          mat.current.opacity < alpha.current.x &&
          mat.current.opacity - alpha.current.x > -0.1
        )
          mat.current.opacity = alpha.current.x;
        if (
          mat.current.opacity < alpha.current.x &&
          mat.current.opacity - alpha.current.x < -0.1
        )
          mat.current.opacity += 0.1;
      }
      return;
    }

    // Move to new position
    if (
      !posVec.current.equals(ball.current.position) &&
      !(activeID.current === index && activeGroup.current === "source")
    ) {
      alphaCheck();
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish,
      // hence the distance check to change the lerp factor
      if (ball.current.position.distanceTo(posVec.current) > 0.001) {
        ball.current.position.lerp(posVec.current, 0.1);
      } else {
        ball.current.position.lerp(posVec.current, 0.6);
      }
    }

    // Move to new color
    if (!color.current.equals(mat.current.color)) {
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish,
      // hence the distance check to change the lerp factor
      mat.current.color.lerp(color.current, 0.3);
    }
    if (activeID.current === index && activeGroup.current === "source") {
      posVec.current.copy(ball.current.position);
      if (activeObj.current) {
        if (ball.current.uuid !== activeObj.current.uuid)
          setUser("activeObj", ball.current);
      }
    }
  });
  const click = useCallback(() => {
    if (!editor) return;
    setUser("activeID", index);
    setUser("activeObj", ball.current);
    setUser("activeGroup", "source");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const size = useMemo(() => sourceSize / 1000, [sourceSize]);

  useEffect(() => {
    if (!alpha.current) return
    if (!sourceNumDisplay) {
      alpha.current.setX(1)
      return
    }
    alpha.current.setX(0.5)
  }, [sourceNumDisplay])

  return (
    <>
      <mesh ref={ball} frustumCulled={false} onClick={click}>
        <sphereGeometry args={[size, 32, 16]} />
        <meshPhongMaterial ref={mat} transparent={true} />
          <Center visible={sourceNumDisplay}>
            <Text3D
              size={size}
              height={0.01}
              font={"HKGrotesk_Bold.json"}
            >
              <meshPhongMaterial depthWrite={false} />
              {index}
            </Text3D>
          </Center>
      </mesh>
    </>
  );
}
