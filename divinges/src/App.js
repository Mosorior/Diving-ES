import './style/App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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

const DivingES = () => {
  return (
    <div className="text overlay">
      <Link to="/home" className="link">
        <span className="small">Diving</span>
        <span className="large">ES</span>
      </Link>
    </div>
  );
};

const MainPage = () => {
  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Earth />
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.25} rotateSpeed={0.3} />
      </Canvas>
        <DivingES />
    </div>
  );
};

export default App;
