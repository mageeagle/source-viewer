"use client";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveEvents,
  AdaptiveDpr,
} from "@react-three/drei";
import Player from "./Player";
import { useUser } from "@/hooks/useZustand";

export default function CanvasCompo({
  children,
}: {
  children: React.ReactNode
}) {
  const bgColor = useUser((s) => s.bgColor);
  return (
    <Canvas
      camera={{ fov: 45, near: 0.000001, far: 50000, position: [0, 100, 0] }}
      gl={{ alpha: false }}
      shadows
    >
      <color attach="background" args={[bgColor]} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
      <ambientLight intensity={1} color={"white"} />
      <Player />
      {children}
      <directionalLight color="white" position={[10000, 10000, 10000]} />
    </Canvas>
  );
}
