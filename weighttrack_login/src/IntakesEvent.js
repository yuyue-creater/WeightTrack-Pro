





//     const handleShowEvents = () => {
//         fetch(`http://127.0.0.1:5000/collectEvent/${email}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch events. Server returned ' + response.status);
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log('Raw data from API:', data);
//                 const allEvents = data.map(item => ({
//                     eventID: item[0],
//                     eventName: item[1],
//                     totalCalories: item[2],
//                     eventTime: item[3],
//                 }))
//                 console.log('allevents data:', allEvents);
//                 setEvents(allEvents);
//             })
//             .catch((error) => {
//                 setError('Failed to fetch events. Please try again.');
//                 console.error('Error:', error);
//             });
//     };

//     return (
//         <div>
//             <div style={boxStyle}>
//                 <h2>Welcome to Weighttrack Pro</h2>
//                 <p>Track your intakes over time with ease!</p>
//                 <p>Select an event, give it a name, and enter the time the event took place.</p>


//                 <label style={labelStyle}>Select the type of event:</label>
//                 <select
//                     style={inputStyle}
//                     value={eventType}
//                     onChange={(e) => setEventType(e.target.value)}
//                     required
//                 >
//                     <option key="default" value="">Select event type</option>
//                     <option value="breakfast">Breakfast</option>
//                     <option value="lunch">Lunch</option>
//                     <option value="supper">Supper</option>
//                     <option value="snack">Snack</option>
//                 </select>

//                 <label style={labelStyle}>Enter the name of the event:</label>
//                 <input
//                     style={inputStyle}
//                     type="text"
//                     value={eventName}
//                     onChange={(e) => setEventName(e.target.value)}
//                     placeholder="Enter event name"
//                     required
//                 />

//                 <label style={labelStyle}>Enter the time of the event:</label>
//                 <input
//                     style={inputStyle}
//                     type="time"
//                     value={eventTime}
//                     onChange={(e) => setEventTime(e.target.value)}
//                     placeholder="Enter event time"
//                     required
//                 />

//                 <button onClick={handleAddIntake}>Add Event</button>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <div>
//                 {/* <button onClick={handleShowEvents}>Show Events</button> */}
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 {events.map((event, index) => (
//                     <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
//                         <div style={{ marginRight: '10px' }}>Name: {event.eventName}</div>
//                         <div style={{ marginRight: '10px' }}>Calories: {event.totalCalories}</div>
//                         <div>Time: {event.eventTime}</div>
//                         <button>Delete</button>
//                         <td><Link to={`/intakesPage/${event.eventID}`}>View Details</Link></td>

//                     </div>
//                 ))}
//             </div>
//              <a href="/userpage">Back to UserPage</a>
//             </div>
//         </div>
//     );
// };

// export default IntakesEvent;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IntakesEvent = ({ email }) => {
    const [error, setError] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [events, setEvents] = useState([]);

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
            .then(() => {
                // After successfully adding the event, update the list of events
                handleShowEvents();
                // Reset the input fields
                setEventType('');
                setEventName('');
                setEventTime('');
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
                const allEvents = data.map(item => ({
                    eventID: item[0],
                    eventName: item[1],
                    totalCalories: item[2],
                    eventTime: item[3],
                }));
                setEvents(allEvents);
            })
            .catch((error) => {
                setError('Failed to fetch events. Please try again.');
                console.error('Error:', error);
            });
    };


    const boxStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        width: '400px', // Increased width for more space
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

    return (
        <div style = {containerStyle}>
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

                    <button style={buttonStyle} onClick={handleAddIntake}>Add Event</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <br></br>
                    <Link to="/userpage">Back to UserPage</Link>
                    <br></br>
                    <br></br>

                    <div>
                        {events.map((event, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <div><strong>Name:</strong> {event.eventName}</div>
                                <div><strong>Calories:</strong> {event.totalCalories}</div>
                                <div><strong>Time: </strong> {event.eventTime}</div>
                                <br></br>
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
