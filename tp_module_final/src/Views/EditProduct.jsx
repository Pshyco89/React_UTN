import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/EditProduct.css';

const EditProduct = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para guardar los cambios
        alert('Producto actualizado correctamente');
    };

    return (
        <Layout>
            <div className="editproduct-container">
            <h1>Editar producto</h1>
            <form className="editproduct-form" onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Precio:
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                </label>
                <label>
                    Descripción:
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="editproduct-btn">
                    Guardar cambios
                </button>
            </form>
            </div>
        </Layout>
    );
};

export default EditProduct;
