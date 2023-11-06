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
      console.log("connected");
    });

    osc.on("close", () => {
      console.log("closed");
    });

    osc.on("error", (message: any) => {
      console.log(message);
    });

    useUser.getState().setOsc(osc);
    osc.open({ host: host, port: port });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return null;
}
