import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from '../Config/firebaseConfig';
import Layout from '../components/Layout/Layout';

const MetricsUsuario = () => {
    const { user } = useAuth();
    const [compras, setCompras] = useState(0);
    const [comprasList, setComprasList] = useState([]); // <-- Lista de compras
    const [carritosEfectivos, setCarritosEfectivos] = useState(0);
    const [carritosOlvidados, setCarritosOlvidados] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchMetrics = async () => {
            setLoading(true);
            // Compras realizadas (sales)
            const salesQ = query(collection(db, "sales"), where("userId", "==", user.id));
            const salesSnap = await getDocs(salesQ);
            setCompras(salesSnap.size);
            setComprasList(salesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Guardar compras

            // Carritos efectivos (lastSaleId != 0)
            const cartsEfectivosQ = query(
                collection(db, "carts"),
                where("userId", "==", user.id),
                where("lastSaleId", "!=", 0),
            );
            const cartsEfectivosSnap = await getDocs(cartsEfectivosQ);
            setCarritosEfectivos(cartsEfectivosSnap.size);

            // Carritos olvidados (lastSaleId == 0)
            const cartsOlvidadosQ = query(
                collection(db, "carts"),
                where("userId", "==", user.id),
                where("lastSaleId", "==", 0)
            );
            const cartsOlvidadosSnap = await getDocs(cartsOlvidadosQ);
            setCarritosOlvidados(cartsOlvidadosSnap.size);

            setLoading(false);
        };
        fetchMetrics();
    }, [user]);

    if (!user) return <div>Debes iniciar sesi&oacute;n para ver tus m&eacute;tricas.</div>;
    if (loading) return <div>Cargando m&eacute;tricas...</div>;

    // Helper para mostrar fecha legible si existe
    const formatDate = (date) => {
        if (!date) return '';
        if (date instanceof Timestamp) {
            return date.toDate().toLocaleString();
        }
        if (typeof date === "string" || typeof date === "number") {
            return new Date(date).toLocaleString();
        }
        return '';
    };

    return (
        <Layout>
            <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
                <h2>Métricas de Usuario</h2>
                <div style={{ margin: '1rem 0' }}>
                    <strong>Compras realizadas:</strong> {compras}
                </div>
                <div style={{ margin: '1rem 0' }}>
                    <strong>Carritos efectivos:</strong> {carritosEfectivos}
                </div>
                <div style={{ margin: '1rem 0' }}>
                    <strong>Carritos olvidados:</strong> {carritosOlvidados}
                </div>
                <hr style={{ margin: '2rem 0' }} />
                <h3>Detalle de Compras Realizadas</h3>
                {comprasList.length === 0 ? (
                    <div>No hay compras registradas.</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: 4 }}>ID</th>
                                <th style={{ border: '1px solid #ccc', padding: 4 }}>Fecha</th>
                                <th style={{ border: '1px solid #ccc', padding: 4 }}>Total</th>
                                {/* Agrega más columnas si lo deseas */}
                            </tr>
                        </thead>
                        <tbody>
                            {comprasList.map(compra => (
                                <tr key={compra.id}>
                                    <td style={{ border: '1px solid #ccc', padding: 4 }}>{compra.id}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 4 }}>{formatDate(compra.date)}</td>
                                    <td style={{ border: '1px solid #ccc', padding: 4 }}>
                                        {compra.total ? `$${compra.total}` : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
};

export default MetricsUsuario;
