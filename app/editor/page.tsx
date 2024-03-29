"use client"
import CanvasCompo from "@/components/three/CanvasCompo";
import SourceArray from "@/components/three/SourceArray";
import SpeakerArray from "@/components/three/SpeakerArray";
import InfoOverlay from "@/components/ui/InfoOverlay";
import PositionEditor from "@/components/ui/PositionEditor";
import { useUser } from "@/hooks/useZustand";

export default function Home() {
  const displayInterface = useUser((s) => s.displayInterface);
  return (
    <>
      { displayInterface &&
        <>
          <PositionEditor />
          <InfoOverlay editor />
        </>
      }
      <CanvasCompo>
        <SourceArray editor />
        <SpeakerArray editor />
      </CanvasCompo>
    </>
  );
}
