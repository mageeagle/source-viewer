"use client";
import {
  bottomRight,
  innerWrapper,
  outerWrapper,
} from "../../constants/styles";
import AboutClose from "./AboutClose";
import ControlsHelp from "./ControlsHelp";
import Descriptions from "./Descriptions";
import { useUser } from "../../hooks/useZustand";
import SectionSelector from "./SectionSelector";
import ColorPickerGroup from "./ColorPickerGroup";
import ColorPicker from "./ColorPicker";
import { useShallow } from "zustand/react/shallow";

export default function InfoPopUp() {
  const section = useUser((state) => state.infoSection) || 1;
  const sourceNo = useUser((s) => s.sourceNo);
  const speakerNo = useUser((s) => s.speakerNo);
  const [sourceFade, toggleSourceFade] = useUser(
    useShallow((s) => [s.sourceFade, s.toggleSourceFade])
  );
  return (
    <div className={bottomRight + " z-50"}>
      <div className="bottom-0 right-0 absolute grid grid-cols-1 justify-items-end text-gray-400 text-right">
        <div className="m-4 w-screen flex flex-row-reverse justify-items-end items-end">
          <div className="w-fit">
            {section === 1 && <Descriptions />}
            {section === 2 && <ControlsHelp />}
            {section === 3 && (
              <ColorPickerGroup
                colorKey={"sourceColor"}
                maxSource={sourceNo}
                name="Source"
                addClass="grid justify-items-end"
              />
            )}
            {section === 4 && (
              <ColorPickerGroup
                colorKey={"speakerColor"}
                maxSource={speakerNo}
                name="Speaker"
                addClass="grid justify-items-end"
              />
            )}
            {section === 5 && <ColorPicker />}
          </div>
          {section === 3 && (
            <div className="w-fit flex items-center mx-2">
              <div>Fade Source if Not Moving</div>
              <input
                className="mx-2"
                type="checkbox"
                checked={sourceFade}
                onChange={toggleSourceFade}
              ></input>
            </div>
          )}
        </div>

        <div className="flex w-screen flex-wrap-reverse flex-row-reverse items-center">
          <AboutClose />
          <SectionSelector i={1} name="Description" />
          <SectionSelector i={2} name="Controls" />
          <SectionSelector i={3} name="Source Color Picker" />
          <SectionSelector i={4} name="Speaker Color Picker" />
          <SectionSelector i={5} name="Background Color Picker" />
        </div>
      </div>
    </div>
  );
}
