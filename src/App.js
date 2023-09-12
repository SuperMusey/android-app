import React, { useState, useEffect } from "react";
import "./App.css";
import { SignIn, SignOut } from "./components/SignInAndSignOut";
import { ChatRoom } from "./components/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./init";

function App() {
  const [user] = useAuthState(auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the list of users from the Firestore 'users' collection
  useEffect(() => {
    const unsubscribe = firestore.collection("users").onSnapshot((snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      setLoading(false); // Set loading to false once data is loaded
      console.log("usersData:", usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleUserSelect = (selectedUserId) => {
    // Check if the selected user exists in the list of users
    const userExists = users.some((user) => user.id === selectedUserId);

    if (userExists) {
      setSelectedUser(selectedUserId);
    } else {
      console.error("Selected user does not exist in the 'users' table.");
    }
  };

  const signOutLoggedUser = () => {
    setSelectedUser(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <SignOut removeSelectUser={signOutLoggedUser} />
        <button onClick={() => setSelectedUser(null)}>Change Chat</button>
      </header>
      <section>
        {user ? (
          selectedUser ? (
            <ChatRoom
              selectUser={selectedUser}
              user={user}
            />
          ) : (
            // Only render UserSelection when users data is loaded
            loading ? (
              <p>Loading...</p>
            ) : (
              <UserSelection
                users={users}
                onSelectUser={handleUserSelect}
                loggedInUserId={user ? user.uid : null}
              />
            )
          )
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

function UserSelection({ users, onSelectUser, loggedInUserId }) {
  // Filter out the logged-in user from the list of selectable users
  console.log("loggedInUserId:", loggedInUserId);
  const selectableUsers = users.filter((user) => user.id !== loggedInUserId);

  return (
    <div>
      <h2>Select a user to chat with:</h2>
      <ul>
        {selectableUsers.map((user) => (
          <li key={user.id}>
            <button onClick={() => onSelectUser(user.id)}>{user.displayName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
