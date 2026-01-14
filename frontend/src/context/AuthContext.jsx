import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));

    const login = (userId, userType) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('userType', userType);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);