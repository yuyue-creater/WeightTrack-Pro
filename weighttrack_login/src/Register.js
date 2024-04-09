import React, { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(10);
    const [loggingIn, setLoggingIn] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');



    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'transparent',
        
    };
    
    const boxStyle = {
        border: '1px solid #3498db', // Blue border color
        borderRadius: '5px',
        padding: '20px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ecf0f1', // Light blue background color
        margin: 'auto',
    };
    
    
    const inputStyle = {
        marginBottom: '10px',
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
        padding: '8px',
        border: '1px solid #3498db', // Blue border color
    };
    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        textAlign: 'left',
        color: '#3498db', // Blue color
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

        if (!weight || isNaN(parseInt(weight)) || parseInt(weight) < 0) {
            setError('Please enter a valid weight (a positive integer).');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match. Please re-enter your password.');
            return;
        }

        // If validation passes, proceed with sign in
        console.log('Signing in with email:', email);
        setLoggingIn(true);
        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, height, weight, age }),
        })
            .then((r) => r.json())
            .then((r) => {
                console.log('Response from server:', r);
                console.log(r.message)
                // setError(r.message)
                if ('Authentication failed' === r.message) {
                    setError('Registration failed: The User already exists. Please try a different email.')

                } else {
                    window.alert('You are now registered, please go back to the login page to log in.');
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
        }, 5000000000000000000);
    };

    return (
        <div style={{ backgroundColor: '#f1f9ff', height: '100%' }}>
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2>Welcome to Weighttrack Pro</h2>
                <p>Please fill out your email and password, then enter your current height, weight, and name to register.</p>
                <p>Your password needs at least 10 characters, and must include at least one of each of the following: 1 uppercase, 1 lowercase, and 1 number</p>
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

                    <label style={labelStyle} htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={inputStyle}
                        placeholder="Confirm Password"
                    />

                    <div style={inputStyle}>
                        <label style={labelStyle} htmlFor="Weight">Weight (In kg):</label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required

                            placeholder="Weight"
                        />
                    </div>
                    <div style={inputStyle}>
                        <label style={labelStyle} htmlFor="age">Age (In years):</label>
                        <select
                            id="age"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(parseInt(e.target.value))}
                            required
                            style={inputStyle}
                        >
                            {Array.from({ length: 91 }, (_, i) => i + 10).map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div style={inputStyle}>
                        <label style={labelStyle} htmlFor="height">Height (In CM):</label>
                        <select
                            id="height"
                            name="height"
                            value={height}
                            onChange={(e) => setHeight(parseInt(e.target.value))}
                            required
                            style={inputStyle}
                        >
                            {Array.from({ length: 201 }, (_, i) => i).map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div>
                    <p></p>
                    <a href="/">Back to Login</a>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;
