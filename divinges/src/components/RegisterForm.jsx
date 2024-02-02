import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de haber instalado axios

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

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
                setMessage('Registro exitoso. Por favor, inicie sesión.');
            }
        } catch (error) {
            // Manejo adecuado de errores
            if (error.response && error.response.data) {
                console.error(error.response.data);
                setMessage(error.response.data.mensaje || 'Error al registrar. Por favor, intente nuevamente.');
            } else {
                console.error(error.message);
                setMessage('Error al registrar. Por favor, intente nuevamente.');
            }
        }
    };

    return (
        <div>
            <h2>Registrar Nuevo Usuario</h2>
            {message && <p>{message}</p>}
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
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterForm;
