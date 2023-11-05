'use client'
import { Vector3 } from 'three'
import { useUser } from '../../hooks/useZustand'
import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls, OrbitControls } from '@react-three/drei'
import { Mesh, BufferGeometry, NormalBufferAttributes } from 'three'
import { useShallow } from 'zustand/react/shallow'
import regainPointer from '@/helpers/regainPointer'
import OSC from 'osc-js'

const SPEED = 0.25
const keys = { KeyE: 'god', KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', Space: 'fast', KeyH: 'help' }
const moveFieldByKey = (key: keyof typeof keys) => keys[key]
// Distance from the ground from god view
const topView = new Vector3(0, 20, 0)
const usePlayerControls = () => {
  const [movement, setMovement] = useState({ god: false, forward: false, backward: false, left: false, right: false, fast: false, help: false })
  useEffect(() => {
    const handleKeyDown = (e: { code: any }) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e: { code: any }) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  return movement
}

export default function Player () {
  const direction = useRef(new Vector3())
  const frontVector = useRef(new Vector3())
  const sideVector = useRef(new Vector3())
  // const speed = useRef(new THREE.Vector3())

  // const [ref, api] = useSphere(() => ({ mass: 1, type: 'Dynamic', position: [0, 10, 0], ...props }))
  const meshRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(null)

  const { fast, forward, backward, left, right, god, help } = usePlayerControls()
  const [godMode, about, osc, setPos, started] = useUser(useShallow(s => [s.god, s.about, s.osc, s.setPos, s.started]))

  // god mode toggle
  useEffect(() => {
    if (!god || !started) return
    useUser.getState().setZus('god', !godMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [god])

  // Regain Pointer after getting out of first person mode
  useEffect(() => {
    if (!godMode) return
      regainPointer()
      timeout.current = 0
      camera.lookAt(0, 0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [godMode])

  // Regain Pointer after getting out of canvas
  useEffect(() => {
    if (!help || !started) return
    regainPointer()
    useUser.getState().setZus('about', !(about))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [help])

  // Three.js Code

  const { camera } = useThree()
 
  const timeout = useRef(0)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    // (!freeState) && meshRef.current.position.copy(camera.position);
    (!godMode) && meshRef.current.getWorldPosition(camera.position)
    // Lazy to set timeout

    if (godMode && timeout.current < 1) {
      timeout.current += delta
      camera.position.lerp(topView, 0.05)
    }
    // fakeRef.current.position.copy(camera.position)
    if (godMode) return
    frontVector.current.set(0, 0, Number(backward) - Number(forward))
    sideVector.current.set(Number(left) - Number(right), 0, 0)
    direction.current.subVectors(frontVector.current, sideVector.current).normalize().multiplyScalar((fast ? (SPEED * 4) : SPEED)).applyEuler(camera.rotation)
    direction.current.y = 0
    // speed.current.fromArray(velocity.current)
    meshRef.current.position.add(direction.current)
    if (!osc) return
    const quat = camera.quaternion 
    const posVec = meshRef.current.position
    setPos([posVec.x, posVec.y, posVec.z])
    // Change to SPAT XYZ convention
    const xyz = new OSC.Message('/listener/xyz', posVec.x, -posVec.z, posVec.y)
    const dir = new OSC.Message('/listener/orientation', -quat.z, quat.x, -quat.y, quat.w)
    const bundle = new OSC.Bundle(xyz, dir)
    osc.send(bundle)
  })

  return (
    <>
      <mesh position={[0, 1, 0]} ref={meshRef} visible={false} />

      {godMode ? <OrbitControls /> : null}
      {
      !godMode && !about &&
        <PointerLockControls />
      }
    </>
  )
}
