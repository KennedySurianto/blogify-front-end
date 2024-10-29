import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Blogs from './components/Blogs';
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
    return (
        <Router>
            <div className="App">
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Blogs />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
