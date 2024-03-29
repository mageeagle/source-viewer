"use client";
import { setUser, useUser } from "@/hooks/useZustand";
import { smallInputClass, titleClass } from "../../constants/styles";
import { useShallow } from "zustand/react/shallow";
import { HexColorPicker } from "react-colorful";
import LocationChange from "./LocationChange";
import { NumInput, Toggle } from "./ZusUI";

export default function FunctionToggler() {
  const [
    gridXToggle,
    gridYToggle,
    gridZToggle,
    gridPosX,
    gridPosY,
    gridPosZ,
    gridSize,
    subGridSize,
    gridColor,
    subGridColor,
    sectionSize,
    gridXInf,
    gridYInf,
    gridZInf,
    axisToggle,
  ] = useUser(
    useShallow((s) => [
      s.gridXToggle,
      s.gridYToggle,
      s.gridZToggle,
      s.gridPosX,
      s.gridPosY,
      s.gridPosZ,
      s.gridSize,
      s.subGridSize,
      s.gridColor,
      s.subGridColor,
      s.sectionSize,
      s.gridXInf,
      s.gridYInf,
      s.gridZInf,
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
        <Toggle check={gridXToggle} func={"gridXToggle"} text={"XZ Grid"} />
        <Toggle check={gridXInf} func={"gridXInf"} text={"Infinite"} />
      </div>
      <LocationChange loc={gridPosX} rkey="gridPosX" />
      <div className="flex justify-items-end">
        <Toggle check={gridYToggle} func={"gridYToggle"} text={"YZ Grid"} />
        <Toggle check={gridYInf} func={"gridYInf"} text={"Infinite"} />
      </div>
      <LocationChange loc={gridPosY} rkey="gridPosY" />
      <div className="flex justify-items-end">
        <Toggle check={gridZToggle} func={"gridZToggle"} text={"XY Grid"} />
        <Toggle check={gridZInf} func={"gridZInf"} text={"Infinite"} />
      </div>
      <LocationChange loc={gridPosZ} rkey="gridPosZ" />
      <div className="flex justify-items-end">
        <NumInput val={gridSize} rkey="gridSize" text="Grid Size" />
        <NumInput
          val={sectionSize}
          rkey="sectionSize"
          text="Section Size"
        />
        <NumInput val={subGridSize} rkey="subGridSize" text=" Section Subdivision" />
      </div>
      <div className="flex">
        <div className="ml-8">
          Division Color
          <HexColorPicker
            color={gridColor}
            onChange={(e) => setUser("gridColor", e)}
          />
        </div>
        <div className="ml-8">
          Subdivision Color
          <HexColorPicker
            color={subGridColor}
            onChange={(e) => setUser("subGridColor", e)}
          />
        </div>
      </div>
    </div>
  );
}
