import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context } from './view/useContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
);