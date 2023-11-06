import {
  Vector3,
  MeshPhongMaterial,
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
} from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useUser } from "@/hooks/useZustand";

export default function SpeakerSource({ index }: { index: number }) {
  const osc = useUser((s) => s.osc);
  useEffect(() => {
    if (useUser.getState().speakerColor[index]) return;
    useUser
      .getState()
      .setNestedZus("speakerColor", index, { r: 125, g: 125, b: 125, a: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!osc) return;
    const xyz = osc.on(
      "/speaker/" + index + "/xyz",
      (message: { args: any }) => {
        vec.current.fromArray([
          message.args[0],
          message.args[2],
          -message.args[1],
        ]);
      }
    );
    const color = osc.on(
      "/speaker/" + index + "/color",
      (message: { args: any }) => {
        useUser
          .getState()
          .setNestedZus("speakerColor", index, {
            r: message.args[0] * 255,
            g: message.args[1] * 255,
            b: message.args[2] * 255,
            a: message.args[3],
          });
      }
    );
    return () => {
      osc.off("/speaker/" + index + "/xyz", xyz);
      osc.off("/speaker/" + index + "/color", color);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osc]);

  const box = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(null);
  const mat = useRef<MeshPhongMaterial | null>(null);
  const vec = useRef<Vector3>(
    new Vector3(...[Math.random() * 5, Math.random() * 5, Math.random() * 5])
  );
  const speakerColor = useUser((s) => s.speakerColor[index]);
  // Randomize Starting Point to avoid Clash and Lag during initialization
  // const vec = new Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100)
  useFrame(() => {
    if (!box.current || !mat.current) return;
    mat.current.opacity = speakerColor?.a ? speakerColor?.a : 1;
    if (
      !vec.current.equals(box.current.position) &&
      !(mat.current.opacity > 0)
    ) {
      box.current.position.copy(vec.current);
      return;
    }
    if (!vec.current.equals(box.current.position)) {
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish,
      // hence the distance check to change the lerp factor
      if (box.current.position.distanceTo(vec.current) > 0.001) {
        box.current.position.lerp(vec.current, 0.1);
      } else {
        box.current.position.lerp(vec.current, 0.6);
      }
    }
  });

  return (
    <mesh ref={box}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshPhongMaterial
        ref={mat}
        transparent={true}
        color={`rgb(${speakerColor?.r}, ${speakerColor?.g}, ${speakerColor?.b})`}
      />
    </mesh>
  );
}
