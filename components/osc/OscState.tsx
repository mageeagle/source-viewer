"use client";
import { setUser, useUser } from "@/hooks/useZustand";
import OSC from "osc-js";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function OscState() {
  const [osc, setSpeakerNo, setSourceNo, setBgColor, sendOsc] = useUser(
    useShallow((s) => [
      s.osc,
      s.setSpeakerNo,
      s.setSourceNo,
      s.setBgColor,
      s.sendOsc,
    ])
  );
  useEffect(() => {
    if (!osc) return;
    osc.on("/speaker/number", (msg: { args: Array<number> }) =>
      setSpeakerNo(msg.args[0])
    );
    osc.on("/source/number", (msg: { args: Array<number> }) => setSourceNo(msg.args[0]));
    osc.on("/background/color", (msg: { args: Array<number> }) =>
      setBgColor({
        r: msg.args[0] * 255,
        g: msg.args[1] * 255,
        b: msg.args[2] * 255,
      })
    );
    osc.on("/speaker/size", (msg: { args: Array<number> }) =>
      setUser("speakerSize", msg.args[0])
    );
    osc.on("/source/size", (msg: { args: Array<number> }) =>
      setUser("sourceSize", msg.args[0])
    );
    osc.on("/speaker/numDisplay", (msg: { args: Array<number> }) =>
      setUser("speakerNumDisplay", !!msg.args[0])
    );
    osc.on("/source/numDisplay", (msg: { args: Array<number> }) =>
      setUser("sourceNumDisplay", !!msg.args[0])
    );
    osc.on("/source/fade", (msg: { args: Array<number> }) =>
      setUser("sourceFade", !!msg.args[0])
    );
    osc.on("/interface/disable", (msg: { args: Array<number> }) =>
      setUser("disableInterface", !!msg.args[0])
    );
    osc.on("/interface/display", (msg: { args: Array<number> }) =>
      setUser("displayInterface", !!msg.args[0])
    );
    osc.on("/axis", (msg: { args: Array<number> }) =>
      setUser("axisToggle", !!msg.args[0])
    );
    osc.on("/grid/xz/on", (msg: { args: Array<number> }) =>
      setUser("gridXZToggle", !!msg.args[0])
    );
    osc.on("/grid/yz/on", (msg: { args: Array<number> }) =>
      setUser("gridYZToggle", !!msg.args[0])
    );
    osc.on("/grid/xy/on", (msg: { args: Array<number> }) => {
      setUser("gridXYToggle", !!msg.args[0]);
    });
    osc.on("/grid/xz/inf", (msg: { args: Array<number> }) =>
      setUser("gridXZInf", !!msg.args[0])
    );
    osc.on("/grid/yz/inf", (msg: { args: Array<number> }) =>
      setUser("gridYZInf", !!msg.args[0])
    );
    osc.on("/grid/xy/inf", (msg: { args: Array<number> }) =>
      setUser("gridxyInf", !!msg.args[0])
    );
    osc.on(
      "/grid/xz/xyz",
      (message: { address: string; args: Array<number> }) => {
        const newPos = [message.args[0], message.args[1], message.args[2]];
        setUser("gridPosXZ", newPos);
      }
    );
    osc.on(
      "/grid/yz/xyz",
      (message: { address: string; args: Array<number> }) => {
        const newPos = [message.args[0], message.args[1], message.args[2]];
        setUser("gridPosYZ", newPos);
      }
    );
    osc.on(
      "/grid/xy/xyz",
      (message: { address: string; args: Array<number> }) => {
        const newPos = [message.args[0], message.args[1], message.args[2]];
        setUser("gridPosXY", newPos);
      }
    );
    osc.on("/grid/size", (msg: { args: Array<number> }) =>
      setUser("gridSize", msg.args[0])
    );
    osc.on("/grid/section/size", (msg: { args: Array<number> }) =>
      setUser("sectionSize", msg.args[0])
    );
    osc.on("/grid/subdiv/size", (msg: { args: Array<number> }) =>
      setUser("subGridDiv", msg.args[0])
    );
    osc.on("/grid/section/color", (msg: { args: Array<number> }) =>
      setUser("gridColor", {
        r: msg.args[0] * 255,
        g: msg.args[1] * 255,
        b: msg.args[2] * 255,
      })
    );
    osc.on("/grid/subdiv/color", (msg: { args: Array<number> }) =>
      setUser("subGridColor", {
        r: msg.args[0] * 255,
        g: msg.args[1] * 255,
        b: msg.args[2] * 255,
      })
    );
    osc.on("/grid/snap", (msg: { args: Array<number> }) =>
      setUser("editSnap", !!msg.args[0])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osc]);

  useEffect(() => {
    if (!osc || !sendOsc) return;
    const s = useUser.getState();
    const msg1 = new OSC.Message("/speaker/number", s.speakerNo);
    const msg2 = new OSC.Message("/source/number", s.sourceNo);
    const msg3 = new OSC.Message(
      "/background/color",
      s.bgColor.r / 255,
      s.bgColor.g / 255,
      s.bgColor.b / 255,
      1
    );
    const msg4 = new OSC.Message("/speaker/size", s.speakerSize);
    const msg5 = new OSC.Message("/source/size", s.sourceSize);
    const msg6 = new OSC.Message(
      "/speaker/numDisplay",
      Number(s.speakerNumDisplay)
    );
    const msg7 = new OSC.Message(
      "/source/numDisplay",
      Number(s.sourceNumDisplay)
    );
    const msg8 = new OSC.Message("/source/fade", Number(s.sourceFade));
    const msg9 = new OSC.Message(
      "/interface/disable",
      Number(s.disableInterface)
    );
    const msg10 = new OSC.Message(
      "/interface/display",
      Number(s.displayInterface)
    );
    const msg11 = new OSC.Message("/axis", Number(s.axisToggle));
    const msg12 = new OSC.Message("/grid/xz/on", Number(s.gridXZToggle));
    const msg13 = new OSC.Message("/grid/yz/on", Number(s.gridYZToggle));
    const msg14 = new OSC.Message("/grid/xy/on", Number(s.gridXYToggle));
    const msg15 = new OSC.Message("/grid/xz/inf", Number(s.gridXZInf));
    const msg16 = new OSC.Message("/grid/yz/inf", Number(s.gridYZInf));
    const msg17 = new OSC.Message("/grid/xy/inf", Number(s.gridXYInf));
    const msg18 = new OSC.Message("/grid/xz/xyz", ...s.gridPosXZ);
    const msg19 = new OSC.Message("/grid/yz/xyz", ...s.gridPosYZ);
    const msg20 = new OSC.Message("/grid/xy/xyz", ...s.gridPosXY);
    const msg21 = new OSC.Message("/grid/size", s.gridSize);
    const msg22 = new OSC.Message("/grid/section/size", s.sectionSize);
    const msg23 = new OSC.Message("/grid/subdiv/size", s.subGridDiv);
    const msg24 = new OSC.Message(
      "/grid/section/color",
      s.gridColor.r / 255,
      s.gridColor.g / 255,
      s.gridColor.b / 255
    );
    const msg25 = new OSC.Message(
      "/grid/subdiv/color",
      s.subGridColor.r / 255,
      s.subGridColor.g / 255,
      s.subGridColor.b / 255
    );
    const msg26 = new OSC.Message("/grid/snap", Number(s.editSnap));
    const bundle = new OSC.Bundle(
      msg1,
      msg2,
      msg3,
      msg4,
      msg5,
      msg6,
      msg7,
      msg8,
      msg9,
      msg10,
      msg11,
      msg12,
      msg13,
      msg14,
      msg15,
      msg16,
      msg17,
      msg18,
      msg19,
      msg20,
      msg21,
      msg22,
      msg23,
      msg24,
      msg25,
      msg26
    );
    osc?.send(bundle);
    setUser("sendOsc", false);
  }, [sendOsc]);

  return null;
}
