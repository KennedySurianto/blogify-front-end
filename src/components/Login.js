import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { login } from "../utils/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });

            const { message, token, userId } = response.data;
            if (message && token && userId) {
                login(token, userId); // Store token and dispatch auth change event
                setSuccess(message);
            }

            // Reset form fields
            setEmail('');
            setPassword('');

            navigate('/');
        } catch (error) {
            console.error(error.response?.data); // Log the specific error message
            setError(error.response?.data?.error || 'Login failed, please try again.');
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>

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
                {error && <div className="text-danger">{error}</div>}
                {success && <div className="text-success">{success}</div>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
}

export default Login;
