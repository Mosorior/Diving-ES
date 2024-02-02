import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../LoginForm';

const NavbarForo = () => {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    return (
        <nav className="navbar-foro">
            <ul>
                <li><NavLink to="/foro/general" activeClassName="active">General</NavLink></li>
                <li><NavLink to="/foro/equipo" activeClassName="active">Equipo de Buceo</NavLink></li>
                <li><NavLink to="/foro/sitios" activeClassName="active">Sitios de Buceo</NavLink></li>
                <li><NavLink to="/foro/conservacion" activeClassName="active">Conservación Marina</NavLink></li>
            </ul>
            <button onClick={openLoginModal}>Iniciar Sesión</button>
            {showLoginModal && <LoginForm onClose={closeLoginModal} />}
        </nav>
    );
};

export default NavbarForo;
