// Logo.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { fontLoader } from 'three/addons/loaders/FontLoader.js'

const Logo = () => {
  const divingRef = useRef();
  const esRef = useRef();

  // Animación para mover hacia arriba
  useFrame(() => {
    const targetY = 3;
    const speed = 0.01;

    if (divingRef.current.position.y < targetY) {
      divingRef.current.position.y += speed;
    }

    if (esRef.current.position.y < targetY) {
      esRef.current.position.y += speed;
    }
  });

  return (
    <group>
      <Text
        ref={divingRef}
        position={[-0.5, 0, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.05}
        className="logo-text white-text"
      >
        <meshStandardMaterial attach="material" color="white" />
        <textGeometry attach="geometry" args={['Diving', { size: 0.5, height: 0.1 }]} />
      </Text>
      <Text
        ref={esRef}
        position={[1.5, 0, 0]} // Ajusta la posición según tus necesidades
        fontSize={1}
        color="blue"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.05}
        className="logo-text blue-text"
      >
        <meshStandardMaterial attach="material" color="blue" />
        <textGeometry attach="geometry" args={['ES', { size: 0.5, height: 0.1 }]} />
      </Text>
    </group>
  );
};

export default Logo;
