'use client'
import { Canvas } from '@react-three/fiber'
import { AdaptiveEvents, AdaptiveDpr, Sky, Environment, Lightformer } from '@react-three/drei'
// import Ground from './Ground'
import Player from './Player'
import SourceArray from './SourceArray'
import { useUser } from '@/hooks/useZustand'
import SpeakerArray from './SpeakerArray'

export default function CanvasCompo () {
  const bgColor = useUser(s => s.bgColor)
  return (
    <Canvas
      camera={{ fov: 45, far: 50000, position: [0, 100, 0] }}
      // camera={{ fov: 45, far: 5000 }}
      gl={{ alpha: false }}
      shadows
    >
      <color attach="background" args={[bgColor]} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      {/* <Sky azimuth={0.5} distance={450000000} inclination={0} sunPosition={[0, 1, 0]} /> */}
      {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
      <ambientLight intensity={1} color={'white'}/>
      <Player />
      <SourceArray />
      <SpeakerArray />
      <directionalLight color="white" position={[10000, 10000, 10000]} />
      {/* <directionalLight color="white" position={[-10000, 10000, -10000]} /> */}
      {/* <directionalLight color="white" position={[10000, -10000, 10000]} /> */}
      {/* <directionalLight color="white" position={[-10000, -10000, -10000]} /> */}
    </Canvas>
  )
}
