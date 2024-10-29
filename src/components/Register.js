import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from "../utils/auth";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password
            });
            setSuccess(response.data.message);

            // Optionally, reset form fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            try {
                const response = await axios.post('http://localhost:5000/api/users/login', {
                    email,
                    password
                });

                setSuccess(response.data.message);
                login(response.data.token); // Store token and dispatch auth change event

                navigate('/');
            } catch (error) {
                console.error(error.response?.data); // Log the specific error message
                setError(error.response?.data?.error || 'Login failed, please try again.');
            }
        } catch (error) {
            console.error(error.response?.data); // Log the specific error message
            setError('Registration failed. Please try again: ' + error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </FloatingLabel>
                {error && <div className="text-danger">{error}</div>}
                {success && <div className="text-success">{success}</div>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
}

export default Register;
