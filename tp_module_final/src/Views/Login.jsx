import React from 'react';
import Layout from '../components/Layout/Layout';
import '../Styles/Login.css';

const Login = () => {
    return (
        <Layout>
            <div className="login-container">
            <h2>Login</h2>
            <form>
                <div className="login-form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="login-input" />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="login-input" />
                </div>
                <button type="submit" className="login-btn">
                    Iniciar sesi&oacute;n
                </button>
            </form>
            </div>
        </Layout>
    );
}

export default Login;

