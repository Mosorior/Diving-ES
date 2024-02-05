import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { isLoggedIn: true, token } : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Podrías verificar la validez del token contra el servidor aquí
    }, []);

    const login = async (loginData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
            localStorage.setItem('token', response.data.token);
            setUser({ isLoggedIn: true, token: response.data.token, ...response.data.usuario });
            setIsLoading(false);
        } catch (error) {
            setError('Error al iniciar sesión. Por favor, intente nuevamente.');
            setIsLoading(false);
        }
    };

    const logout = () => {
        setIsLoading(true);
        localStorage.removeItem('token');
        setUser(null);
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
