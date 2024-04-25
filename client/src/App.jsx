import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./Pages/Main/LandingPage";
import HomePage from "./Pages/Main/HomePage";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/Login";
import MarsRover from "./FetchedData/MarsRover";
import APOD from "./FetchedData/APOD";
import ISROLaunches from "./FetchedData/ISROLaunches";
import Articles from "./FetchedData/Articles";
import Blogs from "./FetchedData/Blogs";
import ChangePassword from "./Pages/Auth/ResetPassword";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SolarSystem from "./Pages/OtherPages/SolarSystem";
import UserPosts from "./Pages/Posts/UserPosts";
import CreatePost from "./Pages/Posts/CreatePost";
import axios from "axios";
import LoginFirstPage from "./Pages/Auth/LoginFirst";
import ResetPassword from "./Pages/Auth/ResetPassword";
import UserProfile from "./Pages/OtherPages/UserProfile";

function App() {
 const navigate = useNavigate();
 const [authenticated, setAuthenticated] = useState(false);
 const [loading, setLoading] = useState(true);

 // Function to update authenticated state from LoginForm
 const updateAuthenticated = (isAuthenticated) => {
    setAuthenticated(isAuthenticated);
 };

 useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:5000/api/user/loggeduser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200 && res.data.status === "success") {
            setAuthenticated(true);
            navigate("/main"); // Redirect to main if authenticated
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
      setLoading(false);
    };

    checkAuth();
 }, [navigate]);

 if (loading) {
    return <div>Loading...</div>;
 }

 return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login updateAuthenticated={updateAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset/:id/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* {authenticated ? (
          <>
            <Route path="/main" element={<HomePage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/marsrover" element={<MarsRover />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/isro-launches" element={<ISROLaunches />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/solar-system" element={<SolarSystem />} />
            <Route path="/my-posts" element={<UserPosts />} />
            <Route path="/register" element={<CreatePost />} />
            
          </>
        ) : (
          <>
            <Route path="/" element={<LoginFirstPage />} />
            <Route path="*" element={<LoginFirstPage />} /> 
          </>
        )} */}
         <Route path="/main" element={<HomePage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/marsrover" element={<MarsRover />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/isro-launches" element={<ISROLaunches />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/solar-system" element={<SolarSystem />} />
            <Route path="/my-posts" element={<UserPosts />} />
            <Route path="/register" element={<CreatePost />} />
            
      </Routes>
    </>
 );
}

export default App;




