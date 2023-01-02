import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    // This use state is for the current user, It will store the current user
    const [ currentUser, setCurrentUser ] = useState();
    const [loading, setLoading] = useState(true);

    // This is the signup function, it will create a new user with the email and password
    function signup(email, password){
        // This will return a promise, so we can use it in the signup component
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // This is the login function, it will login the user with the email and password
    function login(email, password){
        // This will return a promise, so we can use it in the login component
        return signInWithEmailAndPassword(auth, email, password);
    }

    // This is the logout function, it will logout the user
    function logout(){
        return signOut(auth);
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    function updateUserEmail(email){
        return updateEmail(currentUser, email);
    }

    function updateUserPassword(password){
        return updatePassword(currentUser, password);
    }

    // onAuthStateChanged is a listener provided by firebase, 
    // it will listen for any changes in the authentication state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged( auth, (user) => {
            // using the useState setCurrent user function to set the current user.
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    // This is the value that'll be passed to the AuthContext.Provider
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    }

    // This will return the AuthContext.Provider with the value and the children
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}