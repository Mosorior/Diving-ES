import './style/App.css'
import './style/Logo.css'
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Earth from './components/Earth';
import Logo from './components/Logo';

const App = () => {
  return (
    <div style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Earth />
        
      </Canvas>
    </div>
  );
};

export default App;
