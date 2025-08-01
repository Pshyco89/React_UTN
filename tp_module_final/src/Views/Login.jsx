import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/Login.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { userId, adminId, adminDescription, userDescription } from '../Constants/userTypes';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Nuevo: obtener el tipo de login desde la query string
    const params = new URLSearchParams(location.search);
    const tipo = params.get('tipo'); // 'admin' o 'usuario'

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!form.username || !form.password) {
            setError('Por favor, completa todos los campos.');
            setLoading(false);
            return;
        }

        try {
            // Buscar usuario por username, password y tipo de usuario
            const usersRef = collection(db, "users");
            let userTypeToFind = null;
            if (tipo === adminDescription) userTypeToFind = adminId;
            if (tipo === userDescription) userTypeToFind = userId;

            let q;
            if (userTypeToFind) {
                q = query(
                    usersRef,
                    where("username", "==", form.username),
                    where("password", "==", form.password),
                    where("typeuserid", "==", userTypeToFind)
                );
            } else {
                // fallback: solo username y password
                q = query(
                    usersRef,
                    where("username", "==", form.username),
                    where("password", "==", form.password)
                );
            }

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError('Usuario no encontrado o tipo incorrecto.');
                setLoading(false);
                return;
            }

            let userData = null;
            querySnapshot.forEach((doc) => {
                userData = doc.data();
            });

            if (userData) {
                login(userData);
                setError('');
                // Obtiene el parámetro returnTo de la query string
                const returnTo = params.get('returnTo');
                if (returnTo) {
                    navigate(returnTo);
                } else if (tipo === adminDescription) {
                    navigate('/admin?tipo=' + adminDescription); // Redirige a Dashboard.jsx
                } else if (tipo === userDescription) {
                    navigate('/'); // Redirige a Home.jsx
                } else {
                    navigate('/');
                }
            } else {
                setError('Contraseña incorrecta.');
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError('Error al iniciar sesión. Intenta nuevamente.');
        }
        setLoading(false);
    };

    return (
        <Layout>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="email">username</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            className="login-input"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="login-input"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Login;

