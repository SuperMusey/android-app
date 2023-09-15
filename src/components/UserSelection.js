import React from "react";

export function UserSelection({ users, onSelectUser, loggedInUserId }) {
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