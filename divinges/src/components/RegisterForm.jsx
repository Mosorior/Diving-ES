import React, { useState } from 'react';
import axios from 'axios';
import '../style/ModalBase.css';

const RegisterForm = ({ onClose, toggleModal }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = JSON.stringify(formData);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.post('http://localhost:5000/api/auth/registro', body, config);
            console.log(response.data);
            onClose();
        } catch (error) {
            setError('Error al registrar. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {error && <p className="error">{error}</p>}
                <h2>Registrar Nuevo Usuario</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="username">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
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
                            value={formData.email}
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
                            value={formData.password}
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
        </div>
    );
};

export default RegisterForm;
