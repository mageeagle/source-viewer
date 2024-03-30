"use client";
import { bottomRight, sectionClass } from "../../constants/styles";
import AboutClose from "./AboutClose";
import ControlsHelp from "./ControlsHelp";
import Descriptions from "./Descriptions";
import { useUser } from "../../hooks/useZustand";
import SectionSelector from "./SectionSelector";
import ColorPickerGroup from "./ColorPickerGroup";
import ColorPickerBg from "./ColorPickerBg";
import { useShallow } from "zustand/react/shallow";
import GridToggler from "./GridToggler";
import { between } from "@/helpers/mathsHelper";
import SectionToggler from "./SectionToggler";

export default function InfoPopUp({
  noFade,
  editor,
}: {
  noFade?: boolean;
  editor?: boolean;
}) {
  const [sourceFade, section, connected] = useUser(
    useShallow((s) => [s.sourceFade, s.infoSection, s.connected])
  );

  return (
    <div className={bottomRight + " z-50"}>
      <div className="bottom-0 right-0 absolute grid grid-cols-1 justify-items-end text-gray-400 text-right">
        <div className="m-4 lg:w-max w-screen flex flex-row-reverse justify-items-end items-end">
          <div className="w-fit">
            {section === 1 && <Descriptions noFade={noFade} editor={editor} />}
            {section === 2 && <ControlsHelp />}
            {section === 5 && (
              <ColorPickerGroup
                noFade={noFade}
                editor={editor}
                stype={"source"}
                name="Source"
                addClass="grid justify-items-end"
              />
            )}
            {section === 6 && (
              <ColorPickerGroup
                noFade={noFade}
                stype={"speaker"}
                name="Speaker"
                addClass="grid justify-items-end"
              />
            )}
            {section === 7 && <ColorPickerBg />}
            {section === 3 && <GridToggler />}
          </div>
        </div>

        <div className="flex lg:w-max w-screen flex-wrap-reverse flex-row-reverse items-center">
          <AboutClose />
          <div className="font-bold">
            {connected ? (
              " "
            ) : (
              <div
                className={sectionClass}
                onClick={() => useUser.getState().setZus("started", false)}
              >
                Not Connected / Reconnect
              </div>
            )}
          </div>
          {!between(section, 4, 7) && (
            <>
              <SectionSelector i={1} name="Description" />
              <SectionSelector i={2} name="Controls" />
              <SectionSelector i={4} name="Color Settings" />
              <SectionSelector i={3} name="Grid Settings" />
            </>
          )}
          {between(section, 4, 7) && (
            <>
              <div
                className={sectionClass}
                onClick={() => useUser.getState().setZus("infoSection", 1)}
              >
                Back
              </div>
              <SectionSelector i={5} name="Source Settings" />
              <SectionSelector i={6} name="Speaker Settings" />
              <SectionSelector i={7} name="Background Color" />
            </>
          )}
          <SectionToggler rkey="sendOsc" name="Send Settings as OSC" />
        </div>
      </div>
    </div>
  );
}
