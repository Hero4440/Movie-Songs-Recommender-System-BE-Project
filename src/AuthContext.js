import React, { useContext, useEffect, useState } from 'react'
import { auth} from './firebase'
import PropTypes from 'prop-types'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}
export function AuthProvider({children}){
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password){
    auth.createUserWithEmailAndPassword(email,password)
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(){
    return auth.signOut()
  }

  function resetPassword(email){
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email){
      return currentUser.updateEmail(email)

  }

  function updatePassword(password){
      return currentUser.updatePassword(password)
  }


  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    setCurrentUser(user)
    setLoading(false)
  })

    return unsubscribe
},[])


  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
    
  }


  return(
    
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>

  )

}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
