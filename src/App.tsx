import './css/Reset.css';
import './css/Template.scss';
import './css/Navbar.scss';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Insert from "./components/Insert";
import React from "react";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Insert/>}/>
            </Routes>
        </Router>
    );
}

export default App;