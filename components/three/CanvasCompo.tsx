"use client";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveEvents,
  AdaptiveDpr,
  OrthographicCamera,
  GizmoViewport,
  GizmoHelper,
  PerspectiveCamera,
  GizmoViewcube,
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
  const [bgColor, axisToggle, displayInterface, god] = useUser(
    useShallow((s) => [s.bgColor, s.axisToggle, s.displayInterface, s.god])
  );
  return (
    <Canvas gl={{ alpha: false }} shadows>
      {axisToggle && <axesHelper args={[1]} />}
      {god && (
        <OrthographicCamera
          makeDefault
          zoom={100}
          near={0.1}
          far={5000}
          position={[0, 0, 50]}
        />
      )}
      {!god && (
        <PerspectiveCamera
          makeDefault
          fov={45}
          near={0.1}
          far={50000}
          position={[0, 0, 20]}
        />
      )}
      <color
        attach="background"
        args={[bgColor.r / 255, bgColor.g / 255, bgColor.b / 255]}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
      <ambientLight intensity={1} color={"white"} />
      <Player />
      {children}
      <directionalLight color="white" position={[10000, 10000, 10000]} />
      <GridOverlay />
      {displayInterface && (
        <GizmoHelper alignment="bottom-left" margin={[100, 100]}>
          <GizmoViewcube
            color="grey"
            faces={["Right", "Left", "Back", "Front", "Top", "Bottom"]}
          />
        </GizmoHelper>
      )}
      <Transformer />
    </Canvas>
  );
}
