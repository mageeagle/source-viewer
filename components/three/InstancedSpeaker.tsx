"use client"
import { MeshLambertMaterial, InstancedMesh, BoxGeometry } from "three";
import { useRef, useEffect, useState } from "react";
import { setUser, useUser } from "@/hooks/useZustand";
import { useFrame } from "@react-three/fiber";
import { useShallow } from "zustand/react/shallow";
import InstancedSpeakerLerp from "./InstancedSpeakerLerp";

export default function InstancedSpeaker() {
  const ref = useRef<InstancedMesh>(null);
  useEffect(() => {
    setUser("speakerRef", ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const started = useUser((s) => s.started);
  const [speakerArr, setSpeakerArr] = useState<Array<React.JSX.Element>>([]);
  const [speakerNo, setSpeakerNo, speakerSize] = useUser(
    useShallow((s) => [s.speakerNo, s.setSpeakerNo, s.speakerSize])
  );
  const osc = useUser((s) => s.osc);
  useEffect(() => {
    if (!osc) return;
    osc.on("/speaker/number", (msg: { args: Array<number> }) => {
      setSpeakerNo(msg.args[0])
    }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osc]);

  useEffect(() => {
    if (!started) return;
    if (speakerNo === speakerArr.length) return;
    if (speakerArr.length > speakerNo) {
      setSpeakerArr(speakerArr.toSpliced(speakerNo, speakerArr.length));
      return;
    }
    const out: Array<React.JSX.Element> = [];
    for (let i = speakerArr.length; i < speakerNo; i++) {
      const ind = i + 1;
      out.push(<InstancedSpeakerLerp index={ind} key={"speaker-" + ind} />);
    }
    setSpeakerArr((s) => [...s, ...out]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, speakerNo]);

  const size = useRef(0.1)
  useEffect(() => {
    if (!speakerSize) return
    const newSize = speakerSize / 1000
    const scale = newSize / size.current
    ref.current?.geometry.scale(scale, scale, scale)
    size.current = newSize
  }, [speakerSize])

  useFrame(() => {
    if (!ref.current) return;
    // I would rather update it all the time, comparing each frame for lerping seems annoying
    ref.current.instanceMatrix.needsUpdate = true;
    if (!ref.current.instanceColor) return;
    ref.current.instanceColor.needsUpdate = true;
  });
  // Max Number of Speakers now is 1000
  return (
    <>
      {speakerArr}
      <instancedMesh
        ref={ref}
        args={[geo, mat, 1000]}
        count={speakerNo}
        frustumCulled={false}
      />
    </>
  );
}
const geo = new BoxGeometry(0.1, 0.1, 0.1);
const mat = new MeshLambertMaterial();
