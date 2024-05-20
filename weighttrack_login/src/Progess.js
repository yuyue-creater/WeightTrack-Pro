import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Progress = ({ email }) => {
    const [chartData, setChartData] = useState({});
    const canvasId = `${email}`;
    const chartRef = useRef(null); // Use a ref to store the chart instance

    useEffect(() => {
        calculateCalories();
    }, []);

    const calculateCalories = () => {
        fetch(`http://127.0.0.1:5000/calories_by_date/${email}`)
            .then(response => response.json())
            .then(eventCalories => {
                const dates = eventCalories.map(item => item.eventDate);
                const calories = eventCalories.map(item => item.totalCalories);
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
    };

    useEffect(() => {
        if (chartData.labels) {
            const ctx = document.getElementById(canvasId);

            // Destroy the previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create a new chart instance and store it in the ref
            chartRef.current = new Chart(ctx, {
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
    }, [chartData, canvasId]);

    return (
        <div>
            <h1>Progress</h1>
            <canvas id={canvasId}></canvas>
        </div>
    );
};

export default Progress;
