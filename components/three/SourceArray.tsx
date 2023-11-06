import { useUser } from "@/hooks/useZustand";
import React, { useEffect, useState } from "react";
import SoundSource from "./SoundSource";
import { useShallow } from "zustand/react/shallow";
function SourceArray() {
  const started = useUser((s) => s.started);
  const [sourceArr, setSourceArr] = useState<Array<React.JSX.Element>>([]);
  const [sourceNo, setSourceNo] = useUser(
    useShallow((s) => [s.sourceNo, s.setSourceNo])
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
      out.push(<SoundSource index={ind} key={"source-" + ind} />);
    }
    setSourceArr((s) => [...s, ...out]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, sourceNo]);
  return <>{sourceArr}</>;
}

export default SourceArray;
