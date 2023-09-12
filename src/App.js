import React, { useState } from 'react'
import './App.css';

import { SignIn, SignOut } from './components/SignInAndSignOut';
import { ChatRoom } from './components/ChatRoom';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './init';

function App() {
  const [user] = useAuthState(auth)
  const [selectUser, setSelectUser] = useState(null)

  const handleUserSelect = (selectUser) => {
    console.log(selectUser)
    setSelectUser(selectUser)
  }

  console.log('selectUser:', selectUser); // Log selectUser here

  return (
    <div className="App">
      <header className="App-header">
        <SignOut removeSelectUser={handleUserSelect}/>
      </header>
      <section>
      {user ? (
          // If a user is authenticated, display the ChatRoom with the selected user
          selectUser ? (
            <ChatRoom selectUser={selectUser} />
          ) : (
            // If no user is selected, provide a way to select a user
            <UserSelection onSelectUser={handleUserSelect} />
          )
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

// UserSelection component to select a user
function UserSelection({ onSelectUser }) {
  const users = [
    // Replace with your user data or fetch it from a database
    { id: 'user1', name: 'User 1' },
    { id: 'user2', name: 'User 2' },
    { id: 'user3', name: 'User 3' },
  ];

  return (
    <div>
      <h2>Select a user to chat with:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => onSelectUser(user)}>{user.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
