import { Vector3, Color, Matrix4, InstancedMesh } from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useUser, subKey } from "@/hooks/useZustand";

export default function InstancedSpeakerLerp({ index }: { index: number }) {
  const speakerRef = useRef<InstancedMesh>(useUser.getState().speakerRef);
  const currentColor = useRef(new Color(1, 1, 1));
  const destColor = useRef(new Color(1, 1, 1));
  const currentPos = useRef(
    new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5)
  );
  const destPos = useRef(
    new Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5)
  );
  const matrixRef = useRef(new Matrix4());

  useEffect(() => {
    useUser.getState().setNestedZus("speakerColor", index, destColor.current);
    useUser.getState().setNestedZus("speakerPos", index, destPos.current);
    subKey(useUser, speakerRef, "speakerRef");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Limiting Changes to Frame Rate
  useFrame((_, delta) => {
    // Note: Lerping here only works from Color/Vector3
    // I would refrain from creating new Vector3/Color so there is a useRef with Vector3/Color inside
    // That is Changed / Compared instead

    // Move to new position
    if (!currentPos.current.equals(destPos.current)) {
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish,
      // hence the distance check to change the lerp factor
      if (currentPos.current.distanceTo(destPos.current) > 0.001) {
        currentPos.current.lerp(destPos.current, 0.1);
      } else {
        currentPos.current.lerp(destPos.current, 0.6);
      }
      matrixRef.current.setPosition(currentPos.current);
      if (speakerRef.current)
        speakerRef.current.setMatrixAt(index - 1, matrixRef.current);
    }

    // Move to new color
    if (!destColor.current.equals(currentColor.current)) {
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish,
      // hence the distance check to change the lerp factor
      currentColor.current.lerp(destColor.current, 0.3);
      if (speakerRef.current) {
        speakerRef.current.setColorAt(index - 1, currentColor.current);
      }
    }
  });

  return null;
}
