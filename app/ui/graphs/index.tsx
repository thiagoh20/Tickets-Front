"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graphs: React.FC = () => {
    const data = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Ventas por mes',
                data: [6500, 5900, 8000, 8100, 5600, 18270],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
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
                text: 'Ventas del primer semestre de 2024',
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