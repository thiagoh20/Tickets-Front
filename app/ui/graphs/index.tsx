"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Graphs = ({ park }: { park: string }) => {

    const [data, setData] = useState({
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
                data: [182500, 1900, 3000, 4100, 560, 9270, 5300, 800, 810, 560, 170, 900],
                fill: false,
                backgroundColor: 'rgba(75,12,192,0.4)',
                borderColor: 'rgba(75,12,192,1)',
            },
        ],
    });
    
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_LINK}/api/marketing/getInvoicesPark`, { idpark: park == 'Parque Norte' ? 1 : 2 });
                setData({ 
                    ...data, 
                    labels: response.data.map((invoice: any) => invoice.Mes),
                    datasets: [
                        { 
                            ...data.datasets[0], 
                            data: response.data.map((invoice: any) => invoice.Total) 
                        },
                        data.datasets[1] // Keep the existing data for "Devoluciones por mes"
                    ] 
                });
            } catch (error) {
                console.error('Failed to fetch card data:', error);
            }
        };

        fetchInvoices();
    }, [data, park]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Ventas del último año',
            },
        },
    };

    return (
        <Line data={data} options={options} />
    );
};

export default Graphs;