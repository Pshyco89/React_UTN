import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <nav className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/registro">Registro</Link>
            <Link to="/login">Login</Link>
            <Link to="/admin">Panel de administrador</Link>
        </nav>
    );
}

export default Header;
