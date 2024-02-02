import './style/App.css';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Earth from './components/Earth';
import Home from './pages/Home.jsx';
import Mapa from './pages/Mapa.jsx';
import Calculadora from './pages/Calculadora.jsx';
import Foro from './pages/Foro.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/foro" element={<Foro />} />
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
      }, 2500);
    }, 2000);
  };


  const divingES = (
    <div className={`text overlay ${showText ? 'fade-out' : ''}`}>
      <div className='link' onClick={handleClick}>
        <span className="small diving">Diving</span>
        <span className="large es">ES</span>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
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