import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Asegúrate de que esta ruta sea correcta
import '../style/ModalBase.css';

const LoginForm = ({ onClose, toggleModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Asume que login actualiza el contexto global con la información del usuario

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/users/login`; // URL ajustada
            console.log(`Making request to: ${apiUrl}`);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const contentType = response.headers.get('Content-Type');
            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al iniciar sesión');
                } else {
                    const errorText = await response.text();
                    console.error('Server error response:', errorText);
                    throw new Error('Error al iniciar sesión, respuesta inesperada del servidor');
                }
            }

            if (!contentType || !contentType.includes('application/json')) {
                const errorText = await response.text();
                console.error('Unexpected server response:', errorText);
                throw new Error('Respuesta inesperada del servidor');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            // Aquí, asegúrate de que la función login maneje adecuadamente los datos del usuario,
            // incluida la imagen de perfil si está disponible en la respuesta
            await login(data); // Pasamos todos los datos a la función login

            window.location.reload();

            onClose(); // Cierra el modal después de un inicio de sesión exitoso
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
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
                        <span>¿No estás registrado? </span>
                        <button type="button" onClick={() => toggleModal('register')}>Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
