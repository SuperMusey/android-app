import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { ProviderId } from 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyBOBwX92DDhBeRluTv55Ig0p2mKU_0rm28",
    authDomain: "sw-miniproject-seniordesign.firebaseapp.com",
    projectId: "sw-miniproject-seniordesign",
    storageBucket: "sw-miniproject-seniordesign.appspot.com",
    messagingSenderId: "349589042766",
    appId: "1:349589042766:web:1874a2ce7f86ab5d5fb51f",
    measurementId: "G-27JBQDTQQ9"
  })

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase