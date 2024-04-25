import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

const HomePage = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser);

    if (loggedInUser) {
      setUserDetails(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <div className="HomePage">
      <NavBar />
      {userDetails && (
        <div>
          <h1 style={{ color: "black" }}>Welcome, {userDetails.name}</h1>
          <h2 style={{ color: "black" }}>Email :{userDetails.email}</h2>
        </div>
      )}
    </div>
  );
};

export default HomePage;
