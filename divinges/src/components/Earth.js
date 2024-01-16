// Earth.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const Earth = () => {
  const earthRef = useRef();
  const navigate = useNavigate();

  const { scene } = useGLTF('/models/RealEarth.glb');

  useFrame(() => {
    if (earthRef.current) {
      // Rotación automática
      earthRef.current.rotation.x += 0.001;
      earthRef.current.rotation.y -= 0.005;
    }
  });

  const handleClick = () => {
    // Redirigir a la nueva página al hacer clic
    navigate('/home');
  };

  return (
    <group onClick={handleClick}>
      <primitive ref={earthRef} object={scene} />
    </group>
  );
};

export default Earth;
