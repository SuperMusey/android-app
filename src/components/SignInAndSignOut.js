import React from 'react'

import firebase from '../init'
import { auth,firestore } from '../init';

export function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      const userId = user.uid;

      // Check if the user document already exists in the 'users' collection
      const userDoc = await firestore.collection("users").doc(userId).get();

      // After signing in, create a user profile if it doesn't exist
      console.log("Is new user?: ", !userDoc.exists?"Yes":"No")
      if (!userDoc.exists) {
        const displayName = user.displayName;
        // Create a user profile in the Firestore 'users' collection
        await createUserProfile(userId, displayName);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const createUserProfile = async (userId, displayName) => {
    try {
      await firestore.collection("users").doc(userId).set({
        displayName,
      });
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}


export function SignOut({removeSelectUser}){
  const signOutOfApp = () => {
    removeSelectUser(null)
    auth.signOut()
  }
  return auth.currentUser && (
    <button onClick={signOutOfApp}>Sign Out</button>
  )
}