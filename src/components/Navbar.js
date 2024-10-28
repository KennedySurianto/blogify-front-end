// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Blogify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;