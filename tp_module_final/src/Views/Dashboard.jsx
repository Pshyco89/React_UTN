import React from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/Dashboard.css';

const Dashboard = () => {
    return (
        <Layout>
            <div className="dashboard-container">
            <h1>Panel de Administraci�n</h1>
            <p>Bienvenido al panel de administraci�n. Aqu� puedes gestionar los productos y usuarios.</p>
            <div className="dashboard-actions">
                <button className="dashboard-btn">Agregar producto</button>
                <button className="dashboard-btn">Ver usuarios</button>
            </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

