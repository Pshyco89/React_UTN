import React from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/Dashboard.css';
import { adminDescription } from '../Constants/userTypes';

// Simulaci�n de obtenci�n de rol de usuario
// Reemplaza esto con tu l�gica real de autenticaci�n/contexto
const getUserRole = () => {
    // Por ejemplo, podr�as obtenerlo de localStorage, contexto, o props
    // return localStorage.getItem('role');
    return 'Administrador'; // Cambia a 'Usuario' para probar el otro panel
};

const Dashboard = () => {
    const role = getUserRole();

    return (
        <Layout>
            <div className="dashboard-container">
                <h1>
                    {role === adminDescription
                        ? 'Panel de Administraci�n'
                        : 'Panel de Usuario'}
                </h1>
                <p>
                    {role === adminDescription
                        ? 'Bienvenido al panel de administraci�n. Aqu� puedes gestionar los productos y usuarios.'
                        : 'Bienvenido al panel de usuario. Aqu� puedes ver y editar tu perfil, y gestionar tus compras.'}
                </p>
                <div className="dashboard-actions">
                    {role === adminDescription ? (
                        <>
                            <button className="dashboard-btn">Agregar producto</button>
                            <button className="dashboard-btn">Editar Producto</button>
                            <button className="dashboard-btn">Ver usuarios</button>
                            <button className="dashboard-btn">M�tricas</button>
                            <button className="dashboard-btn">Editar Perfil</button>
                            <button className="dashboard-btn">Cambio de Clave</button>
                        </>
                    ) : (
                        <>
                            <button className="dashboard-btn">Ver mis compras</button>
                            <button className="dashboard-btn">Editar Perfil</button>
                            <button className="dashboard-btn">Cambio de Clave</button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

