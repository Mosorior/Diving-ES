// Earth.js
import React, { useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Earth = ({ setShowText, zoomToLocation }) => {
  const earthRef = useRef();

  const { scene } = useGLTF('/models/RealEarth.glb');

  useFrame(() => {
    if (earthRef.current) {
      // Rotación automática solo si no se ha activado el zoom
      if (!zoomToLocation) {
        earthRef.current.rotation.x += 0.001;
        earthRef.current.rotation.y -= 0.005;
      } else {
        earthRef.current.lookAt(0.143, -1.43, 0)
        // Realizar el zoom hacia adentro
        earthRef.current.position.z += 0.05;

      }
    }
  });

  return (
    <group>
      <primitive ref={earthRef} object={scene} />
    </group>
  );
};

export default Earth;
