import { Vector3, MeshPhongMaterial, Mesh, BufferGeometry, NormalBufferAttributes } from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useUser } from '@/hooks/useZustand'

export default function SoundSource ({ index }: {index: number}) {
  const osc = useUser(s => s.osc)
  const sourceFade = useUser(s => s.sourceFade)
  useEffect(() => {
    if (useUser.getState().sourceColor[index]) return
    useUser.getState().setNestedZus('sourceColor', index, {r: 255, g: 255, b: 255, a:1})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    if (!osc) return
    const xyz = osc.on('/source/' + (index) + '/xyz', (message: { args: Array<number> }) => {
      vec.current.fromArray([message.args[0], message.args[2], -message.args[1]])
    })
    const color = osc.on('/source/' + (index) + '/color', (message: { args: any }) => {
      useUser.getState().setNestedZus('sourceColor', index, { r: message.args[0] * 255, g: message.args[1] * 255, b: message.args[2] * 255, a: message.args[3] })
    })
    return () => {
      osc.off('/source/' + (index) + '/xyz', xyz)
      osc.off('/source/' + (index) + '/color', color)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osc])

  const ball = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(null)
  const mat = useRef<MeshPhongMaterial | null>(null)
  const vec = useRef<Vector3>(new Vector3(...[Math.random() * 5, Math.random() *5, Math.random() * 5]))
  const sourceColor = useUser(s => s.sourceColor[index])

  useEffect(() => {
    if (!mat.current) return
    if (sourceFade === false) mat.current.opacity = 1
  }, [sourceFade])

  useFrame((_, delta) => {
    if (!ball.current || !mat.current) return
    if (sourceFade && (mat.current.opacity > 0)) {
      mat.current.opacity -= 0.1
    }
  
    if ((!(vec.current.equals(ball.current.position))) && (!(mat.current.opacity > 0))) {
      ball.current.position.copy(vec.current)
      mat.current.opacity = (sourceColor?.a) ? sourceColor?.a : 1
      return
    }
    if (!(vec.current.equals(ball.current.position))) {
      // if lerp factor < 0.5, it will never converge to final position, but if it's > 0.5 it looks sluggish, 
      // hence the distance check to change the lerp factor
      if (ball.current.position.distanceTo(vec.current) > 0.001) {
        ball.current.position.lerp(vec.current, 0.1)
      } else {
        ball.current.position.lerp(vec.current, 0.6)
      }
      mat.current.opacity = (sourceColor?.a) ? sourceColor?.a : 1
    }
  })

  return (
    <mesh ref={ball}>
      <sphereGeometry args={[0.05, 32, 16]} />
      <meshPhongMaterial ref={mat} transparent={true} color={`rgb(${sourceColor?.r}, ${sourceColor?.g}, ${sourceColor?.b})`}/>
    </mesh>
  )
}
