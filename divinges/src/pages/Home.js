import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer';
import DiveMap from '../components/DiveMap';
import '../style/DiveMap.css'

const Home = () => {
  return (
    <div className='contenedor'>
      <div className='navbar'>
      <Navbar/>
      </div>
      <div className='mapa-container'>
        <DiveMap />
      </div>
      <Footer />
    </div>
  );
};

export default Home;