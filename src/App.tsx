import './css/Reset.css';
import './css/Template.scss';
import './css/Navbar.scss';
import './css/Insert.scss';
import './css/View.scss';
import './css/Resources.scss';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Insert from "./components/Insert";
import View from "./components/View";
import Resources from "./components/Resources";
import React from "react";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Insert/>}/>
                <Route path="/view" element={<View/>}/>
                <Route path="/resources" element={<Resources/>}/>
            </Routes>
        </Router>
    );
}

export default App;