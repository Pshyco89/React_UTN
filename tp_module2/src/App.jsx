import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registro from './components/Registro/Registro';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ProductoDetalle from './components/ProductoDetalle/ProductoDetalle';
import './App.css';

function App() {
    return (
        <Router>
            <nav className="nav-bar">
                <Link to="/">Home</Link>
                <Link to="/registro">Registro</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Routes>
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
            </Routes>
        </Router>
    );
}

export default App;
