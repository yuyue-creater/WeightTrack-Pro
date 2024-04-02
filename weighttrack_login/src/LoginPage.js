import React, { useState } from 'react';

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);

  const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    margin: 'auto',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const inputStyle = {
    marginBottom: '10px',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    textAlign: 'left',
  };


  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Welcome to Weighttrack Pro</h2>
        <p>Track your weights over time with ease!</p>
        <form>
          <div style={inputStyle}>
            <label style={labelStyle} htmlFor="email">Email:</label>
            <input style={inputStyle}  type="email" id="email" name="email" required placeholder="Email"/>
          </div>
          
          <div style={inputStyle}>
            <label style={labelStyle} htmlFor="password">Password:</label>
            <input type={showPassword ? "text" : "password"} id="password" name="password" required style={inputStyle} placeholder="Password"/>
            <br></br>
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show password
          </div>
          
          <button type="submit">Sign In</button>
        </form>
        <hr />
        <div>
          <a href="/reset-password">Forgot Password?</a>
        </div>
        <hr />
        <div>
          <p>New user?</p> 
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;