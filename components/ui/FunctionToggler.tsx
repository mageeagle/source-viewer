"use client";
import { useUser } from "@/hooks/useZustand";
import { smallInputClass, titleClass } from "../../constants/styles";
import { useShallow } from "zustand/react/shallow";
import { HexColorPicker } from "react-colorful";

const Toggle = ({
  check,
  func,
  text,
}: {
  check: boolean;
  func: string | number;
  text: string;
}) => {
  return (
    <div className="w-fit flex items-center ml-2">
      <input
        className="mr-2"
        type="checkbox"
        checked={check}
        onChange={() => useUser.getState().toggleZus(func)}
      ></input>
      <div>{text}</div>
    </div>
  );
};

const LocationChange = ({
  loc: [x, y, z],
  rkey,
}: {
  loc: [number, number, number];
  rkey: string | number;
}) => {
  return (
    <div className="my-2">
      Origin{" "}
      <input
        className={smallInputClass}
        value={x}
        type="number"
        onChange={(e) =>
          useUser.getState().setZus(rkey, [Number(e.target.value), y, z])
        }
      />{" "}
      <input
        className={smallInputClass}
        value={y}
        type="number"
        onChange={(e) =>
          useUser.getState().setZus(rkey, [x, Number(e.target.value), z])
        }
      />{" "}
      <input
        className={smallInputClass}
        value={z}
        type="number"
        onChange={(e) =>
          useUser.getState().setZus(rkey, [x, y, Number(e.target.value)])
        }
      />{" "}
    </div>
  );
};

const NumInput = ({
  val,
  rkey,
  text,
}: {
  val: number;
  rkey: string | number;
  text: string;
}) => {
  return (
    <div className="my-2 ml-2">
      {text}{" "}
      <input
        className={smallInputClass}
        value={val}
        type="number"
        onChange={(e) =>
          useUser.getState().setZus(rkey, Number(e.target.value))
        }
      />
    </div>
  );
};

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
        <NumInput val={subGridSize} rkey="subGridSize" text="Division Size" />
        <NumInput
          val={sectionSize}
          rkey="sectionSize"
          text="Subdivision Size"
        />
      </div>
      <div className="flex">
        <div className="ml-8">
          Division Color
          <HexColorPicker
            color={gridColor}
            onChange={(e) => useUser.getState().setZus("gridColor", e)}
          />
        </div>
        <div className="ml-8">
          Subdivision Color
          <HexColorPicker
            color={subGridColor}
            onChange={(e) => useUser.getState().setZus("subGridColor", e)}
          />
        </div>
      </div>
    </div>
  );
}
