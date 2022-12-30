import React, { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    // useRefs for storing the email and password 
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    // useState stores the error message
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // This function will be called when the form is submitted
    async function handleSubmit(e) {
        // Prevents the page from reloading
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value); // to change to login
            setLoading(false)  
            navigate("/")
        } catch (error) {
            setLoading(false);
            setError('Failed to log in...');
        }
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                { error && <Alert variant='danger' >{error}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        {loading ? loadingAnimation() : "Login"}
                    </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
    </>
  )
}

function loadingAnimation() {
    return (
        <div className="spinner-border text-light" role="status">
            <span className="sr-only"></span>
        </div>
    )
}
