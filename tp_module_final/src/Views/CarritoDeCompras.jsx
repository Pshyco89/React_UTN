import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/CarritoDeCompras.css';
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CarritoDeCompras = () => {
  const [cart, setCart] = useState(null);
  const [productsData, setProductsData] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate(); // Agregado para navegación

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
        orderBy("id", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setCart({ items: [], total: 0 });
        setProductsData({});
        return;
      }
      const cartDoc = querySnapshot.docs[0];
      const cartData = cartDoc.data();
      setCart(cartData);

      // Obtener los productos del carrito
      const items = cartData.items || [];
      const productsObj = {};
      await Promise.all(
        items.map(async (item) => {
          // Buscar producto por id
          const prodRef = doc(db, "products", String(item.productId));
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

  if (!cart) {
    return <Layout><div className="carrito-container">Cargando carrito...</div></Layout>;
  }

  // Acción de comprar (placeholder)
  const handleComprar = () => {
    if (cart.items.length === 0) return;
    alert('¡Compra realizada! (Funcionalidad a implementar)');
  };

  return (
    <Layout>
      <div className="carrito-container">
        <h2>Carrito de Compras</h2>
        {cart.items.length === 0 ? (
          <div className="carrito-vacio">El carrito está vacío.</div>
        ) : (
          <table className="carrito-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
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
