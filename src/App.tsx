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
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {Helmet} from "react-helmet";

const client = new QueryClient();
const BEE: string = "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-bee-agriculture-flatart-icons-lineal-color-flatarticons.png";

function App() {
    return (
        <QueryClientProvider client={client}>
            <Helmet>
                <link rel={"icon"} type={"image/png"} href={BEE}/>
            </Helmet>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Insert/>}/>
                    <Route path="/view" element={<View/>}/>
                    <Route path="/resources" element={<Resources/>}/>
                </Routes>
            </Router>
        <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}

export default App;