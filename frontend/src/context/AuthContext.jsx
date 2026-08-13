import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import authService from '../services/authService';
import { setupResponseInterceptor } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => !!localStorage.getItem('access_token'),
    );
    const [user, setUser] = useState(null);

    const handleLogout = useCallback(() => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    useEffect(() => {
        setupResponseInterceptor(handleLogout);
    }, [handleLogout]);

    const handleLogin = async (identifier, password) => {
        try {
            const data = await authService.login(identifier, password);
            setIsAuthenticated(true);
            setUser(data.user ?? null);
            return { success: true };
        } catch (error) {
            const message =
                error.response?.data?.non_field_errors?.[0]
                || error.response?.data?.detail
                || 'Invalid credentials';
            return { success: false, message };
        }
    };

    const handleRegister = async (formData) => {
        try {
            await authService.register(formData);
            const loginResult = await handleLogin(formData.username, formData.password);
            return loginResult;
        } catch (error) {
            const data = error.response?.data;
            const message =
                data?.username?.[0]
                || data?.email?.[0]
                || data?.password?.[0]
                || data?.detail
                || 'Registration failed';
            return { success: false, message };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                handleLogin,
                handleRegister,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
