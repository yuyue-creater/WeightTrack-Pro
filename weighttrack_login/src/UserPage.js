import React from 'react';

const UserPage = ({ email }) => {
    return (
        <div style={styles.container}>
            <h2>Welcome, {email}!</h2>
            <p>This is your user page.</p>
            <button style={styles.button} onClick={() => alert('Logging out...')}>Logout</button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        margin: '20px auto',
        maxWidth: '400px',
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default UserPage;
