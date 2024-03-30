import { setUser, useUser } from "@/hooks/useZustand";
import { TransformControls } from "@react-three/drei";
import OSC from "osc-js";
import { useCallback, useEffect, useRef } from "react";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import { useShallow } from "zustand/react/shallow";

export default function Transformer() {
  const trans = useRef<TransformControlsImpl>(null);
  const [activeObj, editSnap, sectionSize, subGridDiv] = useUser(
    useShallow((s) => [s.activeObj, s.editSnap, s.sectionSize, s.subGridDiv])
  );

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

  useEffect(() => {
    if (editSnap === undefined) return;
    if (editSnap === false) {
      trans.current?.setTranslationSnap(0);
      return;
    }
    trans.current?.setTranslationSnap(sectionSize / subGridDiv);
  }, [editSnap, sectionSize, subGridDiv]);

  const change = useCallback(() => {
    if (!activeObj) return;
    const pos = activeObj.position;
    setUser("activeLoc", pos.toArray());
    const xyz = new OSC.Message(
      "/" +
        useUser.getState().activeGroup +
        "/" +
        useUser.getState().activeID +
        "/xyz",
      pos.x,
      pos.y,
      pos.z
    );
    useUser.getState().osc?.send(xyz);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObj]);

  return (
    <>
      {activeObj && (
        <TransformControls
          onObjectChange={change}
          onMouseUp={() => useUser.getState().setZus("activeTrans", false)}
          onMouseDown={() => useUser.getState().setZus("activeTrans", true)}
          ref={trans}
          mode="translate"
        />
      )}
    </>
  );
}
