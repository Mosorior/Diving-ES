// App.js
import './style/App.css';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Earth from './components/Earth';

const App = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className={`app-container ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {!clicked && <Earth />}
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.25} rotateSpeed={0.3} />
      </Canvas>
      <div className={`overlay ${clicked ? 'clicked' : ''}`}>
        <div className="text">
          <span className="small">Diving</span>
          <span className="large">ES</span>
        </div>
      </div>
    </div>
  );
};

export default App;
