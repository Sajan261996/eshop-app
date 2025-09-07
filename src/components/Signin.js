import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css"; // Optional styling

const Signin = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup"); // Navigate to the Signup page
  };

  return (
    <div className="signin-container">
      <header className="header">
        <h1>Sign In</h1>
      </header>
      <form className="signin-form">
        <input type="email" placeholder="Email Address *" required />
        <input type="password" placeholder="Password *" required />
        <button type="submit" className="btn-submit">Sign In</button>
      </form>
      <footer>
        <p>
          Don't have an account?{" "}
          <span className="signup-link" onClick={handleSignupRedirect}>
            Sign Up
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Signin;
