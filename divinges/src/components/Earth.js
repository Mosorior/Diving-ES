// Earth.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

const Earth = ({ clicked }) => {
  const earthRef = useRef();

  const { scene } = useGLTF('/models/RealEarth.glb');

  useFrame(() => {
    if (earthRef.current && !clicked) {
      // Rotación automática
      earthRef.current.rotation.x += 0.001;
      earthRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <group>
      {!clicked && (
        <>
          <primitive ref={earthRef} object={scene} />
        </>
      )}
    </group>
  );
};

export default Earth;
