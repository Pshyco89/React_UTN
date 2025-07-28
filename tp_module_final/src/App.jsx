import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RoutesComponent from './components/RoutesComponent/RoutesComponent';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <RoutesComponent />
            <Footer />
        </Router>
    );
}

export default App;
