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
            setUser({
                isLoggedIn: true,
                token,
                ...jwtDecode(token),
                ...userData,
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
