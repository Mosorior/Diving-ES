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
  const [showText, setShowText] = useState(false);
  const [zoomToLocation, setZoomToLocation] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // Mostrar las letras al hacer clic
    setShowText(true);
    //Activar el zoom después de 2 segundos
    setTimeout(() => {
      setZoomToLocation(true);
       // Redirigir después de 4 segundos
      setTimeout(() => {
        navigate('/home');
      }, 4000);
    }, 2000);
  };


  const divingES = (
    <div className={`text overlay ${showText ? 'fade-out' : ''}`}>
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
        <Earth setShowText={setShowText} zoomToLocation={zoomToLocation} />
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.25} rotateSpeed={0.3} />
      </Canvas>
      {divingES}
    </div>
  );
};
export default App;