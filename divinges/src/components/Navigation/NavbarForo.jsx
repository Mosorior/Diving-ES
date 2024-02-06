import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Asegúrate de que la ruta sea correcta
import '../../style/NavbarForo.css';

const NavbarForo = ({ openLoginModal }) => {
    const { user, logout } = useAuth(); // Extracción correcta de user y logout del contexto

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
                    {/* Asegúrate de que la ruta de la imagen sea correcta y coincida con cómo se almacena en el servidor */}
                    <img src={`http://localhost:3001/uploads/${user.username}/profile-img/profile.jpeg`} alt="Perfil" className="profile-image" />
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
