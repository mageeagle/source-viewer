import { Box, Grid, Plane } from "@react-three/drei";
import { BufferGeometry, Euler, Mesh, NormalBufferAttributes } from "three";
import { useEffect, useMemo, useRef } from "react";
import { useUser } from "@/hooks/useZustand";
import { materialColor } from "three/examples/jsm/nodes/Nodes.js";
const rotXZ1 = new Euler(0, 0, 0);
const rotXZ2 = new Euler(3.14, 0, 0);
const rotYZ1 = new Euler(0, 0, 1.57);
const rotYZ2 = new Euler(0, 0, -1.57);
const rotXY1 = new Euler(1.57, 0, 0);
const rotXY2 = new Euler(-1.57, 0, 0);
export default function GridOverlay() {
  const gridXZ1 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridXZ2 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridYZ1 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridYZ2 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridXY1 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
  const gridXY2 = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(
    null
  );
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
  ] = useUser((s) => [
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
  ]);

  const cellColor = useMemo(() => `rgb(${subGridColor.r}, ${subGridColor.g}, ${subGridColor.b})`, [subGridColor])
  const sectionColor = useMemo(() => `rgb(${gridColor.r}, ${gridColor.g}, ${gridColor.b})`, [gridColor])

  return (
    <>
      {gridXZToggle && (
        <>
          <Grid
            args={[gridSize, gridSize]}
            position={gridPosXZ}
            ref={gridXZ1}
            infiniteGrid={gridXZInf}
            rotation={rotXZ1}
            cellSize={sectionSize / subGridDiv}
            sectionSize={sectionSize}
            cellColor={cellColor}
            sectionColor={sectionColor}
          />
          <Grid
            args={[gridSize, gridSize]}
            position={gridPosXZ}
            ref={gridXZ2}
            infiniteGrid={gridXZInf}
            rotation={rotXZ2}
            cellSize={sectionSize / subGridDiv}
            sectionSize={sectionSize}
            cellColor={cellColor}
            sectionColor={sectionColor}
          />
        </>
      )}
      {gridYZToggle && (
        <>
          <Grid
            args={[gridSize, gridSize]}
            position={gridPosYZ}
            ref={gridYZ1}
            infiniteGrid={gridYZInf}
            rotation={rotYZ1}
            cellSize={sectionSize / subGridDiv}
            sectionSize={sectionSize}
            cellColor={cellColor}
            sectionColor={sectionColor}
          />
          <Grid
            args={[gridSize, gridSize]}
            position={gridPosYZ}
            ref={gridYZ2}
            infiniteGrid={gridYZInf}
            rotation={rotYZ2}
            cellSize={sectionSize / subGridDiv}
            sectionSize={sectionSize}
            cellColor={cellColor}
            sectionColor={sectionColor}
          />
        </>
      )}
      {gridXYToggle && (
        <>
          <Grid
            args={[gridSize, gridSize]}
            position={gridPosXY}
            ref={gridXY1}
            infiniteGrid={gridXYInf}
            rotation={rotXY1}
            cellSize={sectionSize / subGridDiv}
            sectionSize={sectionSize}
            cellColor={cellColor}
            sectionColor={sectionColor}
          />
          <Grid
            args={[gridSize, gridSize]}
            position={gridPosXY}
            ref={gridXY2}
            infiniteGrid={gridXYInf}
            rotation={rotXY2}
            cellSize={sectionSize / subGridDiv}
            sectionSize={sectionSize}
            cellColor={cellColor}
            sectionColor={sectionColor}
          />
        </>
      )}
    </>
  );
}
