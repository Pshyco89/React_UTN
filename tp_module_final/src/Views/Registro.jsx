import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import "../Styles/Registro.css";
import { collection, setDoc, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { userId, userDescription, adminId, adminDescription, userEditorDescription, adminEditorDescription } from '../Constants/userTypes';
import { useNavigate } from 'react-router-dom';

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
    const { register, user } = useAuth(); // Obtener usuario logueado
    const navigate = useNavigate();

    // Nuevo: obtener el tipo de login desde la query string
    const params = new URLSearchParams(location.search);
    const tipo = params.get('tipo'); // 'admin', 'usuario' o 'userEditor'

    // Nuevo: Si es edición de usuario o admin, setear datos del usuario logueado
    useEffect(() => {
        if ((tipo === userEditorDescription || tipo === adminEditorDescription) && user) {
            setForm(prev => ({
                ...prev,
                nombre: user.name?.firstname || '',
                apellido: user.name?.lastname || '',
                username: user.username || '',
                email: user.email || '',
                telefono: user.phone || '',
                // password y confirmarPassword quedan vacíos
            }));
        }
    }, [tipo, user]);

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
            if ((tipo === userEditorDescription || tipo === adminEditorDescription) && user) {
                // Actualizar usuario o admin existente
                const docId = `user_${user.id}`;
                const userData = {
                    email: form.email,
                    phone: form.telefono,
                    password: form.password,
                };
                await updateDoc(doc(db, "users", docId), userData);
                setMensaje(tipo === adminEditorDescription ? 'Administrador actualizado correctamente.' : 'Usuario actualizado correctamente.');
                // No limpiar los campos de nombre, apellido, username porque están deshabilitados
                register({ ...user, ...userData }); // Actualiza el contexto de autenticación
            } else {
                // Registro nuevo usuario
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
                    typeuserid: tipo === adminDescription ? adminId : userId,
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
            }
        } catch (err) {
            console.error("Error al registrar/actualizar usuario:", err);
            setError('Error al registrar/actualizar usuario. Intenta nuevamente.');
        }
    };

    const handleVolver = () => {
        if (tipo === userEditorDescription) {
            navigate('/admin?tipo=' + userDescription);
        } else if (tipo === adminEditorDescription) {
            navigate('/admin?tipo=' + adminDescription);
        } else {
            navigate('/admin');
        }
    };

    return (
        <Layout>
            <div className="registro-container">
                <h2>
                    {tipo === userEditorDescription
                        ? 'Edición De Usuario'
                        : tipo === adminEditorDescription
                        ? 'Edición de Administrador'
                        : 'Registro De Usuario'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Nombre y Apellido */}
                    <div className="registro-row">
                        <div className="registro-form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="registro-input"
                                value={form.nombre}
                                onChange={handleChange}
                                disabled={tipo === userEditorDescription || tipo === adminEditorDescription}
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
                                disabled={tipo === userEditorDescription || tipo === adminEditorDescription}
                            />
                        </div>
                    </div>
                    {/* Email, Teléfono y Username */}
                    <div className="registro-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="registro-input"
                            value={form.username}
                            onChange={handleChange}
                            disabled={tipo === userEditorDescription || tipo === adminEditorDescription}
                        />
                    </div>
                    <div className="registro-row">
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
                    </div>
                    {/* Password y Confirmar Password */}
                    <div className="registro-row">
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
                        <div className="registro-form-group">
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
                    </div>
                    {error && <div className="registro-error">{error}</div>}
                    {mensaje && <div className="registro-success">{mensaje}</div>}
                    <button type="submit" className="registro-btn">
                        {(tipo === userEditorDescription || tipo === adminEditorDescription) ? 'Actualizar' : 'Registrarse'}
                    </button>
                </form>
                {tipo === userEditorDescription && (
                    <button
                        type="button"
                        className="registro-btn"
                        style={{ marginTop: '1rem' }}
                        onClick={handleVolver}
                    >
                        Volver al Panel de Usuario
                    </button>
                )}
                {tipo === adminEditorDescription && (
                    <button
                        type="button"
                        className="registro-btn"
                        style={{ marginTop: '1rem' }}
                        onClick={handleVolver}
                    >
                        Volver al Panel Administrador
                    </button>
                )}
            </div>
        </Layout>
    );
};

export default Registro;
