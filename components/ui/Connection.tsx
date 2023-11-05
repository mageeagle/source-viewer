'use client'
import { inputClass, buttonClass, innerWrapper, outerWrapper } from "@/constants/styles"
import { useUser } from "@/hooks/useZustand"
import { useShallow } from "zustand/react/shallow"

function Connection() {
    const { ip, setIp } = useUser(
        useShallow((state) => ({ ip: state.ip, setIp: state.setIp }))
      )
    const { port, setPort } = useUser(
        useShallow((state) => ({ port: state.port, setPort: state.setPort }))
      )
    const { sourceNo, setSourceNo } = useUser(
        useShallow((state) => ({ sourceNo: state.sourceNo, setSourceNo: state.setSourceNo }))
      )
    const { speakerNo, setSpeakerNo } = useUser(
        useShallow((state) => ({ speakerNo: state.speakerNo, setSpeakerNo: state.setSpeakerNo }))
      )
    const connect = useUser(s => s.start)
      
  return(
    <div className={outerWrapper + ' max-h-screen'}>
    <div className={innerWrapper + ' max-h-screen'}>
        <div className='my-2'> IP: <input className={inputClass} type="string" value={ip} onChange={e => setIp(e.target.value)} /> </div>
        <div className='my-2'> Port: <input min="0" className={inputClass} type="number" value={port} onChange={e => setPort(Number(e.target.value))} /> </div>
        <div className='my-2'> No. of Sources: <input min="1" className={inputClass} type="number" value={sourceNo} onChange={e => setSourceNo(Number(e.target.value))} /> </div>
        <div className='my-2'> No. of Speakers: <input min="1" className={inputClass} type="number" value={speakerNo} onChange={e => setSpeakerNo(Number(e.target.value))} /> </div>
        <button className={buttonClass} onClick={connect}>Connect</button>
    </div>
    </div>
  )
}

export default Connection