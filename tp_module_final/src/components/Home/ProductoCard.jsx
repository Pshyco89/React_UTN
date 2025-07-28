import React from 'react';
import { Link } from 'react-router-dom';
import './ProductoCard.css';

function ProductoCard({ id, image, title, price }) {
    return (
        <div className="producto-card">
            <img src={image} alt={title} className="producto-img" />
            <h3 className="producto-title">{title}</h3>
            <p className="producto-precio">${price}</p>
            <Link to={`/producto/${id}`} className="producto-detalle-btn">
                Ver detalle
            </Link>
        </div>
    );
}

export default ProductoCard;
