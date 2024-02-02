import React, { useState } from 'react';
import axios from 'axios'; 

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para manejar errores de inicio de sesión


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Suponiendo que tienes un endpoint /api/auth/login en tu servidor
            const response = await axios.post('/api/auth/login', { email, password });
            const { token } = response.data;
            // Aquí deberías hacer algo con el token, por ejemplo, guardarlo en localStorage
            localStorage.setItem('token', token);
            onClose(); // Cerrar el modal si el inicio de sesión es exitoso
        } catch (error) {
            if (error.response && error.response.data) {
                // Manejar errores específicos devueltos por el servidor
                setError(error.response.data.mensaje);
            } else {
                console.error("Error de inicio de sesión:", error);
                setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
            }
        }
    };

    return (
        <div className="login-modal">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
