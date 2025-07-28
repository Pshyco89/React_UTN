import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Mi Ecommerce. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;
