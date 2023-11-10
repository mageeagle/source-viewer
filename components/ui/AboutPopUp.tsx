"use client";
import { useUser } from "../../hooks/useZustand";
import InfoPopUp from "./InfoPopUp";
import InfoButton from "./InfoButton";
import { bottomRight, topWhiteText } from "../../constants/styles";
import Connection from "./Connection";
import { useShallow } from "zustand/react/shallow";

function AboutPopUp({ noFade }: { noFade?: boolean }) {
  const [about, init, started] = useUser(
    useShallow((s) => [s.about, s.init, s.started])
  );

  return (
    <>
      {about ? <InfoPopUp noFade={noFade} /> : null}
      {about || !started ? null : (
        <div className={bottomRight + " z-50"}>
          <InfoButton />
        </div>
      )}
      {started ? null : <Connection />}
    </>
  );
}

export default AboutPopUp;
