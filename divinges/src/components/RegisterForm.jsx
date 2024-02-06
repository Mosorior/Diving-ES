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

            if (!response.ok) {
                const errorData = await response.json(); // Intenta parsear el error como JSON
                throw new Error(errorData.message || 'Error al registrar. Por favor, intente nuevamente.');
            }

            // La respuesta es exitosa, puedes optar por mostrar un mensaje de éxito
            // o realizar otras acciones como iniciar sesión automáticamente.
            const data = await response.json(); // Parsea la respuesta exitosa como JSON
            console.log('Registro exitoso:', data);
            // Aquí puedes redirigir al usuario o cerrar el modal de registro y mostrar un mensaje de éxito
            onClose(); // Cierra el modal después de un registro exitoso
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
