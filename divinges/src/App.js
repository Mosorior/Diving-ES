
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Earth from './components/Earth';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Earth />
      </Canvas>
    </div>
  );
};

export default App;
