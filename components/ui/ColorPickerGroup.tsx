"use client";
import { smallInputClass } from "@/constants/styles";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/useZustand";
import { RgbaColorPicker } from "react-colorful";
import { deepEqual } from "fast-equals";
import { NumInput, Toggle } from "./ZusUI";

export default function ColorPickerGroup({
  stype,
  name,
  addClass,
  noFade,
  editor,
}: {
  stype: "speaker" | "source";
  name: string;
  addClass?: string;
  noFade?: boolean;
  editor?: boolean;
}) {
  const colorKey = stype === "speaker" ? "speakerColor" : "sourceColor";
  const alphaKey = stype === "speaker" ? "speakerAlpha" : "sourceAlpha";
  const refKey = stype === "speaker" ? "speakerRef" : "sourceRef";
  const sizeKey = stype === "speaker" ? "speakerSize" : "sourceSize";
  const dispKey =
    stype === "speaker" ? "speakerNumDisplay" : "sourceNumDisplay";
  const disp =
    stype === "speaker"
      ? useUser((s) => s.speakerNumDisplay)
      : useUser((s) => s.sourceNumDisplay);
  const size =
    stype === "speaker"
      ? useUser((s) => s.speakerSize)
      : useUser((s) => s.sourceSize);
  const sourceFade = useUser((s) => s.sourceFade);
  const [sourceMin, setSourceMin] = useState<number>(1);
  const [sourceMax, setSourceMax] = useState<number>(
    stype === "speaker"
      ? useUser.getState().speakerNo
      : useUser.getState().sourceNo
  );
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
    if (!sourceColor) return;
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
        if (state[colorKey][i]) {
          state[colorKey][i].fromArray([
            sourceColor.r / 255,
            sourceColor.g / 255,
            sourceColor.b / 255,
          ]);
        }
      }
      lastColor.current = [sourceColor.r, sourceColor.g, sourceColor.b];
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
          type="number"
          onChange={(e) => setSourceMin(Math.round(Number(e.target.value)))}
        />{" "}
        to{" "}
        <input
          className={smallInputClass}
          value={sourceMax}
          type="number"
          onChange={(e) => setSourceMax(Math.round(Number(e.target.value)))}
        />{" "}
      </div>
      <RgbaColorPicker color={sourceColor} onChange={setSourceColor} />
      {!editor && !noFade && stype === "source" && (
        <Toggle
          check={sourceFade}
          func="sourceFade"
          text="Hide Source if Not Moving"
        />
      )}
      <Toggle check={disp} func={dispKey} text="Display Number" />
      <NumInput val={size} rkey={sizeKey} text="Size (mm)" />
    </div>
  );
}
