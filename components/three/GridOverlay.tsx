import { Box, Grid, Plane } from "@react-three/drei";
import { BufferGeometry, Euler, Mesh, NormalBufferAttributes } from "three";
import { useEffect, useRef } from "react";
import { useUser } from "@/hooks/useZustand";
import { materialColor } from "three/examples/jsm/nodes/Nodes.js";
const rotX1 = new Euler(0, 0, 0);
const rotX2 = new Euler(3.14, 0, 0);
const rotY1 = new Euler(0, 0, 1.57);
const rotY2 = new Euler(0, 0, -1.57);
const rotZ1 = new Euler(1.57, 0, 0);
const rotZ2 = new Euler(-1.57, 0, 0);
export default function ControlsOverlay() {
  const gridX1 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridX2 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridY1 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridY2 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridZ1 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridZ2 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
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
  ] = useUser((s) => [
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
  ]);

  useEffect(() => {
    if (!gridPosX) return;
    gridX1.current?.position.set(...gridPosX);
    gridX2.current?.position.set(...gridPosX);
  }, [gridPosX]);
  useEffect(() => {
    if (!gridPosY) return;
    gridY1.current?.position.set(...gridPosY);
    gridY2.current?.position.set(...gridPosY);
  }, [gridPosY]);
  useEffect(() => {
    if (!gridPosZ) return;
    gridZ1.current?.position.set(...gridPosZ);
    gridZ2.current?.position.set(...gridPosZ);
  }, [gridPosZ]);

  return (
    <>
      {gridXToggle && (
        <>
          <Grid
            args={[gridSize, gridSize]}
            position={[0, 0, 0]}
            ref={gridX1}
            infiniteGrid={gridXInf}
            rotation={rotX1}
            cellSize={subGridSize}
            sectionSize={sectionSize}
            cellColor={subGridColor}
            sectionColor={gridColor}
          />
          <Grid
            args={[gridSize, gridSize]}
            position={[0, 0, 0]}
            ref={gridX2}
            infiniteGrid={gridXInf}
            rotation={rotX2}
            cellSize={subGridSize}
            sectionSize={sectionSize}
            cellColor={subGridColor}
            sectionColor={gridColor}
          />
        </>
      )}
      {gridYToggle && (
        <>
          <Grid
            args={[gridSize, gridSize]}
            position={[0, 0, 0]}
            ref={gridY1}
            infiniteGrid={gridYInf}
            rotation={rotY1}
            cellSize={subGridSize}
            sectionSize={sectionSize}
            cellColor={subGridColor}
            sectionColor={gridColor}
          />
          <Grid
            args={[gridSize, gridSize]}
            position={[0, 0, 0]}
            ref={gridY2}
            infiniteGrid={gridYInf}
            rotation={rotY2}
            cellSize={subGridSize}
            sectionSize={sectionSize}
            cellColor={subGridColor}
            sectionColor={gridColor}
          />
        </>
      )}
      {gridZToggle && (
        <>
          <Grid
            args={[gridSize, gridSize]}
            position={[0, 0, 0]}
            ref={gridZ1}
            infiniteGrid={gridZInf}
            rotation={rotZ1}
            cellSize={subGridSize}
            sectionSize={sectionSize}
            cellColor={subGridColor}
            sectionColor={gridColor}
          />
          <Grid
            args={[gridSize, gridSize]}
            position={[0, 0, 0]}
            ref={gridZ2}
            infiniteGrid={gridZInf}
            rotation={rotZ2}
            cellSize={subGridSize}
            sectionSize={sectionSize}
            cellColor={subGridColor}
            sectionColor={gridColor}
          />
        </>
      )}
    </>
  );
}
