import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

firebase.initializeApp({
  apiKey: "AIzaSyBOMaGne1sFZ0zRdIeeR6lVBOKmWU2zFg4",
  authDomain: "sw-miniproject-5ae95.firebaseapp.com",
  projectId: "sw-miniproject-5ae95",
  storageBucket: "sw-miniproject-5ae95.appspot.com",
  messagingSenderId: "588694099143",
  appId: "1:588694099143:web:56af2da3927e2c13945ae2",
  measurementId: "G-4K4NLYK33Y"
  })

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase