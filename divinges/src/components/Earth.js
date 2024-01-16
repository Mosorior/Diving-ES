import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const Earth = () => {
  const earthRef = useRef();
  const { scene } = useLoader(GLTFLoader, '/models/RealEarth.glb');

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.x += 0.01;
      earthRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={earthRef} object={scene} />;
};

export default Earth;
