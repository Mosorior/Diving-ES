import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../../style/NavbarForo.css';

const NavbarForo = ({ openLoginModal }) => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar-foro">
            <ul>
                <li>
                    <NavLink to="/foro/general" className={({ isActive }) => isActive ? 'active' : undefined}>General</NavLink>
                </li>
                <li>
                    <NavLink to="/foro/equipo" className={({ isActive }) => isActive ? 'active' : undefined}>Equipo de Buceo</NavLink>
                </li>
                <li>
                    <NavLink to="/foro/sitios" className={({ isActive }) => isActive ? 'active' : undefined}>Sitios de Buceo</NavLink>
                </li>
                <li>
                    <NavLink to="/foro/conservacion" className={({ isActive }) => isActive ? 'active' : undefined}>Conservación Marina</NavLink>
                </li>
            </ul>
            {user ? (
                <div className="user-profile">
                    {/* Utiliza directamente la URL proporcionada por el contexto de autenticación */}
                    <img src={user.profileImagePath} alt="Perfil" className="profile-image" />
                    <button onClick={logout}>Cerrar Sesión</button>
                </div>
            ) : (
                <div className="auth-buttons">
                    <button onClick={openLoginModal}>Iniciar Sesión</button>
                </div>
            )}
        </nav>
    );
};

export default NavbarForo;
