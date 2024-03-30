"use client"
import CanvasCompo from "@/components/three/CanvasCompo";
import InstancedSource from "@/components/three/InstancedSource";
import InstancedSpeaker from "@/components/three/InstancedSpeaker";
import InfoOverlay from "@/components/ui/InfoOverlay";
import { useUser } from "@/hooks/useZustand";

export default function Home() {
  const displayInterface = useUser((s) => s.displayInterface);
  return (
    <>
      {displayInterface && <InfoOverlay noFade/>}
      <CanvasCompo>
        <InstancedSource />
        <InstancedSpeaker />
      </CanvasCompo>
    </>
  );
}
