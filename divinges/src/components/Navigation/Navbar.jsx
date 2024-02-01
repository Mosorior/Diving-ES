import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../style/Navbar.css';
import BurgerButton from './BurgerButton';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Detecta si la animación ya ha terminado
    const animationEndHandler = () => {
      setAnimationFinished(true);
    };

    // Agrega el evento de escucha para la animación
    document.addEventListener('animationend', animationEndHandler);

    // Limpia el evento de escucha al desmontar el componente
    return () => {
      document.removeEventListener('animationend', animationEndHandler);
    };
  }, []);

  useEffect(() => {
    // Si estamos en la página de inicio y la animación ya ha terminado,
    // establece clicked a true para mostrar la Navbar a escala normal
    if (location.pathname === '/home' && animationFinished) {
      setClicked(true);
    }
  }, [location.pathname, animationFinished]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (path) => {
    setClicked(false);
    if (window.innerWidth <= 768) {
      setHovered(false);
    }
    navigate(path);
  };

  return (
    <>
      <NavContainer>
        <h2
          className='Logo'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => handleLinkClick('/')}
          style={{ cursor: hovered ? 'pointer' : 'default' }}
        >
          Diving<b>ES</b>
        </h2>
        <nav className={`links ${clicked ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/home">Inicio</Link>
            </li>
            <li>
              <Link to="/mapa">Mapa</Link>
            </li>
            <li>
              <Link to="/informacion">Información</Link>
            </li>
            <li>
              <Link to="/calculadora">Calculadora</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
          </ul>
        </nav>
        <div className='burger'>
          <BurgerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>
    </>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  position: initial;
  top: 0;
  width: 100%;
  padding: 0.4rem;
  background-color: #001f3f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;

  @media (min-width: 768px) {
    position: initial;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: inline;
    margin-right: 5px;
  }
  h2 {
    margin-left: 20px;
    margin-right: 10px;
    font-weight: 400;
    font-family: 'Ethnocentric';
    font-size: 30px;
    background: -webkit-linear-gradient(35deg, #69ecdf, #31828b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #4cb5ab;
    z-index: 4;

    b {
      font-size: 36px;
      font-family: 'Ethnocentric';
    }
    color: #4CB5AB;
  }

  a {
    color: #4CB5AB;
    text-decoration: none;
    margin-right: 1rem;
  }
  .links {
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    border-radius: 10px;
    a {
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media (min-width: 768px) {
      position: initial;
      margin: 0;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      a {
        font-size: 1.5rem;
        color: white;
        display: inline;
      }
    }
  }
  .links.active {
    opacity: 1;
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    z-index: 4;
    text-align: center;
    transform: translateY(0);

    a {
      font-size: 2rem;
      margin-top: 1rem;
      color: white;
    }
  }
  .burger {
    z-index: 4;
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const BgDiv = styled.div`
  opacity: 0;
  position: absolute;
  background-color: #001f3f;
  top: -700px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: 3;
  transition: all 0.6s ease;
  &.active {
    opacity: 1;
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
