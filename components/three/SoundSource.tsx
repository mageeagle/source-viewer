import {
  Vector3,
  MeshPhongMaterial,
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Color,
} from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useUser, subNestedKey } from "@/hooks/useZustand";
import { deepEqual } from "fast-equals";

export default function SoundSource({ index }: { index: number }) {
  const sourceFade = useUser((s) => s.sourceFade);
  const ball = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const mat = useRef<MeshPhongMaterial | null>(null);
  const posVec = useRef<Vector3>(
    new Vector3(...[Math.random() * 5, Math.random() * 5, Math.random() * 5])
  );
  const color = useRef(new Color());
  const alpha = useRef(1);
  const newColor = useRef([0, 0, 0]);
  const newPos = useRef([
    Math.random() * 5,
    Math.random() * 5,
    Math.random() * 5,
  ]);

  useEffect(() => {
    if (!useUser.getState().sourceColor[index]) {
      useUser.getState().setNestedZus("sourceColor", index, [1, 1, 1]);
    }
    if (!useUser.getState().sourcePos[index]) {
      useUser
        .getState()
        .setNestedZus("sourcePos", index, [
          Math.random() * 5,
          Math.random() * 5,
          Math.random() * 5,
        ]);
    }
    if (!useUser.getState().sourceAlpha[index]) {
      useUser.getState().setNestedZus("sourceAlpha", index, 1);
    }
    if (useUser.getState().sourcePos[index]) {
      newPos.current = useUser.getState().sourcePos[index];
    }
    if (!useUser.getState().sourceAlpha[index]) {
      useUser.getState().setNestedZus("sourceAlpha", index, 1);
    }
    if (useUser.getState().sourceAlpha[index]) {
      alpha.current = useUser.getState().sourceAlpha[index];
    }
    subNestedKey(useUser, newColor, "sourceColor", index);
    subNestedKey(useUser, newPos, "sourcePos", index);
    subNestedKey(useUser, alpha, "sourceAlpha", index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!mat.current) return;
  //   if (sourceFade === false) mat.current.opacity = alpha.current;
  // }, [sourceFade]);

  // Limiting Changes to Frame Rate
  useFrame((_, delta) => {
    if (!ball.current || !mat.current || !color.current) return;
    // Color Check
    if (
      !deepEqual(color.current.toArray(), newColor.current) &&
      newColor.current
    ) {
      color.current.fromArray(newColor.current);
    }
    // Position Check
    if (
      !deepEqual(newPos.current, ball.current.position.toArray()) &&
      newPos.current
    ) {
      posVec.current.fromArray(newPos.current);
    }

    // Alpha Check
    const alphaCheck = () => {
      if (!mat.current) return;
      if (!(mat.current.opacity === alpha.current)) {
        if (
          mat.current.opacity > alpha.current &&
          mat.current.opacity - alpha.current < 0.1
        )
          mat.current.opacity = alpha.current;
        if (
          mat.current.opacity < alpha.current &&
          mat.current.opacity - alpha.current > -0.1
        )
          mat.current.opacity = alpha.current;
        if (
          mat.current.opacity > alpha.current &&
          mat.current.opacity - alpha.current > 0.1
        )
          mat.current.opacity -= 0.1;
        if (
          mat.current.opacity < alpha.current &&
          mat.current.opacity - alpha.current < -0.1
        )
          mat.current.opacity += 0.1;
      }
    };

    // Note: Lerping here only works from Color/Vector3
    // I would refrain from creating new Vector3/Color so there is a useRef with Vector3/Color inside
    // That is Changed / Compared instead

    // Source Fade
    if (
      sourceFade &&
      mat.current.opacity > 0 &&
      posVec.current.equals(ball.current.position)
    ) {
      mat.current.opacity -= 0.1;
    }
    if (posVec.current.equals(ball.current.position) && !sourceFade)
      alphaCheck();

    // Display source once it starts moving
    if (
      !posVec.current.equals(ball.current.position) &&
      !(mat.current.opacity > 0)
    ) {
      ball.current.position.copy(posVec.current);
      // Alpha Check
      if (!(mat.current.opacity === alpha.current)) {
        if (
          mat.current.opacity < alpha.current &&
          mat.current.opacity - alpha.current > -0.1
        )
          mat.current.opacity = alpha.current;
        if (
          mat.current.opacity < alpha.current &&
          mat.current.opacity - alpha.current < -0.1
        )
          mat.current.opacity += 0.1;
      }
      return;
    }

    // Move to new position
    if (!posVec.current.equals(ball.current.position)) {
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish,
      // hence the distance check to change the lerp factor
      if (ball.current.position.distanceTo(posVec.current) > 0.001) {
        ball.current.position.lerp(posVec.current, 0.1);
      } else {
        ball.current.position.lerp(posVec.current, 0.6);
      }
      alphaCheck();
    }

    // Move to new color
    if (!color.current.equals(mat.current.color)) {
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish,
      // hence the distance check to change the lerp factor
      mat.current.color.lerp(color.current, 0.3);
      // mat.current.opacity = newColor.current?.a ? newColor.current?.a : 1;
    }
  });

  return (
    <mesh ref={ball}>
      <sphereGeometry args={[0.05, 32, 16]} />
      <meshPhongMaterial ref={mat} transparent={true} />
    </mesh>
  );
}
