import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import '../style/ModalBase.css';

const LoginForm = ({ onClose }) => { // Se ha quitado toggleModal ya que no se usa dentro de este componente
    const [username, setUsername] = useState(''); // Cambiado de email a username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password }); // Cambiado de email a username
            localStorage.setItem('token', response.data.token);
            login(response.data.usuario);
            onClose();
        } catch (error) {
            setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {error && <p className="error">{error}</p>}
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario:</label> {/* Cambiado de Correo Electrónico a Nombre de Usuario */}
                        <input
                            type="text" // Cambiado de email a text
                            id="username" // Cambiado de email a username
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Cambiado setEmail a setUsername
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Iniciar Sesión</button>
                        <button type="button" onClick={onClose}>Cerrar</button>
                    </div>
                    {/* La funcionalidad para alternar al formulario de registro debe manejarse en el componente padre o a través de enrutamiento */}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
