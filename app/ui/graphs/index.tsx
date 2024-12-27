"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graphs: React.FC = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Ventas por mes',
                data: [6500, 5900, 8000, 8100, 5600, 18270, 5900, 8000, 8100, 5600, 18270, 900],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Devoluciones por mes',
                data: [2500, 1900, 3000, 4100, 560, 9270, 5300, 800, 810, 560, 170, 900],
                fill: false,
                backgroundColor: 'rgba(75,12,192,0.4)',
                borderColor: 'rgba(75,12,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Ventas del año de 2024',
            },
        },
    };

    return (
        <div>
            <h2>Graphs</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Graphs;