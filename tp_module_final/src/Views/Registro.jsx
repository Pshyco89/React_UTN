import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import "../Styles/Registro.css";
import { collection, setDoc, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import { useAuth } from '../context/AuthContext';

const Registro = () => {
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        username: '',
        password: '',
        confirmarPassword: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Obtiene el siguiente id auto-incrementable de la colección "counters/users"
    const getNextId = async () => {
        const counterRef = doc(db, "counters", "users");
        await updateDoc(counterRef, { current: increment(1) });
        const counterSnap = await getDoc(counterRef);
        return counterSnap.data().current;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');

        if (
            !form.nombre ||
            !form.apellido ||
            !form.email ||
            !form.telefono ||
            !form.username ||
            !form.password ||
            !form.confirmarPassword
        ) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        if (form.password !== form.confirmarPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const nextId = await getNextId();
            const docId = `user_${nextId}`;
            const userData = {
                id: nextId,
                email: form.email,
                username: form.username,
                password: form.password,
                name: {
                    firstname: form.nombre,
                    lastname: form.apellido
                },
                phone: form.telefono,
                typeuserid: 1,
            };
            await setDoc(doc(db, "users", docId), userData);
            setMensaje(`Usuario registrado correctamente. ID: ${docId}`);
            setForm({
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                username: '',
                password: '',
                confirmarPassword: ''
            });
            register(userData); // Actualiza el contexto de autenticación
        } catch (err) {
            console.error("Error al registrar usuario:", err);
            setError('Error al registrar usuario. Intenta nuevamente.');
        }
    };

    return (
        <Layout>
            <div className="registro-container">
                <h2>Registro De Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="registro-form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="registro-input"
                            value={form.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registro-form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            className="registro-input"
                            value={form.apellido}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registro-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="registro-input"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registro-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="registro-input"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registro-form-group">
                        <label htmlFor="telefono">Tel&eacute;fono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className="registro-input"
                            value={form.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registro-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="registro-input"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="registro-form-group registro-form-group-last">
                        <label htmlFor="confirmarPassword">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmarPassword"
                            name="confirmarPassword"
                            className="registro-input"
                            value={form.confirmarPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <div className="registro-error">{error}</div>}
                    {mensaje && <div className="registro-success">{mensaje}</div>}
                    <button type="submit" className="registro-btn">
                        Registrarse
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Registro;
