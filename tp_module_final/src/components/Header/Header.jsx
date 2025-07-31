import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"
import './Header.css';
import { FaShoppingCart } from 'react-icons/fa';
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from '../../Config/firebaseConfig';
import { userDescription, adminDescription } from '../../Constants/userTypes';

const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate();

    // Estado local para la cantidad de items en el carrito
    const [cartCount, setCartCount] = useState(0);

    // Nuevo estado para el tipo de usuario
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchCartCount = async () => {
            if (!user) {
                setCartCount(0);
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
                setCartCount(0);
                return;
            }
            const cartDoc = querySnapshot.docs[0];
            const cartData = cartDoc.data();
            // Sumar la cantidad total de items
            const count = (cartData.items || []).reduce((acc, item) => acc + (item.quantity || 0), 0);
            setCartCount(count);
        };
        fetchCartCount();
    }, [user]);

    // Nuevo useEffect para obtener el tipo de usuario
    useEffect(() => {
        const fetchUserType = async () => {
            if (!user) {
                setUserType('');
                return;
            }
            try {
                const typeUsersRef = collection(db, "typeUsers");
                const q = query(typeUsersRef, where("id", "==", user.typeuserid));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const typeUserDoc = querySnapshot.docs[0];
                    const typeUserData = typeUserDoc.data();
                    setUserType(typeUserData.userType || '');
                } else {
                    setUserType('');
                }
            } catch (err) {
                console.error("Error fetching user type:", err);
                setUserType('');
            }
        };
        fetchUserType();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleLogin = () => {
        navigate('/login?tipo=' + userDescription);
    }

    const handleRegistro = () => {
        navigate('/registro?tipo=' + userDescription);
    }

    const handleAdminPanel = () => {
        navigate('/login?tipo=' + adminDescription);
    }

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                {/* Mostrar Home solo si no es Administrador */}
                {userType !== adminDescription && (
                    <Link to="/">Home</Link>
                )}
            </div>
            <div className="nav-right">
                {user ? (
                    <>
                        <span>
                            Bienvenido, {user.username}
                            {userType && ` (${userType})`}
                        </span>
                        {/* Carrito de compras solo para Usuario */}
                        {userType === userDescription && (
                            <div className="header-cart-icon" onClick={() => navigate('/carrito')} title="Ir al carrito">
                                <FaShoppingCart size={22} />
                                <span className="header-cart-badge">{cartCount}</span>
                            </div>
                        )}
                        {userType === userDescription && (
                            <button onClick={() => navigate('/admin')}>Panel de Usuario</button>
                        )}
                        <button onClick={handleLogout}>Cerrar sesi&oacute;n</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleRegistro}>Registro</button>
                        <button onClick={handleAdminPanel}>Panel de administrador</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Header;
