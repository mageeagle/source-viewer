"use client";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveEvents,
  AdaptiveDpr,
} from "@react-three/drei";
import Player from "./Player";
import SourceArray from "./SourceArray";
import { useUser } from "@/hooks/useZustand";
import SpeakerArray from "./SpeakerArray";

export default function CanvasCompo() {
  const bgColor = useUser((s) => s.bgColor);
  return (
    <Canvas
      camera={{ fov: 45, far: 50000, position: [0, 100, 0] }}
      gl={{ alpha: false }}
      shadows
    >
      <color attach="background" args={[bgColor]} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
      <ambientLight intensity={1} color={"white"} />
      <Player />
      <SourceArray />
      <SpeakerArray />
      <directionalLight color="white" position={[10000, 10000, 10000]} />
    </Canvas>
  );
}
