import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Asumiendo que el token JWT incluye información relevante del usuario en su payload
                const decoded = jwtDecode(token);
                return { isLoggedIn: true, token, ...decoded };
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
                return null;
            }
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Este efecto ya maneja la carga inicial del estado de autenticación basado en el token existente
    }, []);

    const login = async (loginData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/login', {
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

            const { token, ...userData } = await response.json();
            localStorage.setItem('token', token);
            // Aquí decodificamos el token para extraer la información del usuario si es necesario
            // O asumimos que userData ya contiene toda la información necesaria
            setUser({
                isLoggedIn: true,
                token,
                ...jwtDecode(token), // Decodifica el token para obtener información del usuario
                ...userData, // Usa directamente los datos del usuario si el token no incluye toda la info necesaria
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
