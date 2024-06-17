import React, { useState } from 'react';
import '../style/ModalBase.css';

const RegisterForm = ({ onClose, toggleModal }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/users/register`; // Asegúrate de que la URL esté correcta
            console.log(`Making request to: ${apiUrl}`);

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', setEmail);
            formData.append('password', password);
            // Añade la imagen si es necesario

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            const contentType = response.headers.get('Content-Type');
            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al registrar');
                } else {
                    const errorText = await response.text();
                    console.error('Server error response:', errorText);
                    throw new Error('Error al registrar, respuesta inesperada del servidor');
                }
            }

            if (!contentType || !contentType.includes('application/json')) {
                const errorText = await response.text();
                console.error('Unexpected server response:', errorText);
                throw new Error('Respuesta inesperada del servidor');
            }

            const data = await response.json();
            console.log('User registered successfully:', data);
            onClose(); // Cierra el modal después de un registro exitoso
        } catch (error) {
            console.error('Error durante el registro:', error);
            setError(error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {error && <p className="error">{error}</p>}
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="label">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="label">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Registrarse</button>
                        <button type="button" onClick={onClose}>Cerrar</button>
                    </div>
                    <div className="alternate-action">
                        <span>¿Ya tienes una cuenta? </span>
                        <button type="button" onClick={() => toggleModal('login')}>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
