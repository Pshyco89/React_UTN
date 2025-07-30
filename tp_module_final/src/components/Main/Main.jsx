import React, { useEffect, useState } from 'react';
import './Main.css';
import ProductoCard from '../../Views/ProductoCard';

function Main() {
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
                    <ProductoCard
                        key={producto.id}
                        id={producto.id}
                        image={producto.image}
                        title={producto.title}
                        price={producto.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default Main;