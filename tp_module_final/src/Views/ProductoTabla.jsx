import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import '../Styles/ProductoTabla.css';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { adminDescription } from '../Constants/userTypes';

const ProductTable = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // <-- Hook para navegación

    useEffect(() => {
        const fetchProductos = async () => {
            const productosCol = collection(db, "products");
            const productosSnapshot = await getDocs(productosCol);
            const productosList = productosSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(productosList);
            setLoading(false);
        };
        fetchProductos();
    }, []);

    // Handler para volver al dashboard
    const handleBack = () => {
        navigate('/admin?tipo=' + adminDescription);
    };

    return (
        <Layout>
            <div className="product-table-container">
                <button
                    className="back-btn"
                    onClick={handleBack}
                    title="Volver al Dashboard"
                >
                    ⬅️ Volver
                </button>
                <h1>Lista de productos</h1>
                <div className="product-table-wrapper">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>T&iacute;tulo</th>
                                <th>Categor&iacute;a</th>
                                <th>Descripci&oacute;n</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7">Cargando productos...</td>
                                </tr>
                            ) : (
                                productos.map(producto => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.title}</td>
                                        <td>{producto.category}</td>
                                        <td>{producto.description}</td>
                                        <td>{producto.price}</td>
                                        <td>{producto.rating.count}</td>
                                        <td>
                                            {producto.image
                                                ? <img src={producto.image} alt={producto.title} className="product-img" />
                                                : 'Sin imagen'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ProductTable;
