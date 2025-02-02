"use client";
import { formatCurrency } from '@/app/lib/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const Page = () => {
  const [park, setPark] = useState<string | null>(null);
  const [data, setData] = useState([]) 

  const handleError = (error: any) => {
    console.error(error)
    setData([])
  }

  useEffect(() => {
      const fetchRedentionsByDate = async () => {
          try {
              await axios.get(`/api/taquilla/returnsByPark/${park == 'PN' ? 1 : 2}`, )
              .then((response) => setData(response.data))
              .catch((error) => handleError(error));
          } catch (error) {
              console.error("Error fetching disabled days: ", error);
          }
      };
      fetchRedentionsByDate();
  }, [park]);

  const columns: any = [
    { 
        name: 'Medio', 
        selector: (row: any) => row.type_pay, 
        sortable: true,
        width: "10%",
    },
    { 
        name: 'Precio', 
        selector: (row: any) => `${formatCurrency(row.price_ticket)} ${row.type_money}`, 
        sortable: true,
        width: "15%"
    },
    { 
        name: 'Nombre', 
        selector: (row: any) => row.name, 
        sortable: true,
    },
    { 
        name: 'Email', 
        selector: (row: any) => row.email_person, 
        sortable: true,
        width: "30%"
    },
    { 
        name: 'Celular', 
        selector: (row: any) => row.phone_number, 
        sortable: true,
    },
    { 
        name: 'Fecha', 
        selector: (row: any) => row.date_ticket.slice(0, 10), 
        sortable: true,
    },
    { 
        name: 'Estado', 
        selector: (row: any) => row.status == 'Devolucion' ? '🟡' : '🔴', 
        sortable: false,
    },
];

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold my-[2.5%] text-center">Devoluciones pendientes del {park == 'PN' ? 'Parque Norte' : 'Aeroparque'}</h1>
      <div className="flex items-center p-2 justify-between w-full max-w-sm mx-auto space-x-2">
        <button
          onClick={() => setPark('PN')}
          className={`flex-1 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300 ${
            park === 'PN' ? 'ring-2 ring-blue-300' : ''
          }`}
        >
          Parque Norte
        </button>
        <button
          onClick={() => setPark('AP')}
          className={`flex-1 h-10 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded transition duration-300 ${
            park === 'AP' ? 'ring-2 ring-green-300' : ''
          }`}
        >
          Aeroparque
        </button>
      </div>
      <div className="flex-grow w-full max-w-6xl mx-auto mt-8">
      {data.length ? <DataTable
                columns={columns}
                data={data}
                pagination
                paginationPerPage={5} // Número de filas por página
                paginationRowsPerPageOptions={[5, 10]} // Opciones de filas por página
                customStyles = {{
                    header: {
                    style: {
                        minHeight: '56px',
                        backgroundColor: '#28a745',  // Fondo azul o verde según el parque
                        color: 'white',  // Texto blanco para resaltar
                        fontSize: '1.2rem',  // Tamaño de fuente más grande
                        fontWeight: 'bold',  // Negrita en el texto
                        textAlign: 'center',  // Alineación a la izquierda
                        paddingLeft: '20px',  // Espaciado a la izquierda
                    },
                    },
                    headRow: {
                    style: {
                        backgroundColor: '#e9f7ef',  // Fondo diferente según el parque
                        borderBottom: '2px solid #dee2e6',  // Línea separadora debajo de la cabecera
                    },
                    },
                    headCells: {
                    style: {
                        fontWeight: 'bold',  // Negrita en las celdas de la cabecera
                        fontSize: '1rem',  // Fuente con tamaño adecuado
                        color: '#155724',  // Color verde oscuro o azul según el parque
                        paddingLeft: '15px',
                        paddingRight: '15px',  // Espaciado para las celdas de cabecera
                        textAlign: 'center',  // Alineación a la izquierda
                    },
                    },
                    rows: {
                    style: {
                        fontSize: '1rem',  // Tamaño de fuente normal para las filas
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        backgroundColor: '#ffffff',  // Fondo blanco para las filas
                        borderBottom: '1px solid #dee2e6',  // Línea separadora entre las filas
                    },
                    highlightOnHoverStyle: {
                        backgroundColor: '#d4edda',  // Color de fondo al pasar el cursor según el parque
                        borderBottomColor: '#c3e6cb',  // Cambio del borde al pasar el cursor según el parque
                        borderRadius: '10px',  // Bordes redondeados al pasar el cursor
                        outline: 'none',  // Eliminar outline del hover
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Sombra suave al pasar el cursor
                    },
                    },
                    cells: {
                    style: {
                        fontSize: '0.9rem',  // Fuente un poco más pequeña para las celdas
                        textAlign: 'center',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    },
                    },
                }}                        
        /> : <p className='text-lg text-red-300 mt-4 text-center'> No hay devoluciones del parque {park == 'PN' ? 'Parque Norte' : 'Aeroparque'} </p>}
      </div>
    </div>
  );
};

export default Page;
