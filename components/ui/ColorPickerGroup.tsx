"use client";
import {
  smallInputClass,
} from "@/constants/styles";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/useZustand";
import { RgbaColorPicker } from "react-colorful";
import { deepEqual } from "fast-equals";

export default function ColorPickerGroup({
  colorKey,
  alphaKey,
  refKey,
  maxSource,
  name,
  addClass,
  noFade,
}: {
  colorKey: "speakerColor" | "sourceColor";
  alphaKey: "speakerAlpha" | "sourceAlpha";
  refKey: "speakerRef" | "sourceRef";
  maxSource: number;
  name: string;
  addClass?: string;
  noFade?: boolean;
}) {
  const [sourceMin, setSourceMin] = useState<number>(1);
  const [sourceMax, setSourceMax] = useState<number>(maxSource);
  const [sourceColor, setSourceColor] = useState<{
    r: number;
    g: number;
    b: number;
    a: number;
  }>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const init = useRef(false);
  const lastColor = useRef([255, 255, 255]);

  useEffect(() => {
    if (!sourceColor || !maxSource) return;
    if (!init.current) {
      init.current = true;
      return;
    }
    const state = useUser.getState();
    if (sourceMin < 1 || sourceMax < 1) return;
    const min = sourceMax > sourceMin ? sourceMin : sourceMax;
    const max = sourceMax > sourceMin ? sourceMax : sourceMin;
    if (
      !deepEqual(
        [sourceColor.r, sourceColor.g, sourceColor.b],
        lastColor.current
      )
    ) {
      for (let i = min; i <= max; i++) {
        state[colorKey][i].fromArray([
          sourceColor.r / 255,
          sourceColor.g / 255,
          sourceColor.b / 255,
        ]);
        
      }
      lastColor.current = [sourceColor.r, sourceColor.g, sourceColor.b]
    }
    if (!noFade) {
      for (let x = min; x <= max; x++) state[alphaKey][x].setX(sourceColor.a);
    }
    if (noFade && state[refKey]) {
      // @ts-ignore for some reason this line has type errors
      state[refKey].material.opacity = sourceColor.a;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceColor]);

  return (
    <div className={"max-lg:mt-4 " + addClass}>
      <div className="my-2 font-semibold">{name} Color</div>
      <div className="my-2">
        {" "}
        From {name}{" "}
        <input
          className={smallInputClass}
          value={sourceMin}
          onChange={(e) => setSourceMin(Number(e.target.value))}
        />{" "}
        to{" "}
        <input
          className={smallInputClass}
          value={sourceMax}
          onChange={(e) => setSourceMax(Number(e.target.value))}
        />{" "}
      </div>
      <RgbaColorPicker color={sourceColor} onChange={setSourceColor} />
    </div>
  );
}
