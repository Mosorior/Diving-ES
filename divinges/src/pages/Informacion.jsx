// Informacion.jsx

import React from 'react';
import ImageSlider from '../components/ImageSlider'; // Reemplaza con el nombre de tu componente de Image Slider
import WeatherMap from '../components/WeatherMap'; // Reemplaza con el nombre de tu componente de WeatherMap
//import CurrentsMap from '../components/CurrentsMap'; // Reemplaza con el nombre de tu componente de CurrentsMap
import '../styles/Informacion.css'; // Asegúrate de importar tus estilos

const Informacion = () => {
  return (
    <div className="informacion-container">
      
      {/* Aquí incluye tu componente de Image Slider */}
      <ImageSlider />

      <h2>Condiciones Climáticas</h2>

      {/* Contenedor para los mapas */}
      <div className="maps-container">
        <div className="map-item">
          <h3 className='map-title'>Mapa de Temperaturas</h3>
          <WeatherMap />
        </div>
        {/*<div className="map-item">
          <h3 className='map-title'>Mapa de Corrientes Submarinas</h3>
          <CurrentsMap />
        </div>*/}
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} DivingES. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Informacion;
