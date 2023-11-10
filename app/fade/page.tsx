import CanvasCompo from "@/components/three/CanvasCompo";
import SourceArray from "@/components/three/SourceArray";
import SpeakerArray from "@/components/three/SpeakerArray";
import AboutPopUp from "@/components/ui/AboutPopUp";

export default function Home() {
  return (
    <>
      <AboutPopUp />
      <CanvasCompo>
        <SourceArray />
        <SpeakerArray />
      </CanvasCompo>
    </>
  );
}
