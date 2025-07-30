import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../Config/firebaseConfig';
import './Main.css';
import ProductoCard from '../../Views/ProductoCard';

const Main = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            const productosCol = collection(db, "products");
            const productosSnapshot = await getDocs(productosCol);
            const productosList = productosSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(productosList);
        };
        fetchProductos();
    }, []);

    return (
        <main>
            <section className="banner">
                <h1>Bienvenidos a Ronald Ecommerce</h1>
                <h2>Los mejores precios de la ciudad</h2>
            </section>
            <section className="productList">
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
            </section>
        </main>
    );
}

export default Main;