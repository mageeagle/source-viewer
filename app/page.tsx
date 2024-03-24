import CanvasCompo from "@/components/three/CanvasCompo";
import InstancedSource from "@/components/three/InstancedSource";
import InstancedSpeaker from "@/components/three/InstancedSpeaker";
import AboutPopUp from "@/components/ui/InfoOverlay";

export default function Home() {
  return (
    <>
      <AboutPopUp noFade/>
      <CanvasCompo>
        <InstancedSource />
        <InstancedSpeaker />
      </CanvasCompo>
    </>
  );
}
