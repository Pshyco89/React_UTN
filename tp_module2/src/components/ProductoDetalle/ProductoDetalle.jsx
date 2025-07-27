import React, { useEffect, useState } from 'react';
import './ProductoDetalle.css';
import { useParams } from 'react-router-dom';

function ProductoDetalle() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProducto(data));
    }, [id]);

    if (!producto) {
        return <div className="detalle-container">Cargando...</div>;
    }

    return (
        <div className="detalle-container">
            <div className="detalle-card">
                <img src={producto.image} alt={producto.title} className="detalle-img" />
                <div className="detalle-info">
                    <h2 className="detalle-title">{producto.title}</h2>
                    <p className="detalle-descripcion">{producto.description}</p>
                    <p className="detalle-precio">Precio: ${producto.price}</p>
                    <button className="detalle-comprar-btn">Comprar</button>
                </div>
            </div>
        </div>
    );
}

export default ProductoDetalle;
