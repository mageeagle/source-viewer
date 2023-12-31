import {
  Vector3,
  MeshPhongMaterial,
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Color,
} from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useUser } from "@/hooks/useZustand";

export default function SoundSource({ index }: { index: number }) {
  const sourceFade = useUser((s) => s.sourceFade);
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

  useEffect(() => {
    const setZus = useUser.getState().setNestedZus;
    setZus("sourceColor", index, color.current);
    setZus("sourcePos", index, posVec.current);
    setZus("sourceAlpha", index, alpha.current);
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
    if (!posVec.current.equals(ball.current.position)) {
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
  });

  return (
    <mesh ref={ball} frustumCulled={false}>
      <sphereGeometry args={[0.05, 32, 16]} />
      <meshPhongMaterial ref={mat} transparent={true} />
    </mesh>
  );
}
