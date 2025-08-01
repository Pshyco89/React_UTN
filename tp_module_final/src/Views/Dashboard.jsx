import React from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/Dashboard.css';
import { adminDescription, adminEditorDescription, userEditorDescription } from '../Constants/userTypes';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();

    // Nuevo: obtener el tipo de login desde la query string
    const params = new URLSearchParams(location.search);
    const tipo = params.get('tipo'); // 'admin' o 'usuario'

    const handleEditProduct = () => {
        //navigate('/edit-product');
        navigate('/productTable'); // Redirige a la tabla de productos
    };

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    // Nuevo: función para editar usuario
    const handleEditUser = () => {
        navigate(`/registro?tipo=${userEditorDescription}`);
    };

    const handleAdminUser = () => {
        navigate(`/registro?tipo=${adminEditorDescription}`);
    };

    const handleMetricsUser = () => {
        navigate('/user-metrics');
    }

    return (
        <Layout>
            <div className="dashboard-container">
                <h1>
                    {tipo === adminDescription
                        ? 'Panel de Administración'
                        : 'Panel de Usuario'}
                </h1>
                <p>
                    {tipo === adminDescription
                        ? 'Bienvenido al panel de administración. Aquí puedes gestionar los productos y usuarios.'
                        : 'Bienvenido al panel de usuario. Aquí puedes ver y editar tu perfil, y gestionar tus compras.'}
                </p>
                <div className="dashboard-actions">
                    {tipo === adminDescription ? (
                        <>
                            <button className="dashboard-btn" onClick={handleAddProduct}>Agregar producto</button>
                            <button className="dashboard-btn" onClick={handleEditProduct}>Editar Producto</button>
                            <button className="dashboard-btn" onClick={handleAdminUser}>Editar Perfil Administrador</button>
                        </>
                    ) : (
                        <>
                            <button className="dashboard-btn" onClick={handleMetricsUser}>Metricas</button>
                            <button className="dashboard-btn" onClick={handleEditUser}>Editar Perfil Usuario</button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

