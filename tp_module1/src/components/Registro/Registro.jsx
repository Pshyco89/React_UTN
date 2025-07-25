import React from 'react';
import "./Registro.css";

function Registro() {
    return (
        <div className="registro-container">
            <h2>Registro De Usuario</h2>
            <form>
                <div className="registro-form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" className="registro-input" />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" className="registro-input" />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="registro-input" />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="telefono">Telefono</label>
                    <input type="tel" id="telefono" name="telefono" className="registro-input" />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="registro-input" />
                </div>
                <div className="registro-form-group registro-form-group-last">
                    <label htmlFor="confirmarPassword">Confirmar Password</label>
                    <input type="password" id="confirmarPassword" name="confirmarPassword" className="registro-input" />
                </div>
                <button type="submit" className="registro-btn">
                    Registrarse
                </button>
            </form>
        </div>
    );
}

export default Registro;
