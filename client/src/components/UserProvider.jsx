// UserContext.js
import React, {  useState, useEffect } from 'react';
import UserContext from './UserContext';

// const UserProvider = createContext();

const UserProvider = ({ children }) => {
  // const [userDetails, setUserDetails] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    const storedUserEmail = localStorage.getItem("email");
    if (storedUserName) setUserName(storedUserName);
    if (storedUserEmail) setUserEmail(storedUserEmail);
  }, []);

  useEffect(()=>{
    localStorage.setItem("username", userName)
    localStorage.setItem("email", userEmail)
  },[userName,userEmail])

  return (
    <UserContext.Provider value={{ userName, setUserName, userEmail,setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
