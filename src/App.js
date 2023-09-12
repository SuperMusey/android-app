import React, { useRef, useState } from 'react'
import './App.css';

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

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <header className="App-header">
        <SignOut/>
      </header>
      <section>
        {user?<ChatRoom/>:<SignIn/>}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  const signOutOfApp = () => {
    auth.signOut()
  }
  return auth.currentUser && (
    <button onClick={signOutOfApp}>Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef()
  const messagesRef  = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query,{idField:'id'})
  const [formValue,setFormValue] = useState('')
  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;
    await messagesRef.add({
      text:formValue,
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('')
    dummy.current.scrollIntoView({behavior:'smooth'})
  }
  return(
    <>
    <main>
      {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg}/>)}
       <div ref={dummy}></div>
    </main>
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
      <button type='submit'>Send</button>
    </form>
    </>
  )
}

function ChatMessage(props){
  const {text,uid,photoURL}=props.message;
  const messageClass = uid == auth.currentUser.uid?'sent':'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
