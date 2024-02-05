import React, { useState } from 'react';
import axios from 'axios';
import '../style/ModalBase.css';

const LoginForm = ({ onClose, toggleModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
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
