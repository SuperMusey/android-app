import React, {useState,useRef,useEffect} from "react";

import {useCollectionData} from 'react-firebase-hooks/firestore'
import { auth,firestore } from "../init";
import firebase from "../init";


export function ChatRoom({ selectUser, user }) {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef
      .where('room', 'in', [`${user.uid}-${selectUser}`, `${selectUser}-${user.uid}`])
      .orderBy('createdAt')
      .limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const room = `${user.uid}-${selectUser}`;
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      room,
    });
    setFormValue('');
    // Scroll to the bottom immediately after sending the message
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }, [messages]);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => {
            return <ChatMessage key={msg.id} message={msg} />;
          })}
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

  
  function ChatMessage(props){
    const {text,uid,photoURL}=props.message;
    const messageClass = uid === auth.currentUser.uid?'sent':'received';
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="User"/>
        <p>{text}</p>
      </div>
    )
  }