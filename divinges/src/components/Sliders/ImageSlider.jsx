// src/components/ImageSlider.jsx

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../style/ImageSlider.css';

//Importa tus imágenes
import diving1 from '../../assets/imgs/carrousel/diving-1.jpg';
import diving2 from '../../assets/imgs/carrousel/diving-2.jpg';
import diving3 from '../../assets/imgs/carrousel/diving-3.jpg';

const ImageSlider = () => {
  const slides = [
    {
      image: diving1,
      text: 'Antes de sumergirte, verifica siempre tu equipo de buceo para asegurarte de que esté en perfectas condiciones.',
    },
    {
      image: diving2,
      text: 'Mantén un control constante de tu consumo de aire y nunca te aventures demasiado lejos de tu punto de entrada o salida.',
    },
    {
      image: diving3,
      text: 'La seguridad es lo primero: sigue siempre las reglas de buceo y nunca te excedas en tus límites de profundidad y tiempo de inmersión.',
    },
    // Agrega más objetos para más imágenes y textos
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 30,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className='slide-container'>
            <div className='image-wrapper'>
              <img
              src={slide.image}
              alt={`Imagen ${index + 1}`}
              className='slide-image'/>
            </div>
            <div className='text-overlay'>
              <div className='slide-text'>{slide.text}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};



export default ImageSlider;
