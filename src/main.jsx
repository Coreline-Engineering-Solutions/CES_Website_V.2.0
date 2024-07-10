import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapTutorial from './sections/MapTutorial.jsx';
import Login from './sections/Login.jsx';
import DashBoard from './DashBoard/DashBoard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/Narrative" element={<MapTutorial />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/DashBoard" element={<DashBoard />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    </React.StrictMode>
);