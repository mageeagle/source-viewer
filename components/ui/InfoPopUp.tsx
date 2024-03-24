"use client";
import {
  bottomRight,
  innerWrapper,
  outerWrapper,
  sectionClass,
} from "../../constants/styles";
import AboutClose from "./AboutClose";
import ControlsHelp from "./ControlsHelp";
import Descriptions from "./Descriptions";
import { useUser } from "../../hooks/useZustand";
import SectionSelector from "./SectionSelector";
import ColorPickerGroup from "./ColorPickerGroup";
import ColorPickerBg from "./ColorPickerBg";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import FunctionToggler from "./FunctionToggler";
import { between } from "@/helpers/mathsHelper";

const FadeToggle = () => {
  const [sourceFade, toggleSourceFade] = useUser(
    useShallow((s) => [s.sourceFade, s.toggleSourceFade])
  );
  return (
    <div className="w-fit flex items-center mx-2">
      <div>Hide Source if Not Moving</div>
      <input
        className="mx-2"
        type="checkbox"
        checked={sourceFade}
        onChange={toggleSourceFade}
      ></input>
    </div>
  );
};

export default function InfoPopUp({ noFade }: { noFade?: boolean }) {
  const section = useUser((state) => state.infoSection) || 1;
  const sourceNo = useUser((s) => s.sourceNo);
  const speakerNo = useUser((s) => s.speakerNo);
  const connected = useUser((s) => s.connected);

  return (
    <div className={bottomRight + " z-50"}>
      <div className="bottom-0 right-0 absolute grid grid-cols-1 justify-items-end text-gray-400 text-right">
        <div className="m-4 w-screen flex flex-row-reverse justify-items-end items-end">
          <div className="w-fit">
            {section === 1 && <Descriptions noFade={noFade} />}
            {section === 2 && <ControlsHelp />}
            {section === 5 && (
              <ColorPickerGroup
                noFade={noFade}
                colorKey={"sourceColor"}
                alphaKey={"sourceAlpha"}
                refKey={"sourceRef"}
                maxSource={sourceNo}
                name="Source"
                addClass="grid justify-items-end"
              />
            )}
            {section === 6 && (
              <ColorPickerGroup
                noFade={noFade}
                colorKey={"speakerColor"}
                alphaKey={"speakerAlpha"}
                refKey={"speakerRef"}
                maxSource={speakerNo}
                name="Speaker"
                addClass="grid justify-items-end"
              />
            )}
            {section === 7 && <ColorPickerBg />}
            {section === 3 && <FunctionToggler />}
          </div>
          {section === 5 && !noFade && <FadeToggle />}
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
          {!between(section, 4, 7) &&
            <>
              <SectionSelector i={1} name="Description" />
              <SectionSelector i={2} name="Controls" />
              <SectionSelector i={4} name="Color Settings" />
              <SectionSelector i={3} name="Grid Settings" />
            </>
          }
          {between(section, 4, 7) && (
            <>
              <div
                className={sectionClass}
                onClick={() => useUser.getState().setZus("infoSection", 1)}
              >
                Back
              </div>
              <SectionSelector i={5} name="Source Color Picker" />
              <SectionSelector i={6} name="Speaker Color Picker" />
              <SectionSelector i={7} name="Background Color Picker" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
