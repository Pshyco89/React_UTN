import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../Views/Home';
import Login from '../../Views/Login';
import Registro from '../../Views/Registro';
import ProductoDetalle from '../../Views/ProductoDetalle';
import Dashboard from '../../Views/Dashboard';
//import EditProduct from '../../Views/Pro';
import NotFound from '../../Views/NotFound';
import CarritoDeCompras from '../../Views/CarritoDeCompras';
import ProductTable from '../../Views/ProductoTabla';
import './RoutesComponent.css';
import ProductoForm from '../../Views/ProductoForm';
import MetricsUsuario from '../../Views/MetricsUsuario';

const RoutesComponent = () => {
    return (
        <div className="routes-container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/user-metrics" element={<MetricsUsuario />} />
                    <Route path="/productTable" element={<ProductTable />} />
                    <Route path="/add-product" element={<ProductoForm />} />

                    <Route path="/producto/:id" element={<ProductoDetalle />} />
                    <Route path="/carrito" element={<CarritoDeCompras />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export { RoutesComponent }

