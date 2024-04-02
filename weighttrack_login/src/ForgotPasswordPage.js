import React from 'react';

const ForgotPasswordPage = () => {
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
        <h2>Forgot Password</h2>
        <p>Please enter your email to reset your password.</p>
        <form>
          <div style={inputStyle}>
            <label style={labelStyle} htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required style={inputStyle} />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div>
          <button onClick={() => window.location.href = '/login'}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
