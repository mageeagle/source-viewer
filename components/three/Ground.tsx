// import * as THREE from "three"
// import { useLoader } from "@react-three/fiber"
// import { usePlane } from '@react-three/cannon'
// import grass from "./assets/grass.jpg"
import { Plane } from '@react-three/drei'

export default function Ground () {
  // const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  // const texture = useLoader(THREE.TextureLoader, grass)
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <Plane args={[1200, 1200]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshLambertMaterial color='white' />
    </Plane>
  )
}
