import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Asegúrate de que la ruta sea correcta
import '../../style/NavbarForo.css';

const NavbarForo = () => {
    const { user } = useAuth();

    return (
        <nav className="navbar-foro">
        <div className="nav-links"> {/* Contenedor agregado para los enlaces */}
            <ul>
                <li><NavLink to="/foro/general">General</NavLink></li>
                <li><NavLink to="/foro/equipo">Equipo de Buceo</NavLink></li>
                <li><NavLink to="/foro/sitios">Sitios de Buceo</NavLink></li>
                <li><NavLink to="/foro/conservacion">Conservación Marina</NavLink></li>
            </ul>
        </div>
        {user && (
            <div className="create-post-container"> {/* Contenedor para el botón + */}
                <NavLink to="/crearpost" className="create-post-link">
                    <i className="fas fa-plus create-post-icon"></i>
                </NavLink>
            </div>
        )}
    </nav>
    );
};

export default NavbarForo;
