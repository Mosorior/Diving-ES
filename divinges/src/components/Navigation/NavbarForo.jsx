import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm'; // Asegúrate de crear este componente
import '../../style/NavbarForo.css'

const NavbarForo = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    const openRegisterModal = () => setShowRegisterModal(true);
    const closeRegisterModal = () => setShowRegisterModal(false);

    return (
        <nav className="navbar-foro">
            <ul>
                <li><NavLink to="/foro/general" activeClassName="active">General</NavLink></li>
                <li><NavLink to="/foro/equipo" activeClassName="active">Equipo de Buceo</NavLink></li>
                <li><NavLink to="/foro/sitios" activeClassName="active">Sitios de Buceo</NavLink></li>
                <li><NavLink to="/foro/conservacion" activeClassName="active">Conservación Marina</NavLink></li>
            </ul>
            <div className="auth-buttons">
                <button onClick={openLoginModal}>Iniciar Sesión</button>
                <button onClick={openRegisterModal}>Registrarse</button>
            </div>
            {showLoginModal && <LoginForm onClose={closeLoginModal} />}
            {showRegisterModal && <RegisterForm onClose={closeRegisterModal} />}
        </nav>
    );
};

export default NavbarForo;
