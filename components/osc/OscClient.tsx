"use client";
import { useUser } from "@/hooks/useZustand";
import { useEffect } from "react";
import OSC from "osc-js";

export default function OscClient() {
  const started = useUser((s) => s.started);
  const oscState = useUser((s) => s.osc);
  const host = useUser((s) => s.ip);
  const port = useUser((s) => s.port);
  useEffect(() => {
    if (!started || oscState) return;
    const osc = new OSC();

    osc.on("open", () => {
      useUser.getState().setOsc(osc);
      useUser.getState().setZus("connected", true);
      const msg = new OSC.Message("/connected", true);
      osc.send(msg);
    });

    osc.on("close", () => {
      useUser.getState().setZus("connected", false);
    });

    osc.on(
      "/source/*/xyz",
      (message: { address: string; args: Array<number> }) => {
        const index = message.address.split("/")[2];
        useUser
          .getState()
          .setNestedZus("sourcePos", index, [
            message.args[0],
            message.args[2],
            -message.args[1],
          ]);
      }
    );

    osc.on(
      "/speaker/*/xyz",
      (message: { address: string; args: Array<number> }) => {
        const index = message.address.split("/")[2];
        useUser
          .getState()
          .setNestedZus("speakerPos", index, [
            message.args[0],
            message.args[2],
            -message.args[1],
          ]);
      }
    );

    osc.on(
      "/source/*/color",
      (message: { address: string; args: Array<number> }) => {
        const index = message.address.split("/")[2];
        useUser.getState().setNestedZus("sourceColor", index, message.args.toSpliced(3, 1));
        useUser.getState().setNestedZus("sourceAlpha", index, message.args[3]);
      }
    );

    osc.on(
      "/speaker/*/color",
      (message: { address: string; args: Array<number> }) => {
        const index = message.address.split("/")[2];
        useUser.getState().setNestedZus("speakerColor", index, message.args.toSpliced(3, 1));
        useUser.getState().setNestedZus("speakerAlpha", index, message.args[3]);
      }
    );

    osc.open({ host: host, port: port });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return null;
}
