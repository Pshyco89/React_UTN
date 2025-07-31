import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/ProductoDetalle.css';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, addDoc, increment } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import { useAuth } from '../context/AuthContext';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const getNextId = async () => {
        const counterRef = doc(db, "counters", "carts");
        await updateDoc(counterRef, { current: increment(1) });
        const counterSnap = await getDoc(counterRef);
        return counterSnap.data().current;
    };

    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setProducto(null);
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
                setProducto(null);
            }
            setLoading(false);
        };
        fetchProducto();
    }, [id]);

    const handleCantidadChange = (e) => {
        const value = Math.max(1, Math.min(Number(e.target.value), producto?.rating?.count || 1));
        setCantidad(value);
    };

    const handleAgregarAlCarrito = async () => {
        if (!user) {
            setMensaje('Debes iniciar sesión para agregar al carrito.');
            setTimeout(() => {
                navigate(`/login?returnTo=/producto/${id}`);
            }, 1500);
            return;
        }
        if (cantidad < 1 || cantidad > (producto?.rating?.count || 1)) {
            setMensaje(`La cantidad debe ser entre 1 y ${producto?.rating?.count || 1}`);
            return;
        }

        try {
            let cartDocId = null;
            let cartDocRef = null;
            let cartDocSnap = null;

            let foundCart = null;
            let foundCartId = null;
            const cartsSnapshot = await getDocs(collection(db, "carts"));
            cartsSnapshot.forEach(docSnap => {
                const data = docSnap.data();
                if (data.userId === user.id) {
                    foundCart = data;
                    foundCartId = docSnap.id;
                }
            });

            let newItems;
            let total;
            if (foundCart) {
                cartDocId = foundCartId;
                cartDocRef = doc(db, "carts", cartDocId);
                cartDocSnap = await getDoc(cartDocRef);

                const cartData = cartDocSnap.data();
                const existingItem = cartData.items.find(item => item.productId === Number(producto.id));
                if (existingItem) {
                    newItems = cartData.items.map(item =>
                        item.productId === Number(producto.id)
                            ? { ...item, quantity: Math.min(item.quantity + cantidad, producto.rating.count), unitPrice: Number(producto.price) }
                            : item
                    );
                } else {
                    newItems = [
                        ...cartData.items,
                        { productId: Number(producto.id), quantity: cantidad, unitPrice: Number(producto.price) }
                    ];
                }
                total = newItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
                await updateDoc(cartDocRef, {
                    items: newItems,
                    total
                });
            } else {
                const nextId = await getNextId();
                cartDocId = `cart_${nextId}`;
                cartDocRef = doc(db, "carts", cartDocId);

                newItems = [
                    { productId: Number(producto.id), quantity: cantidad, unitPrice: Number(producto.price) }
                ];
                total = newItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
                await setDoc(cartDocRef, {
                    id: nextId,
                    userId: user.id,
                    items: newItems,
                    total,
                    lastSaleId: null
                });
            }
            setMensaje('Producto agregado al carrito.');
        } catch (error) {
            setMensaje('Error al agregar al carrito.');
            console.error(error);
        }
    }

    if (loading) {
        return <div className="detalle-container">Cargando...</div>;
    }

    if (!producto) {
        return <div className="detalle-container">Producto no encontrado.</div>;
    }

    return (
        <Layout>
            <div className="detalle-container">
                <div className="detalle-card">
                    <img
                        src={producto.image || "https://via.placeholder.com/300x300?text=Sin+Imagen"}
                        alt={producto.title || "Producto"}
                        className="detalle-img"
                    />
                    <div className="detalle-info">
                        <h2 className="detalle-title">{producto.title}</h2>
                        <p className="detalle-descripcion">{producto.description}</p>
                        <p className="detalle-precio">Precio: ${producto.price}</p>
                        {producto.rating.count !== undefined && (
                            <>
                                <p className="detalle-cantidad">Cantidad disponible: {producto.rating.count}</p>
                                <div className="detalle-cantidad-input">
                                    <label htmlFor="cantidad">Cantidad a agregar:</label>
                                    <input
                                        type="number"
                                        id="cantidad"
                                        min="1"
                                        max={producto.rating.count}
                                        value={cantidad}
                                        onChange={handleCantidadChange}
                                        style={{ width: 60, marginLeft: 8 }}
                                    />
                                </div>
                            </>
                        )}
                        {mensaje && <div className="detalle-mensaje">{mensaje}</div>}
                        {/* Botones de acción alineados */}
                        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                            <button
                                className="detalle-comprar-btn"
                                onClick={handleAgregarAlCarrito}
                                type="button"
                            >
                                Agregar al carrito
                            </button>
                            <button
                                className="detalle-comprar-btn"
                                onClick={() => navigate('/')}
                                type="button"
                            >
                                Volver a productos
                            </button>
                            <button
                                className="detalle-comprar-btn"
                                onClick={() => navigate('/carrito')}
                                type="button"
                            >
                                Ir a Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductoDetalle;
