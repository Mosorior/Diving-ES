import React, { useState } from 'react';
import axios from 'axios';
import '../style/ModalBase.css';

const RegisterForm = ({ onClose, toggleModal }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(''); // Añadido para manejar los mensajes de error

    const { username, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify({ username, email, password });

            const response = await axios.post('http://localhost:5000/api/auth/registro', body, config);
            // Asegúrate de que estás accediendo a response.data correctamente
            if (response.data) {
                console.log(response.data); // Maneja la respuesta adecuadamente
                onClose(); // Cierra el modal después del registro exitoso
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error(error.response.data);
                setError(error.response.data.message || 'Error al registrar. Por favor, intente nuevamente.');
            } else {
                console.error(error.message);
                setError('Error al registrar. Por favor, intente nuevamente.');
            }
        }
    };

    return (
        <div className="register-modal">
            {error && <p className="error">{error}</p>}
            <h2>Registrar Nuevo Usuario</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Registrar</button>
                    <button type="button" onClick={onClose}>Cerrar</button>
                </div>
                <div className="alternate-action">
                    <span>¿Ya estás registrado? </span>
                    <button type="button" onClick={() => toggleModal('login')}>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
