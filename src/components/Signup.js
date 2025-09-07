import React from 'react';
import './Signup.css'; // Import your CSS file

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-header">
          <span className="lock-icon">🔒</span> {/* Or use an actual icon component */}
          <h2>Sign up</h2>
        </div>
        <input type="text" placeholder="First Name *" />
        <input type="text" placeholder="Last Name *" />
        <input type="email" placeholder="Email Address *" />
        <input type="password" placeholder="Password *" />
        <input type="password" placeholder="Confirm Password *" />
        <input type="tel" placeholder="Contact Number *" />
        <button className="signup-button">SIGN UP</button>
        <div className="login-link">
          Already have an account? <a href="#">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;