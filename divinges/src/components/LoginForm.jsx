import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import '../style/ModalBase.css';

const LoginForm = ({ onClose, toggleModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
    
            const data = await response.json();
            localStorage.setItem('token', data.token);
            await login(data.usuario);

            // Recarga la página para reflejar el cambio de estado de autenticación
            window.location.reload();
    
            // Aquí puedes redirigir a otra página o forzar una recarga de la página actual
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
                    <div className="alternate-action">
                        <span>¿No estás registrado? </span>
                        <button type="button" onClick={() => toggleModal('register')}>Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
