import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';


const IntakesEvent = ({ email }) => {
    const [error, setError] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [events, setEvents] = useState([]);
    const [eventDate, setEventDate] = useState('');


    const handleAddIntake = () => {
        if (!eventType) {
            setError('Please select an event type.');
            return;
        }
        if (!eventName) {
            setError('Please enter a name.');
            return;
        }
        if (!eventTime) {
            setError('Please select a time.');
            return;
        }
        if (!eventDate) {
            setError('Please select a date.');
            return;
        }
        fetch(`http://127.0.0.1:5000/addEvent/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventType: eventType,
                eventName: eventName,
                eventTime: eventTime,
                eventDate: eventDate,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add intake. Server returned ' + response.status);
                }
                return response.json();
            })
            .then(() => {
                // After successfully adding the event, update the list of events
                handleShowEvents();
                setEventType('');
                setEventName('');
                setEventTime('');
                setEventDate('');
            })
            .catch((error) => {
                setError('Failed to add event. Please try again.');
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        handleShowEvents();
    }, []);

    const handleShowEvents = () => {
        fetch(`http://127.0.0.1:5000/collectEvent/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch events. Server returned ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                const allEvents = data.map(item => {
                    const parsedDate = new Date(item[4]); // Parse the eventDate string to a Date object
                    const formattedDate = parsedDate.toISOString().split('T')[0]; // Format the Date object to YYYY-MM-DD
                    return {
                        eventID: item[0],
                        eventName: item[1],
                        totalCalories: item[2],
                        eventTime: item[3],
                        eventDate: formattedDate,
                        eventType: item[5],
                    };
                });


                setEvents(allEvents);
            })
            .catch((error) => {
                setError('Failed to fetch events. Please try again.');
                console.error('Error:', error);
            });
    };

    const handleDeleteEvent = (eventID) => {
        fetch(`http://127.0.0.1:5000/deleteEvent/${eventID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete event. Server returned ' + response.status);
                }
                console.log('Event deleted successfully.');
            })
            .catch((error) => {
                setError('Failed to delete event. Please try again.');
                console.error('Error:', error);
            });
    };

    const boxStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        width: '1000px', // Increased width for more space
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        margin: 'auto',
        marginTop: '20px', // Added margin-top for spacing from the top
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Changed height to minHeight to allow for vertical centering
        padding: '20px',
        backgroundColor: '#f0f0f0',
    };

    const headerStyle = {
        color: 'blue',
        fontFamily: 'Arial, sans-serif',
    };

    const paragraphStyle = {
        color: 'green',
        fontStyle: 'italic',
    };

    const buttonStyle = {
        backgroundColor: 'Cyan',
        color: 'black',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',

    };

    const linkStyle = {
        color: 'blue',
        textDecoration: 'none',
    };


    const inputStyle = {
        marginBottom: '15px', // Increased marginBottom for more spacing between inputs
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
        padding: '8px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '10px', // Increased marginBottom for more spacing between labels
        textAlign: 'left',
    };

    const tableStyle = {
        border: '1px solid black',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <div>
                    <h2 style={headerStyle}>Welcome to Weighttrack Pro</h2>
                    <p style={paragraphStyle}>Track your intakes over time with ease!</p>
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

                    <label style={inputStyle}>Enter the time of the event:</label>
                    <input
                        style={inputStyle}
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        placeholder="Enter event time"
                        required
                    />
                    <label style={labelStyle}>Enter the date of the event:</label>
                    <input
                        style={inputStyle}
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />


                    <button style={buttonStyle} onClick={handleAddIntake}>Add Event</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <br></br>
                    <Link to="/userpage">Back to UserPage</Link>
                    <br></br>
                    <br></br>

                    <table>
                        <tbody>
                            <tr style={tableStyle}>
                                <th style={tableStyle}>Food Type</th>
                                <th style={tableStyle}>Food Name</th>
                                <th style={tableStyle}>Calories</th>
                                <th style={tableStyle}>Date</th>
                                <th style={tableStyle}>Time</th>
                                <th style={tableStyle}>Remove</th>
                                <th style={tableStyle}>Details</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={index} style={tableStyle}>

                                    <td style={tableStyle}> {event.eventType}</td>
                                    <td style={tableStyle}>{event.eventName}</td>
                                    <td style={tableStyle}>{event.totalCalories}</td>
                                    <td style={tableStyle}>{event.eventDate}</td>
                                    <td style={tableStyle}> {event.eventTime}</td>
                                    <td style={tableStyle}><button onClick={() => handleDeleteEvent(event.eventID)}>Remove Event</button></td>
                                    <td style={tableStyle}><Link styke={linkStyle} to={`/intakesPage/${event.eventID}`}>View Details</Link></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                    <div>

                        {events.map((event, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <div><strong>Type:</strong> {event.eventType}</div>
                                <div><strong>Name:</strong> {event.eventName}</div>
                                <div><strong>Calories:</strong> {event.totalCalories}</div>
                                <div><strong>Date: </strong> {event.eventDate}</div>
                                <div><strong>Time: </strong> {event.eventTime}</div>

                                <div><button onClick={() => handleDeleteEvent(event.eventID)}>Remove Event</button></div>
                                <Link styke={linkStyle} to={`/intakesPage/${event.eventID}`}>View Details</Link>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                        ))}

                    </div>


                </div>
            </div>
        </div>
    );
};

export default IntakesEvent;
