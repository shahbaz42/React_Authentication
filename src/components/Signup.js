import React, { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    // useRefs for storing the email and password 
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const { signup } = useAuth()
    // useState stores the error message
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // This function will be called when the form is submitted
    async function handleSubmit(e) {
        // Prevents the page from reloading
        e.preventDefault()
        // If the passwords don't match, it will set the error message
        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Passwords do not match')
        }

        // If the passwords match, it will call the signup function from useAuth
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Failed to create an account.')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmationRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            {loading ? loadingAnimation() : "Sign Up"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
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
