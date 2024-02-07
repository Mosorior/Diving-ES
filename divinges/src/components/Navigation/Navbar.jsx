import React, { useState, useRef, useEffect } from 'react';
import '../../style/Navbar.css'; // Asegúrate de que la ruta sea correcta
import BurgerButton from './BurgerButton';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../LoginForm.jsx'; // Asegúrate de que la ruta sea correcta
// Import RegisterForm si lo necesitas
import { useAuth } from '../AuthContext'; // Asegúrate de que la ruta sea correcta

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  useEffect(() => {
    const animationEndHandler = () => {
      setAnimationFinished(true);
    };
    document.addEventListener('animationend', animationEndHandler);
    return () => {
      document.removeEventListener('animationend', animationEndHandler);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (location.pathname === '/home' && animationFinished) {
      setClicked(true);
    }
  }, [location.pathname, animationFinished]);

  const handleLinkClick = (path) => {
    setClicked(false);
    navigate(path);
  };

  const handleLogoutClick = () => {
    logout();
    window.location.reload(); // Recarga la página para reflejar el cambio de estado de autenticación
  };

  const toggleMenuVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <nav className="NavContainer">
        <h2 className='Logo' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => handleLinkClick('/')}>
          Diving<b>ES</b>
        </h2>
        <div className='nav-content'>
          <nav className={`links ${clicked ? 'active' : ''}`}>
            <ul>
              <li><Link to="/home">Inicio</Link></li>
              <li><Link to="/mapa">Mapa</Link></li>
              <li><Link to="/informacion">Información</Link></li>
              <li><Link to="/calculadora">Calculadora</Link></li>
              <li><Link to="/foro">Foro</Link></li>
            </ul>
          </nav>
          {user ? (
            <div className="user-profile" ref={dropdownRef}>
              <img src={`http://localhost:3001/uploads/${user.username}/profile-img/profile.jpeg`} alt="Perfil" className="profile-image" onClick={toggleMenuVisibility} />
              {isDropdownVisible && (
                <div className="dropdown-menu">
                  <Link to="/perfil" className="dropdown-item">Perfil</Link>
                  <div onClick={handleLogoutClick} className="dropdown-item">Cerrar Sesión</div>
                </div>
              )}
            </div>
          ) : (
            <div className="login-button" onClick={handleOpenLoginModal}>
              <i className="fas fa-sign-in-alt"></i>
            </div>
          )}
        </div>
        <div className='burger'>
          <BurgerButton clicked={clicked} handleClick={handleLinkClick} />
        </div>
      </nav>
      {showLoginModal && <LoginForm onClose={handleCloseLoginModal} />}
      {/* Aquí podrías incluir el RegisterForm si es necesario */}
    </>
  );
}

export default Navbar;
