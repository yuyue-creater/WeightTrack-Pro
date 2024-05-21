import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

import breadandbakedgoods from './Images/breads and baked goods.jpeg';
import condimentsandspices from './Images/condiments and spices.jpeg';
import diary from './Images/dairy.jpeg';
import fruit from './Images/fruit.jpeg';
import grain from './Images/grain.jpeg';
import meat from './Images/meat.jpeg';
import snacks from './Images/snacks.jpeg';
import sugarsandsweets from './Images/sugars and sweets.jpeg';
import vegetable from './Images/vegetable.jpeg';


const IntakesPage = ({ email }) => {
    const { eventID } = useParams();
    const [intakes, setIntakes] = useState([]);
    
    const [foodNames, setFoodNames] = useState([]);
    const [foodType, setFoodType] = useState('');
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showAddFoodForm, setShowAddFoodForm] = useState(false);
    const [error, setError] = useState('');
    const [unit, setUnit] = useState('');

    const [eventName, setEventName] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventCalories, setEventCalories] = useState(0);


    // Fetch food names and units from the serer
    useEffect(() => {
        fetch('http://127.0.0.1:5000/food')
            .then(response => response.json())
            .then(data => setFoodNames(data));
    }, []);


    const fetchIntakes = () => {
        fetch(`http://127.0.0.1:5000/consumes/${email}/${eventID}`)
            .then(response => response.json())
            .then(data => {
                const mappedData = data.map(item => ({
                    foodName: item.foodName,
                    food_object: item.food_object,
                    amount: item.amount,
                    unit: item.unit,
                    // eventID: item.intakeEventID
                }));
                setIntakes(mappedData);
                fetch(`http://127.0.0.1:5000/eventNameTime/${eventID}`)
                    .then(response => response.json())
                    .then(eventData => {
                        if (eventData.length > 0) {
                            console.log(eventData[0]);
                            const { intakeEventName, eventTime, eventType } = eventData[0];
                            setEventName(intakeEventName);
                            setEventTime(eventTime);
                            setEventType(eventData[0]['intakeEventType']);
                            console.log(intakeEventName);
                            console.log(eventTime);
                            console.log(eventType)
                            console.log(eventData[0]['intakeEventType'])
                            console.log('Image');
                        }
                    })
                    .catch(error => console.error('Error fetching event data:', error));
            })
            .catch(error => console.error('Error fetching intakes:', error));
    };

    const calculateCalories = () => {
        fetch(`http://127.0.0.1:5000/eventCalories/${eventID}`)
            .then(response => response.json())
            .then(eventCalories => {
                const totalCalories = eventCalories[0];
                console.log(totalCalories)
                setEventCalories(totalCalories);

            })
    }



    const handleAddFood = () => {
        if (!foodType) {
            setError('Please select a food type.');
            return;
        }
        if (!foodName) {
            setError('Please enter a food name.');
            return;
        }
        if (quantity <= 0) {
            setError('Quantity must be greater than 0.');
            return;
        }
        const selectedFood = foodNames.find(food => food.foodName === foodType);
        const calories = selectedFood.Calories * quantity;

        // Add the new food to the intakes list
        const newIntake = { foodType, foodName, quantity, calories };
        setIntakes([...intakes, newIntake]);

        fetch('http://127.0.0.1:5000/intakes/' + email, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                foodType: foodType,
                foodName: foodName,
                amount: quantity,
                timeTaken: new Date().toISOString(),
                intakeEventID: eventID,
            })
        })

            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));


        // Reset the form and error state
        setFoodType('');
        setFoodName('');
        setQuantity('');
        // setShowAddFoodForm(false);
        setError('');
        window.alert('Intake added, press "Show All Intakes" to see your new updates');
    };

    const tableStyle = {
        border: '1px solid black',
        textAlign: 'center'
    };

    const addButton = {
        backgroundColor: '#04AA6D',

        color: 'white',
        padding: '15px 32px',
        textalign: 'center',
        display: 'inline-block',
        fontsize: '16px'
    }

    return (

        <div style={styles.container}>
            <h2 class='title'>Intakes</h2>
            <p class='event-info'>Intake Event ID: {eventID}</p>
            <p class='event-info'>Event Type: {eventType}</p>
            <p class='event-info'>Event Name: {eventName}</p>
            <p class='event-info'>Event Time: {eventTime}</p>
            <button class='btn' onClick={fetchIntakes}>Show All Intakes</button>
            <table>
                <tbody>
                    <tr style={tableStyle}>
                        <th style={tableStyle}>Food Type</th>
                        <th style={tableStyle}>Food Name</th>
                        <th style={tableStyle}>Quantity</th>
                    </tr>
                </tbody>
                <tbody>
                    {intakes.map((intake, index) => (
                        <tr key={index}>
                            <td style={tableStyle}>{intake.foodName}</td>
                            <td style={tableStyle}>{intake.food_object}</td>
                            <td style={tableStyle}>{intake.amount} {intake.unit}(s)</td>
                         
                            <td style={tableStyle}>
                                {intake.foodName.toLowerCase() === 'breads and baked goods' && <img src={breadandbakedgoods} alt="Breads and Baked Goods" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'condiments and spices' && <img src={condimentsandspices} alt="Condiments and Spices" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'dairy' && <img src={diary} alt="Dairy" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'fruit' && <img src={fruit} alt="Fruit" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'grain' && <img src={grain} alt="Grain" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'meat' && <img src={meat} alt="Meat" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'snacks' && <img src={snacks} alt="Snacks" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'sugars and sweets' && <img src={sugarsandsweets} alt="Sugars and Sweets" style={{ width: '50px', height: '50px' }} />}
                                {intake.foodName.toLowerCase() === 'vegetable' && <img src={vegetable} alt="Vegetable" style={{ width: '50px', height: '50px' }} />}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {showAddFoodForm ? (
                <div>
                    <label htmlFor="foodType">Food Type:</label>
                    <select id="foodType" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                        <option value="">Select food type</option>
                        {foodNames.map(food => (
                            <option key={`${food.foodID}-${food.foodName}`} value={food.foodName}>{food.foodName}</option>
                        ))}
                    </select>
                    <label htmlFor="foodName">Food Name:</label>
                    <input id="foodName" type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                    <label htmlFor="quantity">Quantity:</label>
                    <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handleAddFood}>Add Food</button>


                </div>
            ) : (
                <button style={addButton} onClick={() => setShowAddFoodForm(true)}>Add Food</button>
            )}

            <br></br>
            <button onClick={() => calculateCalories()}>Submit</button>
            <a href="/IntakesEvent">Back to Events</a>

        </div>
    );
};
const styles = {
    container: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'aquamarine',
        border: '10px'

    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: '20px',
        textAlign: 'center'
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
    }

};


export default IntakesPage;
