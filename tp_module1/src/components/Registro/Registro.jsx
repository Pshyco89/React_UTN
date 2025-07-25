import React from 'react';
//import "./Registro.css"; // Assuming you have a CSS file for styles"

function Registro() {
    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Registro</h2>
            <form>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
                </div>
                <div>
                    <label htmlFor="telefono">Telefono</label>
                    <input type="tel" id="telefono" name="telefono" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
                </div>
                <div>
                    <label htmlFor="confirmarPassword">Confirmar Password</label>
                    <input type="password" id="confirmarPassword" name="confirmarPassword" style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Registrarse
                </button>
            </form>
        </div>
    );
}

export default Registro;