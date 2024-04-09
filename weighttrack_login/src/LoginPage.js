import React, { useState } from 'react';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

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

    const handleSignIn = (e) => {
        e.preventDefault();

        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Basic password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
        if (!password || !passwordRegex.test(password)) {
            setError('Passwords must be at least 10 characters long and contain at least one digit, one lowercase letter, and one uppercase letter. Please update your password.');
            return;
        }

        // If validation passes, proceed with sign in
        console.log('Signing in with email:', email);
        setLoggingIn(true);
        fetch('http://127.0.0.1:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((r) => r.json())
            .then((r) => {
                console.log('Response from server:', r);

                if ('Authentication Successfully' === r.message) {
                    window.alert('Signing In, Welcome to Weight Track Pro');
                    localStorage.setItem('user', JSON.stringify({ email, token: r.token }));
                    window.location.href = '/userpage';
                   
                } else {
                    setError('Authentication failed: Your email or password is incorrect, or you currently do not have an account. Please try again.');
                    // window.alert('Authentication failed: Your email or password is incorrect, or you currently do not have an account. Please try again.');
                }
            });

        setTimeout(() => {
            // If validation passes, proceed with sign in
            console.log('Signing in with email:', email, 'and password:', password);

            // Reset the form and error state
            setEmail('');
            setPassword('');
            setError('');
            setLoggingIn(false);
        }, 5000); // Simulate a 2-second delay
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2>Welcome to Weighttrack Pro</h2>
                <p>Track your weights over time with ease!</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSignIn} method="POST">
                    <div style={inputStyle}>
                        <label style={labelStyle} htmlFor="email">Email:</label>
                        <input
                            style={inputStyle}
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                        />
                    </div>
                    <div style={inputStyle}>
                        <label style={labelStyle} htmlFor="password">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                            placeholder="Password"
                        />
                        <br></br>
                        <input
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                        /> Show password
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
