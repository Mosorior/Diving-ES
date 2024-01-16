// Earth.js
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const Earth = ({ setShowText }) => {
  const earthRef = useRef();

  const { scene } = useGLTF('/models/RealEarth.glb');

  useFrame(() => {
    if (earthRef.current) {
      // Rotación automática
      earthRef.current.rotation.x += 0.001;
      earthRef.current.rotation.y -= 0.005;
      }
    });

  return (
    <group>
      <primitive ref={earthRef} object={scene} />
    </group>
  );
};

export default Earth;
