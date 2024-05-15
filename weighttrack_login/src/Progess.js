// import React, { useState, useEffect } from 'react';
// import Chart from 'chart.js/auto';

// const Progress = ({ email }) => {
//     const [chartData, setChartData] = useState({});
//     const [dates, setDate] = useState([])
//     const [calories, setCalories] = useState([])

//     useEffect(() => {
//         calculateCalories();
//     }, []);



 
//     const calculateCalories = () => {
//         fetch(`http://127.0.0.1:5000/calories_by_date/${email}`)
//             .then(response => response.json())
//             .then(eventCalories => {
//                 const dates = eventCalories.map(item => item.eventDate);
//                 const calories = eventCalories.map(item => item.totalCalories);
//                 setDate(dates);
//                 setCalories(calories);
//                 console.log(dates)
//                 console.log(calories)
//                 const data = {
//                     labels: dates,
//                     datasets: [{
//                         label: 'Calories',
//                         data: calories,
//                         fill: false,
//                         borderColor: 'rgb(75, 192, 192)',
//                         tension: 0.1
//                     }]
//                 };
//                 setChartData(data);
                
//             })
//     }




//     useEffect(() => {
//         if (chartData.labels) {
//             const ctx = document.getElementById("1");
//             new Chart(ctx, {
//                 type: 'line',
//                 data: chartData,
//                 options: {
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Date'
//                             }
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Calories'
//                             }
//                         }
//                     }
//                 }
//             });
//         }
//     }, [chartData]);




//     return (
//         <div>
//             <h1>Progress</h1>
//             <canvas id="1"></canvas>
          
//         </div>

//     );
// };

// export default Progress;

import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Progress = ({ email }) => {
    const [chartData, setChartData] = useState({});
    const [dates, setDate] = useState([])
    const [calories, setCalories] = useState([])
    const canvasId = `chart-${email}`;

    useEffect(() => {
        calculateCalories();
    }, []);

    const calculateCalories = () => {
        fetch(`http://127.0.0.1:5000/calories_by_date/${email}`)
            .then(response => response.json())
            .then(eventCalories => {
                const dates = eventCalories.map(item => item.eventDate);
                const calories = eventCalories.map(item => item.totalCalories);
                setDate(dates);
                setCalories(calories);
                const data = {
                    labels: dates,
                    datasets: [{
                        label: 'Calories',
                        data: calories,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        spanGaps: true 
                    }]
                };
                setChartData(data);
            });
    }

    useEffect(() => {
        if (chartData.labels) {
            const ctx = document.getElementById(canvasId);
            new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Calories'
                            }
                        }
                    }
                }
            });
        }
    }, [chartData]);

    return (
        <div>
            <h1>Progress</h1>
            <canvas id={canvasId}></canvas>
        </div>
    );
};

export default Progress;
