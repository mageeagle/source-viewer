"use client";
import { setUser, useUser } from "@/hooks/useZustand";
import { titleClass } from "../../constants/styles";
import { useShallow } from "zustand/react/shallow";
import { HexColorPicker, RgbColorPicker } from "react-colorful";
import LocationChange from "./LocationChange";
import { NumInput, Toggle } from "./ZusUI";

export default function GridToggler() {
  const [
    gridXZToggle,
    gridYZToggle,
    gridXYToggle,
    gridPosXZ,
    gridPosYZ,
    gridPosXY,
    gridSize,
    subGridDiv,
    gridColor,
    subGridColor,
    sectionSize,
    gridXZInf,
    gridYZInf,
    gridXYInf,
    axisToggle,
  ] = useUser(
    useShallow((s) => [
      s.gridXZToggle,
      s.gridYZToggle,
      s.gridXYToggle,
      s.gridPosXZ,
      s.gridPosYZ,
      s.gridPosXY,
      s.gridSize,
      s.subGridDiv,
      s.gridColor,
      s.subGridColor,
      s.sectionSize,
      s.gridXZInf,
      s.gridYZInf,
      s.gridXYInf,
      s.axisToggle,
    ])
  );
  return (
    <div className="max-w-screen ml-4 grid justify-items-end">
      <div className={titleClass}> Grid Settings </div>
      <Toggle
        check={axisToggle}
        func={"axisToggle"}
        text={"Axis Helper Display"}
      />
      <div className="flex justify-items-end">
        <Toggle check={gridXZToggle} func={"gridXZToggle"} text={"XZ Grid"} />
        <Toggle check={gridXZInf} func={"gridXZInf"} text={"Infinite"} />
      </div>
      <LocationChange loc={gridPosXZ} rkey="gridPosXZ" />
      <div className="flex justify-items-end">
        <Toggle check={gridYZToggle} func={"gridYZToggle"} text={"YZ Grid"} />
        <Toggle check={gridYZInf} func={"gridYZInf"} text={"Infinite"} />
      </div>
      <LocationChange loc={gridPosYZ} rkey="gridPosYZ" />
      <div className="flex justify-items-end">
        <Toggle check={gridXYToggle} func={"gridXYToggle"} text={"XY Grid"} />
        <Toggle check={gridXYInf} func={"gridXYInf"} text={"Infinite"} />
      </div>
      <LocationChange loc={gridPosXY} rkey="gridPosXY" />
      <div className="flex justify-items-end">
        <NumInput val={gridSize} rkey="gridSize" text="Grid Size" />
        <NumInput val={sectionSize} rkey="sectionSize" text="Section Size" />
        <NumInput
          val={subGridDiv}
          rkey="subGridDiv"
          text="Section Subdivision"
        />
      </div>
      <div className="flex">
        <div className="ml-8">
          Division Color
          <RgbColorPicker
            color={gridColor}
            onChange={(e) => setUser("gridColor", e)}
          />
        </div>
        <div className="ml-8">
          Subdivision Color
          <RgbColorPicker
            color={subGridColor}
            onChange={(e) => setUser("subGridColor", e)}
          />
        </div>
      </div>
    </div>
  );
}
