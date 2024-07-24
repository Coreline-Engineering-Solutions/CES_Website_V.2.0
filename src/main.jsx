import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Narrative from './sections/Narrative.jsx';
import Login from './sections/Login.jsx';
import DashBoard from './DashBoard/DashBoard.jsx';
import Verification from './sections/Verification.jsx';
import Register from './sections/Register.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/Narrative" element={<Narrative />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/DashBoard" element={<DashBoard />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/Verification" element={<Verification />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    </React.StrictMode>
);