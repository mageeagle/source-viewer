"use client";
import { MeshLambertMaterial, InstancedMesh, SphereGeometry } from "three";
import { useRef, useEffect, useState } from "react";
import { setUser, useUser } from "@/hooks/useZustand";
import { useFrame } from "@react-three/fiber";
import { useShallow } from "zustand/react/shallow";
import InstancedSourceLerp from "./InstancedSourceLerp";

export default function InstancedSource() {
  const ref = useRef<InstancedMesh>(null);
  useEffect(() => {
    setUser("sourceRef", ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const started = useUser((s) => s.started);
  const [sourceArr, setSourceArr] = useState<Array<React.JSX.Element>>([]);
  const [sourceNo, setSourceNo, sourceSize] = useUser(
    useShallow((s) => [s.sourceNo, s.setSourceNo, s.sourceSize])
  );
  const osc = useUser((s) => s.osc);
  useEffect(() => {
    if (!osc) return;
    osc.on("/source/number", (msg: { args: Array<number> }) =>
      setSourceNo(msg.args[0])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osc]);

  useEffect(() => {
    if (!started) return;
    if (sourceNo === sourceArr.length) return;
    if (sourceArr.length > sourceNo) {
      setSourceArr(sourceArr.toSpliced(sourceNo, sourceArr.length));
      return;
    }
    const out: Array<React.JSX.Element> = [];
    for (let i = sourceArr.length; i < sourceNo; i++) {
      const ind = i + 1;
      out.push(<InstancedSourceLerp index={ind} key={"source-" + ind} />);
    }
    setSourceArr((s) => [...s, ...out]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, sourceNo]);

  const size = useRef(0.05)
  useEffect(() => {
    if (!sourceSize) return
    const newSize = sourceSize / 1000
    const scale = newSize / size.current
    ref.current?.geometry.scale(scale, scale, scale)
    size.current = newSize
  }, [sourceSize])
  
  useFrame(() => {
    if (!ref.current) return;
    // I would rather update it all the time, comparing each frame for lerping seems annoying
    ref.current.instanceMatrix.needsUpdate = true;
    if (!ref.current.instanceColor) return;
    ref.current.instanceColor.needsUpdate = true;
  });
  // Max Number of Sources now is 1000
  // Drei's Instances looks like a more updated way to do this, 
  // but since this is already up and working, I won't be changing this for now
  return (
    <>
      {sourceArr}
      <instancedMesh
        ref={ref}
        args={[geo, mat, 1000]}
        count={sourceNo}
        frustumCulled={false}
        />
    </>
  );
}


const geo = new SphereGeometry(0.05, 32, 16);
const mat = new MeshLambertMaterial({ transparent: true });
