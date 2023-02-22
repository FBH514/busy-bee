import './css/Reset.css';
import './css/Template.scss';
import './css/Navbar.scss';
import './css/Insert.scss';
import './css/View.scss';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Insert from "./components/Insert";
import React from "react";
import View from "./components/View";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Insert/>}/>
                <Route path="/view" element={<View/>}/>
            </Routes>
        </Router>
    );
}

export default App;