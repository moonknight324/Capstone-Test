// UserProfile.js
import React, { useContext } from 'react';
import UserContext from '../../components/UserContext';

function UserProfile() {
  const { userName,userEmail } = useContext(UserContext);
// console.log(userDetails)
  return (
    <div>
      <h2>User Profile</h2>
      {userName && userEmail && (
        <div>
          <p>Name: {userName}</p>
          <p>Email: {userEmail}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
