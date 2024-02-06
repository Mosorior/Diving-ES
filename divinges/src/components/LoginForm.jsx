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
            const response = await fetch('http://localhost:3001/login', { // Ajuste de la URL al endpoint correcto
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Obtiene el mensaje de error del servidor
                throw new Error(errorData.message || 'Error al iniciar sesión'); // Usa el mensaje de error del servidor si está disponible
            }
    
            const data = await response.json();
            localStorage.setItem('token', data.token);
            // Asegúrate de que la función login en tu AuthContext maneje adecuadamente los datos del usuario
            await login(data.user || data); // Ajusta según la estructura de tu respuesta

            onClose(); // Cierra el modal después de un inicio de sesión exitoso
        } catch (error) {
            setError(error.message); // Muestra el mensaje de error obtenido
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {error && <p className="error">{error}</p>}
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        <span>¿No estás registrado?</span>
                        <button type="button" onClick={() => toggleModal('register')}>Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
