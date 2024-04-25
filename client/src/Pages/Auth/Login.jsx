import React, { useContext } from "react";
import "../../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import UserContext from "../../components/UserContext";

function LoginForm({ updateAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const { userDetails, setUserDetails } = useContext(UserContext);
  const { userName, setUserName, userEmail, setUserEmail } =
    useContext(UserContext);

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      const { user } = res.data;
      console.log(user);
      setUserEmail(user.email);
      setUserName(user.name);
      console.log(userName, userEmail);

      if (res.status === 200 && res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // Update global authenticated state
        updateAuthenticated(true);
        navigate("/main");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert("Invalid email or password");
      } else if (error.request) {
        console.log(error.request);
        alert("Unable to connect to the server");
      } else {
        console.log("Error", error.message);
        alert("An error occurred");
      }
    }
  };

  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  return (
    <div className="loginPage">
      <div className="wrapper">
        <form onSubmit={handlelogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <Link to={"/forgotPassword"}>
              <a href="">Forgot Password</a>
            </Link>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        </form>
        <button className="login-with-google-btn" onClick={loginwithgoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
