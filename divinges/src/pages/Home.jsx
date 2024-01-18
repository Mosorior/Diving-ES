// src/pages/Home.jsx

import React from 'react';
import '../style/Home.css'
import Navbar from '../components/Navigation/Navbar';
import indexBackground from '../assets/imgs/index-background.jpg';
import ImageSlider from '../components/Sliders/ImageSlider';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <img
          src={indexBackground}
          alt="Imagen de inicio"
          className="home-image"
        />
        <h1 className="home-title">Diving<b>ES</b></h1>
        <h2 className="home-subtitle">Tu destino para el buceo</h2>
        <p className="home-paragraph">
          Bienvenido a DivingES, tu fuente de información sobre los mejores lugares
          para bucear en España. Explora nuestras guías de buceo, consejos y
          experiencias de buceadores.
        </p>
        <ImageSlider />
        <Footer />
      </div>
      
    </div>
  );
};

export default Home;
