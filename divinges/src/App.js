import './style/App.css';
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Earth from './components/Earth';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};


const MainPage = () => {
  const [showText, setShowText] = useState(false); // Cambiado a false para que el texto no se muestre inicialmente
  const [counter, setCounter] = useState(5); // Inicializa el contador en 5 segundos
  const navigate = useNavigate();

  const animateAndRedirect = async () => {
    // Iniciar el contador cuando se hace clic
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    // Después de 5 segundos, ocultar las letras y redirigir
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Limpiar el temporizador al desmontar el componente
    clearInterval(intervalId);

    // Redirigir después de la animación y espera
    navigate('/home');
  };

  const handleClick = () => {
    setShowText(true); // Mostrar las letras al hacer clic
    animateAndRedirect();
  };

  const divingES = (
    <div className={`text overlay ${showText ? 'fade-in-and-move-up' : ''}`}>
      <div className='link' onClick={handleClick}>
        <span className="small">Diving</span>
        <span className="large">ES</span>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Earth setShowText={setShowText} />
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.25} rotateSpeed={0.3} />
      </Canvas>
      {divingES}
    </div>
  );
};
export default App;
