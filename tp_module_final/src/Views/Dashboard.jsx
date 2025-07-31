import React from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/Dashboard.css';
import { adminDescription } from '../Constants/userTypes';

// Simulación de obtención de rol de usuario
// Reemplaza esto con tu lógica real de autenticación/contexto
const getUserRole = () => {
    // Por ejemplo, podrías obtenerlo de localStorage, contexto, o props
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
                        ? 'Panel de Administración'
                        : 'Panel de Usuario'}
                </h1>
                <p>
                    {role === adminDescription
                        ? 'Bienvenido al panel de administración. Aquí puedes gestionar los productos y usuarios.'
                        : 'Bienvenido al panel de usuario. Aquí puedes ver y editar tu perfil, y gestionar tus compras.'}
                </p>
                <div className="dashboard-actions">
                    {role === adminDescription ? (
                        <>
                            <button className="dashboard-btn">Agregar producto</button>
                            <button className="dashboard-btn">Editar Producto</button>
                            <button className="dashboard-btn">Ver usuarios</button>
                            <button className="dashboard-btn">Métricas</button>
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

