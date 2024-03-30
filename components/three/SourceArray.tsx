"use client";
import { setUser, useUser } from "@/hooks/useZustand";
import React, { useEffect, useState } from "react";
import SoundSource from "./SoundSource";
import { useShallow } from "zustand/react/shallow";

function SourceArray({ editor }: { editor?: boolean }) {
  const started = useUser((s) => s.started);
  const [sourceArr, setSourceArr] = useState<Array<React.JSX.Element>>([]);
  const [sourceNo] = useUser(useShallow((s) => [s.sourceNo]));
  useEffect(() => {
    if (!editor) return;
    setUser("sourceFade", false);
  }, []);

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
      out.push(
        <SoundSource index={ind} key={"source-" + ind} editor={editor} />
      );
    }
    setSourceArr((s) => [...s, ...out]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, sourceNo]);
  return <>{sourceArr}</>;
}

export default SourceArray;
