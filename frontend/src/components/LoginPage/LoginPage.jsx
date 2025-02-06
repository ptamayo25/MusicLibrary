import React, { useState } from "react";
import "./LoginPage.css";
import "../styles/buttons.css";
import LogoImage from "../../assets/uucnhlogo.png";
import Navigation from "../Navigation/Navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-page"> {/* Wrapper class */}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <img className="uucnhlogo" src={LogoImage} alt="Logo" />
          <h2>Welcome!</h2>
          <h2>Please Login</h2>


          {/* <div className="login-input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}
          <button type="submit">Login with Google</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
