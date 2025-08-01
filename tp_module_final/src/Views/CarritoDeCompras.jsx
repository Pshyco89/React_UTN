import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/CarritoDeCompras.css';
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { setDoc, increment } from "firebase/firestore";

const CarritoDeCompras = () => {
    const [cart, setCart] = useState(null);
    const [productsData, setProductsData] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartAndProducts = async () => {
            if (!user) {
                setCart(null);
                return;
            }

            // Buscar el último carrito del usuario logueado (mayor id)
            const cartsRef = collection(db, "carts");
            const q = query(
                cartsRef,
                where("userId", "==", user.id),
                where("lastSaleId", "==", 0),
                orderBy("id", "desc"),
                limit(1)
            );

            const querySnapshot = await getDocs(q);
            console.log("Carritos encontrados:", querySnapshot.size);
            if (querySnapshot.empty) {
                setCart({ items: [], total: 0 });
                setProductsData({});
                return;
            }

            // Si hay un carrito, obtenemos sus datos
            const cartDoc = querySnapshot.docs[0];
            const cartData = cartDoc.data();
            setCart({ ...cartData, _docId: cartDoc.id }); // Guardar docId para update

            // Obtener los productos del carrito
            const items = cartData.items || [];
            const productsObj = {};
            await Promise.all(
                items.map(async (item) => {
                    // Buscar producto por id correcto
                    const prodRef = doc(db, "products", `product_${item.productId}`);
                    const prodSnap = await getDoc(prodRef);
                    if (prodSnap.exists()) {
                        productsObj[item.productId] = prodSnap.data();
                    }
                })
            );
            setProductsData(productsObj);
        };

        fetchCartAndProducts();
    }, [user]);

    // Obtiene el siguiente id auto-incrementable de la colección "counters/sales"
    const getNextId = async () => {
        const counterRef = doc(db, "counters", "sales");
        await updateDoc(counterRef, { current: increment(1) });
        const counterSnap = await getDoc(counterRef);
        return counterSnap.data().current;
    };

    // Eliminar producto del carrito
    const handleEliminarProducto = async (productId) => {
        if (!user || !cart) return;
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
        if (!confirmar) return;
        try {
            const cartsRef = collection(db, "carts");
            const q = query(
                cartsRef,
                where("userId", "==", user.id),
                orderBy("id", "desc"),
                limit(1)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return;
            const cartDoc = querySnapshot.docs[0];
            const cartDocRef = cartDoc.ref;

            // Filtra el item a eliminar
            const newItems = cart.items.filter(item => item.productId !== productId);
            // Recalcula el total
            const newTotal = newItems.reduce((acc, item) => {
                const producto = productsData[item.productId];
                return acc + ((producto?.price || 0) * item.quantity);
            }, 0);

            // Actualiza en Firestore
            await updateDoc(cartDocRef, {
                items: newItems,
                total: newTotal
            });

            // Actualiza el estado local
            setCart({ ...cart, items: newItems, total: newTotal });
        } catch (err) {
            console.error("Error al eliminar producto del carrito:", err);
            alert('Error al eliminar el producto del carrito');
        }
    };

    if (!cart) {
        return <Layout><div className="carrito-container">Cargando carrito...</div></Layout>;
    }

    // Acción de comprar (placeholder)
    const handleComprar = async () => {
        if (cart.items.length === 0) return;
        const confirmar = window.confirm('¿Deseas confirmar la compra?');
        if (!confirmar) return;

        try {
            const nextId = await getNextId();
            const docId = `sale_${nextId}`;

            // Construir los items para la venta
            const saleItems = cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.unitPrice || productsData[item.productId]?.price || 0
            }));

            // Construir el objeto venta
            const venta = {
                id: nextId,
                userId: cart.userId,
                cartId: cart.id,
                items: saleItems,
                total: cart.total,
                date: new Date().toISOString()
            };

            // Registrar la venta
            await setDoc(doc(collection(db, "sales"), docId), venta);

            // Actualizar el campo lastSaleId del carrito
            const cartsRef = collection(db, "carts");
            const q = query(
                cartsRef,
                where("userId", "==", user.id),
                where("lastSaleId", "==", 0),
                orderBy("id", "desc"),
                limit(1)
            );

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const cartDoc = querySnapshot.docs[0];
                const cartDocRef = cartDoc.ref;
                await updateDoc(cartDocRef, { lastSaleId: nextId });
            }

            alert('¡Compra registrada con éxito!');
            navigate('/'); // Redirige a home

        } catch (err) {
            console.error("Error al registrar la venta:", err);
            alert('Error al registrar la venta');
        }
    };

    return (
        <Layout>
            <div className="carrito-container">
                <h2>Carrito de Compras</h2>
                {cart.items.length === 0 ? (
                    <div className="carrito-vacio">El carrito est&aacute; vac&iacute;o.</div>
                ) : (
                    <div className="carrito-table-wrapper">
                        <table className="carrito-tabla">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Imagen</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map(item => {
                                    const producto = productsData[item.productId];
                                    return (
                                        <tr key={item.productId}>
                                            <td>{producto?.title || 'Producto'}</td>
                                            <td>
                                                <img
                                                    src={producto?.image}
                                                    alt={producto?.title}
                                                    className="carrito-img"
                                                />
                                            </td>
                                            <td>${producto?.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>${(producto?.price && item.quantity ? (producto.price * item.quantity).toFixed(2) : '0.00')}</td>
                                            <td>
                                                <button
                                                    className="carrito-eliminar-btn"
                                                    title="Eliminar producto"
                                                    onClick={() => handleEliminarProducto(item.productId)}
                                                    type="button"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="carrito-total">
                    Total: <span>${cart.total ? cart.total.toFixed(2) : '0.00'}</span>
                </div>
                {/* Botones de acción */}
                <div className="carrito-btns">
                    <button
                        className="carrito-btn"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Ir a productos
                    </button>
                    <button
                        className="carrito-btn"
                        type="button"
                        onClick={handleComprar}
                        disabled={cart.items.length === 0}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default CarritoDeCompras;

