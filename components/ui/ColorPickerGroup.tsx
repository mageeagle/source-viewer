"use client";
import {
  innerWrapper,
  outerWrapper,
  buttonClass,
  smallInputClass,
} from "@/constants/styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "../../hooks/useZustand";
import { RgbaColorPicker } from "react-colorful";

export default function ColorPickerGroup({
  colorKey,
  maxSource,
  name,
  addClass,
}: {
  colorKey: string | number;
  maxSource: number;
  name: string;
  addClass?: string;
}) {
  const [sourceMin, setSourceMin] = useState<number>(1);
  const [sourceMax, setSourceMax] = useState<number>(maxSource);
  const [sourceColor, setSourceColor] = useState<{
    r: number;
    g: number;
    b: number;
    a: number;
  }>();
  const init = useRef(false);

  useEffect(() => {
    if (!sourceColor || !maxSource) return;
    if (!init.current) {
      init.current = true;
      return;
    }
    if (sourceMin < 1 || sourceMax < 1) return;
    const min = sourceMax > sourceMin ? sourceMin : sourceMax;
    const max = sourceMax > sourceMin ? sourceMax : sourceMin;
    for (let i = min; i <= max; i++) {
      useUser.getState().setNestedZus(colorKey, i, sourceColor);
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
        />
        {" "}to{" "}
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
