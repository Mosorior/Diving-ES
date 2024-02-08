import React, { useState } from 'react';
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
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Verifica si el tipo de contenido de la respuesta es JSON antes de analizarlo
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await response.json(); // Seguro para analizar como JSON

                if (!response.ok) {
                    throw new Error(data.message || 'Error al registrar. Por favor, intente nuevamente.');
                }

                console.log('Registro exitoso:', data);
                onClose(); // Cierra el modal después de un registro exitoso
            } else {
                // No es JSON, maneja el caso adecuadamente, por ejemplo, leyendo la respuesta como texto
                const text = await response.text();
                throw new Error(text || 'Error al registrar. La respuesta no es JSON.');
            }
        } catch (error) {
            console.error("Error durante el registro:", error);
            setError(error.message); // Actualiza el estado de error con el mensaje de error
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
                        <span>¿Ya estás registrado?</span>
                        <button type="button" onClick={() => toggleModal('login')}>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
