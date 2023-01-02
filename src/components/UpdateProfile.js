import React, { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    // useRefs for storing the email and password 
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const { currentUser, updateUserEmail, updateUserPassword } = useAuth()
    const [message, setMessage] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                setMessage("Success")
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    {message && <Alert variant='success' >{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave Blank to keep the same." />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmationRef} placeholder="Leave Blank to keep the same." />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            {loading ? loadingAnimation() : "Update"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
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
