"use client";
import { useUser } from "../../hooks/useZustand";
import InfoPopUp from "./InfoPopUp";
import InfoButton from "./InfoButton";
import { bottomRight, topWhiteText } from "../../constants/styles";
import Connection from "./Connection";
import { useShallow } from "zustand/react/shallow";

function InfoOverlay({ noFade }: { noFade?: boolean }) {
  const [about, displayInterface, started] = useUser(
    useShallow((s) => [s.about, s.displayInterface, s.started])
  );

  return (
    <>
      {about && displayInterface ? <InfoPopUp noFade={noFade} /> : null}
      {about || !displayInterface || !started ? null : (
        <div className={bottomRight + " z-50"}>
          <InfoButton />
        </div>
      )}
      {started ? null : <Connection />}
    </>
  );
}

export default InfoOverlay;
