import React, { useState, useEffect, useContext} from 'react'
import { auth } from '../base'
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const githubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
            //Here we could optionally add aditional logic to set a users role or save info to a local db 
        }))
    }

    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }

    const value = { currentUser, login, logout }

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {/* below we are waiting for the AuthContext infor to populate befor loading
            the child components in the UI */}
            {!loading && children}
        </AuthContext.Provider>
      )
}
