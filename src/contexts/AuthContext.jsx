import authService from '../services/authService';
import { createContext, useState, useEffect, useContext } from 'react';

// instantiate AuthContext
const AuthContext = createContext(null);

// Custom hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    //   cek jika context tidak ada
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
    };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // check authentication status saat aplikasi dimuat
    useEffect(() => {
        const checkAuth = async () => {
        try {
            const token = authService.getToken();
            const savedUser = authService.getUser();

            if (token && savedUser) {
            // verifikasi token masih valid dengan memanggil API
            const response = await authService.getCurrentUser();
            setUser(response.data || savedUser);
            setIsAuthenticated(true);
            } else {
            setUser(null);
            setIsAuthenticated(false);
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
        };
        checkAuth();
    }, []);

    //login function
    const login = async (credentials) => {
        try {
        setLoading(true);
        const response = await authService.login(credentials);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
        } catch (error) {
        throw error;
        } finally {
        setLoading(false);
        }
    };

    const logout = async () => {
        try {
        await authService.logout();
        } catch (error) {
        console.error('Logout error:', error);
        } finally {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
        setLoading(true);
        const response = await authService.register(userData);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
        } catch (error) {
        throw error;
        } finally {
        setLoading(false);
        }
    };

    // Value yang akan di-share ke seluruh aplikasi
    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        register,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };
export default AuthContext;