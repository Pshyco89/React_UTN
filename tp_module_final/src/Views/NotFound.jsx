import React from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/NotFound.css';

const NotFound = () => {
    return (
        <Layout>
            <div className="notfound-container">
                <h1>404</h1>
                <p>Página no encontrada</p>
            </div>
        </Layout>
    );
};

export default NotFound;
