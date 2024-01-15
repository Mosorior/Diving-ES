import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import earthTexture from "./8081_earth.jpg";

export const Earth = () => {
  const earthRef = useRef();
  const texture = useTexture(earthTexture);
  const [isDragging, setDragging] = useState(false);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const { movementX, movementY } = event.nativeEvent;
      earthRef.current.rotation.y += movementX / 300;
      earthRef.current.rotation.x += movementY / 300;
    }
  };

  const handlePointerLeave = () => {
    setDragging(false);
  };


  // Rotar la Tierra automáticamente
  useFrame(() => {
    if (!isDragging && earthRef.current) {
      earthRef.current.rotation.y -= 0.0005;
    }
  });

  return (
    <Sphere
      ref={earthRef}
      args={[2, 64, 64]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <meshStandardMaterial attach="material" map={texture} />
    </Sphere>
  );
};

export default Earth;
