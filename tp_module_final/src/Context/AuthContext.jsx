import React, { createContext, useContext, useState } from "react";

// Crea el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Simulaci�n de login
    const login = (userData) => {
        setUser(userData);
    };

    // Simulaci�n de logout
    const logout = () => {
        setUser(null);
    };

    // Simulaci�n de registro (puedes expandir seg�n tu l�gica)
    const register = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto f�cilmente
export const useAuth = () => useContext(AuthContext);
