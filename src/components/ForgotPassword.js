import React, { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    // useRefs for storing the email and password 
    const emailRef = useRef()
    const { resetPassword } = useAuth();
    const [error, setError] = useState('')
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)

    // This function will be called when the form is submitted
    async function handleSubmit(e) {
        // Prevents the page from reloading
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions.");
            setLoading(false)  
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Failed to Reset Password...');
        }
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                { error && <Alert variant='danger' >{error}</Alert> }
                { message && <Alert variant='success' >{message}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        {loading ? loadingAnimation() : "Reset Password"}
                    </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to="/login">Login</Link>
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
