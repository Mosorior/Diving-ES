import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import '../style/Home.css'
import Navbar from '../components/Navigation/Navbar';
import indexBackground from '../assets/imgs/index-background.jpg';
import ImageSlider from '../components/Sliders/ImageSlider';
import Footer from '../components/Footer';


const Home = () => {

  const [loaded, setLoaded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Verifica si la cookie "navbarLoaded" está presente
    const navbarLoadedCookie = Cookies.get('navbarLoaded');
    const isNavbarLoaded = navbarLoadedCookie === 'true';

    if (!isNavbarLoaded) {
      // Si la cookie no está presente, establece una cookie y muestra la animación
      Cookies.set('navbarLoaded', 'true', { expires: 1 }); // Caduca en 1 día
      setLoaded(true);
    } else {
      // Si la cookie está presente, muestra la animación sin demora
      setLoaded(true);
      setAnimationFinished(true);
    }
  }, []);

  useEffect(() => {
    const animationEndHandler = () => {
      setAnimationFinished(true);
    };

    document.addEventListener('animationend', animationEndHandler);

    // Limpia el evento de escucha al desmontar el componente
    return () => {
      document.removeEventListener('animationend', animationEndHandler);
    };
  }, []);


  return (
    <div className={`home-container ${loaded ? 'loaded' : ''}`}>
      <Navbar animationFinished={animationFinished} />
      <div className={`content ${animationFinished ? 'visible' : ''}`}>
        <img src={indexBackground} alt="Imagen de inicio" className="home-image" />
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
