import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserPage = ({ email }) => {
    const [userData, setUserData] = useState(null);
    const [updatedWeight, setUpdatedWeight] = useState('');
    const [updatedAge, setUpdatedAge] = useState('');
    const [updatedHeight, setUpdatedHeight] = useState('');

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/user/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setUpdatedWeight(data.weight);
                setUpdatedAge(data.age);
                setUpdatedHeight(data.height);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [email]);



    const handleUpdate = () => {
        fetch(`http://127.0.0.1:5000/user/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                weight: updatedWeight,
                age: updatedAge,
                height: updatedHeight,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the userData state with the updated values
                setUserData({ ...userData, weight: updatedWeight, age: updatedAge, height: updatedHeight });
                alert('User data updated successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to update user data');
            });
    };


    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>

            <h2>Welcome, {userData.email}!</h2>
            <p>Weight: {userData.weight} kg</p>
            <input
                type="text"
                value={updatedWeight}
                onChange={(e) => setUpdatedWeight(e.target.value)}
                placeholder="Enter new weight"
            />
            <p>Age: {userData.age} years</p>
            <input
                type="text"
                value={updatedAge}
                onChange={(e) => setUpdatedAge(e.target.value)}
                placeholder="Enter new age"
            />
            <p>Height: {userData.height} cm</p>
            <input
                type="text"
                value={updatedHeight}
                onChange={(e) => setUpdatedHeight(e.target.value)}
                placeholder="Enter new height"
            />
            <br></br><br></br>
            <button onClick={handleUpdate}>Update</button>
            <br></br>
            <button onClick={() => alert('Logging out...')}>Logout</button>
            <br></br><br></br>
            <div>
                <button>Dashboard</button>
                <br></br><br></br>
                <Link to="/intakes">
                    <button>Go to Intakes</button>
                </Link>
                <br></br><br></br>
                <button>Exercises</button>
                <br></br><br></br>
                <button>BMT</button>
                <br></br><br></br>
                <button>Liquid</button>
                <br></br><br></br>
                <button>Progress</button>
                <br></br><br></br>
                <Link to="/intakesEvent">
                    <button>Intake Events</button>
                </Link>


            </div>
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
};

export default UserPage;
