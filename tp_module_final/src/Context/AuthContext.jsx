import React, { createContext, useContext, useState } from "react";

// Crea el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Simulación de login
    const login = (userData) => {
        setUser(userData);
    };

    // Simulación de logout
    const logout = () => {
        setUser(null);
    };

    // Simulación de registro (puedes expandir según tu lógica)
    const register = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
