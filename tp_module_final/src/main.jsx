import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesComponent } from './Router/RoutesComponent/RoutesComponent';
import { AuthProvider } from "./context/AuthContext";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RoutesComponent />
        </AuthProvider>
    </React.StrictMode>
);