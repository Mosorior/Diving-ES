import React, { createContext, useContext, useState, useEffect } from 'react';
import  { jwtDecode } from 'jwt-decode'; // Corrección aquí

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Verifica si ya existe un token al cargar el componente
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            return { isLoggedIn: true, token, ...decoded };
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // No es necesario volver a verificar el token aquí, se hace en el useState inicial
    }, []);

    const login = async (loginData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || 'Error al iniciar sesión. Por favor, intente nuevamente.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setUser({ isLoggedIn: true, token: data.token, ...data.usuario });
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
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
