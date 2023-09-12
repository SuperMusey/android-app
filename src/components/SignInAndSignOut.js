import React from 'react'

import firebase from '../init'
import { auth } from '../init';

export function SignIn(){
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return(
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

export function SignOut(){
  const signOutOfApp = () => {
    auth.signOut()
  }
  return auth.currentUser && (
    <button onClick={signOutOfApp}>Sign Out</button>
  )
}