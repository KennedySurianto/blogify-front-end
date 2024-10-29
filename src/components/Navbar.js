import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';

const NavigationBar = () => {
    const [isAuth, setIsAuth] = useState(isAuthenticated());
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsAuth(false); // Update state to reflect logout
        navigate('/');
    };

    useEffect(() => {
        const updateAuthStatus = () => setIsAuth(isAuthenticated());
        
        window.addEventListener("authChange", updateAuthStatus);

        return () => window.removeEventListener("authChange", updateAuthStatus);
    }, []);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Blogify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {!isAuth ? (
                        <>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
