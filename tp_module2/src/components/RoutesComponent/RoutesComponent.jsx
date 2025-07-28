import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registro from '../Registro/Registro';
import Login from '../Login/Login';
import Home from '../Home/Home';
import ProductoDetalle from '../ProductoDetalle/ProductoDetalle';
import './RoutesComponent.css'; // Importa el CSS

function RoutesComponent() {
    return (
        <div className="routes-container">
            <Routes>
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
            </Routes>
        </div>
    );
}

export default RoutesComponent;
