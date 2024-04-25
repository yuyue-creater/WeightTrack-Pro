import React, { useState, useEffect } from 'react';

const IntakesEvent = ({ email }) => {

    const [error, setError] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventTime, setEventTime] = useState('');




    const handleAddIntake = () => {
        console.log(eventType)
        console.log(eventName)
        console.log(eventTime)

        fetch(`http://127.0.0.1:5000/addEvent/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventType: eventType,
                eventName: eventName,
                eventTime: eventTime,
            
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add intake. Server returned ' + response.status);
            }
            return response.json();
        })
            


        // Implement logic to add intake
    };

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
                <p>Track your intakes over time with ease!</p>
                <p>Select an event, give it a name, and enter the time the event took place.</p>


                <label style={labelStyle}>Select the type of event:</label>
                <select
                    style={inputStyle}
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    required
                >
                    <option key="default" value="">Select event type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="supper">Supper</option>
                    <option value="snack">Snack</option>
                </select>

                <label style={labelStyle}>Enter the name of the event:</label>
                <input
                    style={inputStyle}
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter event name"
                    required
                />

                <label style={labelStyle}>Enter the time of the event:</label>
                <input
                    style={inputStyle}
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="Enter event time"
                    required
                />

                <button onClick={handleAddIntake}>Add Event</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default IntakesEvent;
