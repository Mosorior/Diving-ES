// Earth.js
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const Earth = ({ setShowText }) => {
  const earthRef = useRef();
  const navigate = useNavigate();
  const [zooming, setZooming] = useState(false);

  const { scene } = useGLTF('/models/RealEarth.glb');

  useFrame(() => {
    if (earthRef.current) {
      // Rotación automática
      earthRef.current.rotation.x += 0.001;
      earthRef.current.rotation.y -= 0.005;

      // Zoom localizado hacia España
      if (zooming) {
        const targetPosition = [0, 0, 1.5]; // Cambiar la posición según tus necesidades
        earthRef.current.position.lerp(targetPosition, 0.05);
      }
    }
  });

  const handleClick = async () => {
    // Ocultar las letras antes de redirigir
    setShowText(false);

    // Iniciar zoom
    setZooming(true);

    // Esperar 3 segundos (ajustar según tus necesidades)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Redirigir después de la animación de zoom
    navigate('/home');
  };

  return (
    <group onClick={handleClick}>
      <primitive ref={earthRef} object={scene} />
    </group>
  );
};

export default Earth;
