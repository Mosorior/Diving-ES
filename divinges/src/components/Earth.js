import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Earth = () => {
  const earthRef = useRef();

  const { scene } = useLoader(GLTFLoader, '/models/RealEarth.glb');

  useFrame(() => {
    if (earthRef.current) {
      //Rotación automática
      earthRef.current.rotation.x += 0.001;
      earthRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <>
      <primitive ref={earthRef} object={scene} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={0.3}
        args={[earthRef.current?.children[0], earthRef.current?.children[0].children[0]]}
      />
    </>
  );
};

export default Earth;
