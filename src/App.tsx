import './css/Reset.css';
import './css/Template.scss';
import './css/Navbar.scss';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar/>
        </Router>
    );
}

export default App;