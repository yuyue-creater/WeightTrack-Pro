// import React, { useState, useEffect } from 'react';

// const IntakesPage = ({ email }) => {
//     const [event, setEvent] = useState('');
//     const [date, setDate] = useState('');
//     const [intakes, setIntakes] = useState([]);
//     const [foodNames, setFoodNames] = useState([]);
//     const [foodType, setFoodType] = useState('');
//     const [foodName, setFoodName] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [showAddFoodForm, setShowAddFoodForm] = useState(false);
//     const [error, setError] = useState('');

//     // Fetch food names and units from the server
//     useEffect(() => {

//         fetch('http://127.0.0.1:5000/food')
//             .then(response => response.json())
//             .then(data => setFoodNames(data));
//     }, []);

//     const fetchIntakes = () => {
//         fetch(`http://127.0.0.1:5000/consumes/${email}`)
//             .then(response => response.json())
//             .then(data => setIntakes(data))
//             .catch(error => console.error('Error fetching intakes:', error));
//     };

//     // useEffect(() => {
//     //     fetch(`http://127.0.0.1:5000/consumes/${email}`)
//     //         .then(response => response.json())
//     //         .then(data => setIntakes(data));
//     // }, [email]);



//     const handleAddFood = () => {
//         if (!foodType) {
//             setError('Please select a food type.');
//             return;
//         }

//         if (!foodName) {
//             setError('Please enter a food name.');
//             return;
//         }

//         if (quantity <= 0) {
//             setError('Quantity must be greater than 0.');
//             return;
//         }

//         const selectedFood = foodNames.find(food => food.foodName === foodType);
//         const calories = selectedFood.Calories * quantity;

//         // Add the new food to the intakes list
//         const newIntake = { foodType, foodName, quantity, calories };
//         setIntakes([...intakes, newIntake]);

//         fetch('http://127.0.0.1:5000/intakes/' + email, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             foodType: foodType,
//             foodName: foodName,
//             amount: quantity,
//             timeTaken: new Date().toISOString()
//         })
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));


//         // Reset the form and error state
//         setFoodType('');
//         setFoodName('');
//         setQuantity('');
//         setShowAddFoodForm(false);
//         setError('');
//     };

//     return (
//         <div style={styles.container}>
//             <h2>Intakes</h2>
//             <label htmlFor="event">Event:</label>
//             <select id="event" value={event} onChange={(e) => setEvent(e.target.value)}>
//                 <option value="breakfast">Breakfast</option>
//                 <option value="lunch">Lunch</option>
//                 <option value="supper">Supper</option>
//                 <option value="snack">Snack</option>
//             </select>
//             <label htmlFor="date">Date:</label>
//             <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

//             <table style={styles.table}>
//                 <thead>
//                     <tr>
//                         <th>Food Type</th>
//                         <th>Food Name</th>
//                         <th>Quantity</th>
//                     </tr>
//                 </thead>
//                 <tbody>

//                     {intakes.map((intake, index) => (
//                         <tr key={index}>
//                             <td>{intake.food_object}</td>
//                             <td>{intake.amount}</td>
//                             <td>{intake.quantity}</td>
//                             {/* <td>{intake.foodType}</td>
//                             <td>{intake.foodName}</td>
//                             <td>{intake.quantity}</td> */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {showAddFoodForm ? (
//                 <div>
//                     <label htmlFor="foodType">Food Type:</label>
//                     <select id="foodType" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
//                         <option value="">Select food type</option>
//                         {foodNames.map(food => (
//                             <option key={`${food.foodID}-${food.foodName}`} value={food.foodName}>{food.foodName}</option>
//                         ))}
//                     </select>
//                     <label htmlFor="foodName">Food Name:</label>
//                     <input id="foodName" type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
//                     <label htmlFor="quantity">Quantity:</label>
//                     <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     <button onClick={handleAddFood}>Add Food</button>
//                 </div>
//             ) : (
//                 <button onClick={() => setShowAddFoodForm(true)}>Add Food</button>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     table: {
//         borderCollapse: 'collapse',
//         width: '100%',
//         marginTop: '20px',
//     },
//     th: {
//         border: '1px solid #ddd',
//         padding: '8px',
//         textAlign: 'left',
//         backgroundColor: '#f2f2f2',
//     },
//     td: {
//         border: '1px solid #ddd',
//         padding: '8px',
//         textAlign: 'left',
//     },
// };

// export default IntakesPage;

import React, { useState, useEffect } from 'react';

const IntakesPage = ({ email }) => {
    const [intakes, setIntakes] = useState([]);
    const [foodNames, setFoodNames] = useState([]);
    const [foodType, setFoodType] = useState('');
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showAddFoodForm, setShowAddFoodForm] = useState(false);
    const [error, setError] = useState('');

    // Fetch food names and units from the server
    useEffect(() => {
        fetch('http://127.0.0.1:5000/food')
            .then(response => response.json())
            .then(data => setFoodNames(data));
    }, []);

    const fetchIntakes = () => {
        fetch(`http://127.0.0.1:5000/consumes/${email}`)
            .then(response => response.json())
            .then(data => setIntakes(data))
            .catch(error => console.error('Error fetching intakes:', error));
    };

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
                timeTaken: new Date().toISOString()
            })
        })
        
            .then(response => response.json())
            .then(data => console.log(data))
            
            .catch(error => console.error('Error:', error));


        // Reset the form and error state
        setFoodType('');
        setFoodName('');
        setQuantity('');
        setShowAddFoodForm(false);
        setError('');
        window.alert('Intake added, press "Show All Intakes" to see your new updates');
    };

    return (
        <div style={styles.container}>
            <h2>Intakes</h2>
            <button onClick={fetchIntakes}>Show All Intakes</button>
            <table style={styles.table}>
                <thead>
                <tr>
                         <th>Food Type</th>
                         <th>Food Name</th>
                         <th>Quantity</th>
                     </tr>
                </thead>
                <tbody>
                    {intakes.map((intake, index) => (
                        <tr key={index}>
                            <td>{intake.food_object}</td>
                            <td>{intake.amount}</td>
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
                <button onClick={() => setShowAddFoodForm(true)}>Add Food</button>
            )}

            {/* Your existing code for adding new food intake */}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: '20px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
};

export default IntakesPage;
