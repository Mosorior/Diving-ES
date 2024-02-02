import React, { useState } from 'react';

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Aquí pondrías tu lógica de autenticación
        // Por ejemplo, llamar a una función login(email, password)
        try {
            await login(email, password);
            onClose(); // Cerrar el modal si el inicio de sesión es exitoso
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
            // Manejar errores de inicio de sesión aquí (e.g., mostrar un mensaje)
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
