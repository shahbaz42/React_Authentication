import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    // This use state is for the current user, It will store the current user
    const [ currentUser, setCurrentUser ] = useState();
    
    // This is the signup function, it will create a new user with the email and password
    function signup(email, password){
        // This will return a promise, so we can use it in the signup component
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // onAuthStateChanged is a listener provided by firebase, 
    // it will listen for any changes in the authentication state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged( auth, (user) => {
            // using the useState setCurrent user function to set the current user.
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    // This is the value that'll be passed to the AuthContext.Provider
    const value = {
        currentUser,
        signup
    }

    // This will return the AuthContext.Provider with the value and the children
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}