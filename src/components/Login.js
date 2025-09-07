import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="top-bar">
          <div className="auth-links">
            {/* You can add navigation links here if needed */}
          </div>
        </div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <span className="lock-icon">🔒</span>
          <h2>Sign in</h2>
        </div>

        <input
          type="email"
          placeholder="Email Address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          SIGN IN
        </button>

        <div className="signup-link">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>

      <div className="footer">
        &copy; upGrad 2021
      </div>
    </div>
  );
};

export default Login;
