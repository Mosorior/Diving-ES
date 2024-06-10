import React, { useState, useRef, useEffect } from 'react';
import '../../style/Navbar.css'; // Verifica que la ruta sea correcta
import BurgerButton from './BurgerButton';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm.jsx'; // Verifica que la ruta sea correcta
import RegisterForm from '../RegisterForm.jsx'; // Verifica que la ruta sea correcta
import { useAuth } from '../AuthContext'; // Verifica que la ruta sea correcta

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleModal = (modalType) => {
    if (modalType === 'login') {
      setShowLoginForm(true);
      setShowRegisterForm(false);
    } else if (modalType === 'register') {
      setShowLoginForm(false);
      setShowRegisterForm(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleOpenLoginModal = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleOpenRegisterModal = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleLinkClick = (path) => {
    setClicked(false); // Asegura que el menú se cierre al seleccionar un enlace
    navigate(path);
  };

  const handleLogoutClick = () => {
    logout();
    window.location.reload();
  };

  const toggleMenuVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Cierra el menú si se hace clic fuera de él
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

  return (
    <>
      <nav className="NavContainer">
        <div className={`menu-bg ${clicked ? 'active' : ''}`}></div>
        <h2 className='Logo' onClick={() => handleLinkClick('/')}>
          Diving<b>ES</b>
        </h2>
        <div className='nav-content'>
          <div className={`links ${clicked ? 'active' : ''}`}>
            <ul>
              <li><Link to="/home" onClick={() => setClicked(false)}>Inicio</Link></li>
              <li><Link to="/mapa" onClick={() => setClicked(false)}>Mapa</Link></li>
              <li><Link to="/calculadora" onClick={() => setClicked(false)}>Calculadora</Link></li>
              <li><Link to="/foro" onClick={() => setClicked(false)}>Foro</Link></li>
            </ul>
          </div>
          {user ? (
            <div className="user-profile" ref={dropdownRef}>
              <img src={`${process.env.REACT_APP_API_URL}/uploads/${user.username}/profile-img/profile.jpeg`} alt="Perfil" className="profile-image" onClick={toggleMenuVisibility} />
              {isDropdownVisible && (
                <div className="dropdown-menu">
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
          <BurgerButton clicked={clicked} handleClick={() => setClicked(!clicked)} />
        </div>
      </nav>
      {showLoginForm && <LoginForm onClose={handleCloseModal} toggleModal={toggleModal} />}
      {showRegisterForm && <RegisterForm onClose={handleCloseModal} toggleModal={toggleModal} />}
    </>
  );
}

export default Navbar;
