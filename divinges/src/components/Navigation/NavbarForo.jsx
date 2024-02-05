import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Asegúrate de que la ruta sea correcta
import '../../style/NavbarForo.css';

const NavbarForo = ({ openLoginModal, openRegisterModal }) => {
    const { user } = useAuth(); // Usa el hook useAuth para acceder al estado del usuario

    return (
        <nav className="navbar-foro">
            <ul>
                <li><NavLink to="/foro/general" activeClassName="active">General</NavLink></li>
                <li><NavLink to="/foro/equipo" activeClassName="active">Equipo de Buceo</NavLink></li>
                <li><NavLink to="/foro/sitios" activeClassName="active">Sitios de Buceo</NavLink></li>
                <li><NavLink to="/foro/conservacion" activeClassName="active">Conservación Marina</NavLink></li>
            </ul>
            {/* Muestra los botones solo si el usuario no ha iniciado sesión */}
            {!user && (
                <div className="auth-buttons">
                    <button onClick={openLoginModal}>Iniciar Sesión</button>
                    <button onClick={openRegisterModal}>Registrarse</button>
                </div>
            )}
        </nav>
    );
};

export default NavbarForo;
