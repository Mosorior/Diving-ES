import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de que la importación sea correcta

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Cambio inicial a true para reflejar la carga inicial
    const [error, setError] = useState(null);

    useEffect(() => {
        // Verifica si ya existe un token al cargar el componente
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    isLoggedIn: true,
                    token,
                    ...decoded
                });
            } catch (error) {
                console.error('Error decoding token: ', error);
                localStorage.removeItem('token'); // Remueve el token si no es válido
            }
        }
        setIsLoading(false); // Establece isLoading a false después de intentar cargar el usuario
    }, []);

    const login = async (loginData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/login', { // Asegúrate de ajustar la URL al endpoint correcto
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión. Por favor, intente nuevamente.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            const decoded = jwtDecode(data.token);
            setUser({
                isLoggedIn: true,
                token: data.token,
                ...decoded
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
