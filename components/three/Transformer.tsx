import { useUser } from "@/hooks/useZustand";
import { TransformControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { TransformControls as TransformControlsImpl } from "three-stdlib";

export default function Transformer() {
  const trans = useRef<TransformControlsImpl>(null);
  const activeObj = useUser((s) => s.activeObj);
  useEffect(() => {
    if (!trans.current) return;
    if (!activeObj) {
      trans.current.visible = false;
      trans.current.detach();
      return;
    }
    trans.current.detach();
    trans.current.visible = true;
    trans.current.attach(activeObj);
  }, [activeObj]);

  return (
    <>
      {activeObj && (
        <TransformControls ref={trans} mode="translate" />
      )}
    </>
  );
}
