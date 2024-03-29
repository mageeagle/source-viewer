"use client";
import { setUser, useUser } from "@/hooks/useZustand";
import { useEffect } from "react";
import OSC from "osc-js";
import { deepEqual } from "fast-equals";

export default function OscClient() {
  const started = useUser((s) => s.started);
  const oscState = useUser((s) => s.osc);
  const host = useUser((s) => s.ip);
  const port = useUser((s) => s.port);
  useEffect(() => {
    const osc = new OSC();
    useUser.getState().setOsc(osc);
    
    osc.on("open", () => {
      setUser("connected", true);
      const msg = new OSC.Message("/connected", true);
      osc.send(msg);
    });

    osc.on("close", () => {
      setUser("connected", false);
    });

    osc.on(
      "/source/*/xyz",
      (message: { address: string; args: Array<number> }) => {
        const index = Number(message.address.split("/")[2]);
        // const newPos = [message.args[0], message.args[2], -message.args[1]];
        const newPos = [message.args[0], message.args[1], message.args[2]];
        // Position Check
        const pos = useUser.getState().sourcePos[index];
        if (!pos) return;
        if (!deepEqual(newPos, pos.toArray())) {
          pos.fromArray(newPos);
        }
      }
    );

    osc.on(
      "/speaker/*/xyz",
      (message: { address: string; args: Array<number> }) => {
        const index = Number(message.address.split("/")[2]);
        // const newPos = [message.args[0], message.args[2], -message.args[1]];
        const newPos = [message.args[0], message.args[1], message.args[2]];
        // Position Check
        const pos = useUser.getState().speakerPos[index];
        if (!pos) return;
        if (!deepEqual(newPos, pos.toArray())) {
          pos.fromArray(newPos);
        }
      }
    );

    osc.on(
      "/source/*/color",
      (message: { address: string; args: Array<number> }) => {
        const index = Number(message.address.split("/")[2]);
        const state = useUser.getState();
        // Color Check
        const color = state.sourceColor[index];
        if (!color) return;
        const newColor = message.args.toSpliced(3, 1);
        if (!deepEqual(color.toArray(), newColor)) {
          color.fromArray(newColor);
        }
        if (!state.sourceAlpha[index]) return;
        state.sourceAlpha[index].setX(Number(message.args[3]));
      }
    );

    osc.on(
      "/speaker/*/color",
      (message: { address: string; args: Array<number> }) => {
        const index = Number(message.address.split("/")[2]);
        const state = useUser.getState();
        // Color Check
        const color = state.speakerColor[index];
        if (!color) return;
        const newColor = message.args.toSpliced(3, 1);
        if (!deepEqual(color.toArray(), newColor)) {
          color.fromArray(newColor);
        }
        if (!state.speakerAlpha[index]) return;
        state.sourceAlpha[index].setX(Number(message.args[3]));
      }
    );
  }, [])

  useEffect(() => {
    if (!started || !oscState) return;
    oscState.open({ host: host, port: port, secure: (Number(process.env.NEXT_PUBLIC_SECURE) === 1) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return null;
}
