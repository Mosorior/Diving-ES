import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const Earth = () => {
  const earthRef = useRef();

  // Rotar la Tierra usando useFrame
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]}>
      <meshStandardMaterial attach="material" color="blue" />
    </Sphere>
  );
};

export default Earth;
