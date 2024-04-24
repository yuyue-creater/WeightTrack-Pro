import React, { useState, useEffect } from 'react';

const Intakes = ({ email }) => {


    const [foodNames, setFoodNames] = useState([]);
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [timeTaken, setTimeTaken] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [error, setError] = useState('');

 
    
    useEffect(() => {
        fetch('http://127.0.0.1:5000/food')
            .then(response => response.json())
            .then(data => setFoodNames(data));
    }, []);

   
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleTimeTakenChange = (e) => {
        setTimeTaken(e.target.value);
    };

    const handleFoodTypeChange = (e) => {
        const selectedFood = foodNames.find(food => food.foodName === e.target.value);
        if (!selectedFood) {
            setError('Please select a food.');
            return;
        }
        setFoodName(e.target.value);
        setSelectedUnit(selectedFood.unit);
    };

    const handleAddIntake = () => {
        if (!foodName) {
            setError('Please select a food.');
            return;
        }
    
        if (quantity <= 0) {
            setError('Quantity must be greater than 0.');
            return;
        }
    
        const selectedFood = foodNames.find(food => food.foodName === foodName);
        const calories = selectedFood.Calories * quantity;
    

        fetch(`http://127.0.0.1:5000/intakes/${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            foodName: foodName,
            amount: quantity,
            calories: calories,
            timeTaken: timeTaken
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add intake. Server returned ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setFoodName('');
            setQuantity('');
            setTimeTaken('');
            setSelectedUnit('');
            setError('');
        })
        .catch(error => {
            console.error('Error:', error);
            setError('Failed to add intake. Please try again.');
        });
        // Add functionality to handle adding the intake to the user's history
        console.log('Food Type:', foodName, 'Quantity:', quantity, 'Unit:', selectedUnit, 'Time Taken:', timeTaken);
        setFoodName('');
        setQuantity('');
        setTimeTaken('');
        setSelectedUnit('');
        setError('');
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
                <p>Select the type of food you have consumed, and enter the amount and time.</p>
                <label style={labelStyle}>Select the type of food you ate:</label>

                <select
                    style={inputStyle}
                    value={foodName}
                    onChange={handleFoodTypeChange}
                    required
                >
                    <option key="default" value="">Select food type</option>
                    {foodNames.map(food => (
                        <option key={`${food.foodID}-${food.foodName}`} value={food.foodName}>{food.foodName}</option>
                    ))}
                </select>

                {selectedUnit && <p>The food you selected will be measured in this unit: {selectedUnit}</p>}
                <label style={labelStyle}>Enter quantity:</label>
                <input
                    style={inputStyle}
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Enter quantity"
                    required
                />
                <label style={labelStyle}>Enter time taken:</label>
                <input
                    style={inputStyle}
                    type="time"
                    value={timeTaken}
                    onChange={handleTimeTakenChange}
                    placeholder="Enter time taken"
                    required
                />

                <button onClick={handleAddIntake}>Add Intake</button>
                <div>
                    <p></p>
                    <a href="/userpage">Back to UserPage</a>
                </div>
            </div>
        </div>
    );
};

export default Intakes;
