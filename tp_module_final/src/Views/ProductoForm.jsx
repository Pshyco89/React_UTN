import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/ProductoForm.css';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { adminDescription } from '../Constants/userTypes';
import { db } from '../Config/firebaseConfig';

const initialState = {
    id: '',
    title: '',
    category: '',
    description: '',
    price: '',
    image: '',
    rating: {
        count: '',
        rate: ''
    }
};

const ProductoForm = () => {
    const [form, setForm] = useState(initialState);
    const [categorias, setCategorias] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categoriasCol = collection(db, "categories");
                const categoriasSnapshot = await getDocs(categoriasCol);
                // Guardar id (numérico) y nombre de cada categoría
                const categoriasList = categoriasSnapshot.docs.map(doc => ({
                    id: doc.data().id, // numérico
                    name: doc.data().categoryName || doc.id
                }));
                setCategorias(categoriasList);
            } catch (error) {
                setCategorias([]);
            }
        };
        fetchCategorias();
    }, []);

    // Obtiene el siguiente id auto-incrementable de la colección "counters/products"
    const getNextId = async () => {
        const counterRef = doc(db, "counters", "products");
        await updateDoc(counterRef, { current: increment(1) });
        const counterSnap = await getDoc(counterRef);
        return counterSnap.data().current;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'count' || name === 'rate') {
            setForm({
                ...form,
                rating: {
                    ...form.rating,
                    [name]: value
                }
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMensaje('');
        setError('');

        try {
            // Validación básica
            if (!form.title || !form.category || !form.description || !form.price || !form.image || !form.count || !form.rate) {
                setError('Todos los campos son obligatorios.');
                return;
            }

            // Buscar la categoría seleccionada por id numérico
            const categoriaSeleccionada = categorias.find(cat => String(cat.id) === form.category);
            if (!categoriaSeleccionada) {
                setError('Debes seleccionar una categoría válida.');
                return;
            }

            const nextId = await getNextId();
            const docId = `product_${nextId}`;

            // Construir el objeto producto
            const producto = {
                id: nextId,
                title: form.title,
                price: parseFloat(form.price),
                description: form.description,
                category: categoriaSeleccionada.id, // ID numérico de la categoría
                image: form.image,
                rating: {
                    rate: parseFloat(form.rate),
                    count: parseInt(form.count, 10)
                }
            };

            await setDoc(doc(collection(db, "products"), docId), producto);

            setMensaje('Producto guardado correctamente.');
            setForm(initialState);
        } catch (err) {
            setError('Error al guardar el producto.');
        }
    };

    const handleBack = () => {
        navigate('/admin?tipo=' + adminDescription);
    };

    return (
        <Layout>
            <form className="producto-form" onSubmit={handleSubmit}>
                <button
                    className="back-btn"
                    onClick={handleBack}
                    title="Volver al Dashboard"
                    type="button"
                >
                    ⬅️ Volver
                </button>
                <h2>Agregar nuevo producto</h2>

                <div className="form-row-double">
                    <div className="form-row">
                        <label>Título</label>
                        <input name="title" value={form.title} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <label>Categoría</label>
                        <select
                            className="form-select"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <label>Descripción</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required />
                </div>

                <div className="form-row-double">
                    <div className="form-row">
                        <label>Precio</label>
                        <input name="price" type="number" value={form.price} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <label>Imagen (URL)</label>
                        <input name="image" value={form.image} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row-double">
                    <div className="form-row">
                        <label>Count</label>
                        <input name="count" type="number" value={form.count} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <label>Rate</label>
                        <input name="rate" type="number" step="0.01" value={form.rate} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-btn-group">
                    <button type="submit" className="form-btn">Guardar producto</button>
                    <button
                        type="button"
                        className="form-btn form-btn-clear"
                        onClick={() => setForm(initialState)}
                    >
                        Limpiar formulario
                    </button>
                </div>

                {mensaje && <div style={{ color: 'green', textAlign: 'center', marginTop: 8 }}>{mensaje}</div>}
                {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{error}</div>}
            </form>
        </Layout>
    );
};

export default ProductoForm;
