import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=50')
            .then(res => res.json())
            .then(data => setProductos(data));
    }, []);

    return (
        <div className="home-container">
            <h2>Productos</h2>
            <div className="productos-list">
                {productos.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <img src={producto.image} alt={producto.title} className="producto-img" />
                        <h3 className="producto-title">{producto.title}</h3>
                        <p className="producto-precio">${producto.price}</p>
                        <Link to={`/producto/${producto.id}`} className="producto-detalle-btn">
                            Ver detalle
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
