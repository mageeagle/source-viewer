import { useUser } from '@/hooks/useZustand'
import React, { useEffect, useState } from 'react'
import SpeakerSource from './SpeakerSource'
import { useShallow } from 'zustand/react/shallow'
function SpeakerArray() {
    const started = useUser(s => s.started)
    const [speakerArr, setSpeakerArr] = useState<Array<React.JSX.Element>>([])
    const [speakerNo, setSpeakerNo] = useUser(useShallow(s => [s.speakerNo, s.setSpeakerNo]))
    const osc = useUser(s => s.osc)
    useEffect(() => {
      if (!osc) return
      osc.on('/speaker/number', (msg: { args: number }) => setSpeakerNo(msg.args))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [osc])

    useEffect(() => {
        if (!started) return
        if (speakerArr.length === speakerNo) return
        if (speakerArr.length > speakerNo) {
          setSpeakerArr(speakerArr.toSpliced(speakerNo, speakerArr.length - speakerNo))
          return
        }
        const out:Array<React.JSX.Element> = []
        for (let i = speakerArr.length; i < speakerNo; i++) {
          const ind = i + 1
            out.push(<SpeakerSource index={ind} key={'speaker-' + ind}/>)
        }
        setSpeakerArr(s => [...s, ...out])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started, speakerNo])
  return (
    <>
    {speakerArr}
    </>
  )
}

export default SpeakerArray