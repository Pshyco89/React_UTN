import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../Views/Home';
import Login from '../../Views/Login';
import Registro from '../../Views/Registro';
import ProductoDetalle from '../../Views/ProductoDetalle';
import Dashboard from '../../Views/Dashboard';
//import { EditProduct } from '../../Views/EditProduct';
import NotFound from '../../Views/NotFound';
import './RoutesComponent.css';

const RoutesComponent = () => {
    return (
        <div className="routes-container">
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                {/*<Route path="/editar-producto/:id" element={<EditProduct />} />*/}
                <Route path="*" element={<NotFound />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export { RoutesComponent }

