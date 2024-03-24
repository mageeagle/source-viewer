import CanvasCompo from "@/components/three/CanvasCompo";
import SourceArray from "@/components/three/SourceArray";
import SpeakerArray from "@/components/three/SpeakerArray";
import InfoOverlay from "@/components/ui/InfoOverlay";

export default function Home() {
  return (
    <>
      <InfoOverlay noFade/>
      <CanvasCompo>
        <SourceArray editor/>
        <SpeakerArray editor/>
      </CanvasCompo>
    </>
  );
}
