import React from 'react'
import './App.css';

import { SignIn, SignOut } from './components/SignInAndSignOut';
import { ChatRoom } from './components/ChatRoom';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './init';

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

export default App;
