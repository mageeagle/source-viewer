"use client";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveEvents,
  AdaptiveDpr,
  OrthographicCamera,
  GizmoViewport,
  GizmoHelper,
} from "@react-three/drei";
import Player from "./Player";
import { useUser } from "@/hooks/useZustand";
import * as THREE from "three";
import GridOverlay from "./GridOverlay";
import Transformer from "./Transformer";
import { useShallow } from "zustand/react/shallow";

THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

export default function CanvasCompo({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bgColor, axisToggle, displayInterface] = useUser(
    useShallow((s) => [s.bgColor, s.axisToggle, s.displayInterface])
  );
  return (
    <Canvas
      camera={{ fov: 45, near: 0.000001, far: 50000, position: [0, 0, 20] }}
      gl={{ alpha: false }}
      shadows
    >
      {axisToggle && <axesHelper args={[1]} />}
      {/* <OrthographicCamera
        makeDefault
        zoom={100}
        near={0.1}
        far={2000}
        position={[0, 0, 300]}
      /> */}
      <color attach="background" args={[bgColor]} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
      <ambientLight intensity={1} color={"white"} />
      <Player />
      {children}
      <directionalLight color="white" position={[10000, 10000, 10000]} />
      <GridOverlay />
      {displayInterface &&
        <GizmoHelper alignment="bottom-left" margin={[100, 100]}>
          <GizmoViewport />
        </GizmoHelper>
      }
      <Transformer />
    </Canvas>
  );
}
