"use client"
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const Page = () => {
    const [data, setData] = useState([])
    const [item, setItem] = useState<any>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [date, setDate] = useState<any>(new Date().toISOString().split('T')[0])    

    useEffect(() => {
        const fetchRedentionsByDate = async () => {
            try {
                await axios.post(`/api/taquilla/redentionsByDate`, { date: date })
                .then((response) => setData(response.data))
                .catch((error) => { setData([]) });
            } catch (error) {
                console.error("Error fetching disabled days: ", error);
            }
        };
        console.log(date)
        fetchRedentionsByDate();
    }, [date]);

    const handleModalOpen = (row: any) => {
        setItem(row)
        setOpenModal(!openModal)
    }

    // Definición de columnas
    const columns: any = [
        { 
            name: 'ID', 
            selector: (row: any) => row.user_id, 
            sortable: true,
        },
        { 
            name: 'Nombre', 
            selector: (row: any) => row.nombre_usuario, 
            sortable: true 
        },
        { 
            name: 'Parque', 
            selector: (row: any) => row.parque_id == 1 ? 'Parque Norte' : 'Aeroparque', 
            sortable: true 
        },
        { 
            name: '# Redenciones', 
            selector: (row: any) => row.total_redimidos, 
            sortable: true 
        },
        { 
            name: 'Detalle', 
            selector: (row: any) => <EyeIcon className="h-[18px] w-[18px] cursor-pointer" onClick={() => handleModalOpen(row)} />, 
            sortable: true 
        }
    ];

return (
    <>
    {openModal &&     
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[40%] rounded-lg bg-white p-6 text-center shadow-md">
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenModal(!openModal)}
        >
          <XMarkIcon width={25} />
        </button>
          <div className="rounded-lg border mx-auto bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">Redenciones del día {item.fecha_redencion.slice(0,10)} {item.parque_id == 1 ? 'Parque Norte' : 'Aeroparque Juan Pablo II'}</h2>
            <div className="mb-6">
            </div>
            <hr className="mb-6" />
            <div className='overflow-auto'>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="md:text-lg text-xs border border-gray-300 px-4 py-2">Tipo de pasaporte</th>
                  <th className="md:text-lg text-xs border border-gray-300 px-4 py-2">Cantidad</th>
                </tr>
              </thead>
              <tbody className='h-[50%]'>
                    {['Pasaporte acúatico adulto', 'Pasaporte acúatico niño', 'Ingreso general'].map(x => 
                    <tr key={x}>
                        <td className="md:text-md text-xs border border-gray-300 px-4 py-2">
                            {x}
                        </td>
                        <td className="md:text-md text-xs border border-gray-300 px-4 py-2">
                        8
                        </td>
                    </tr>
                    )}
              </tbody>
            </table>
            </div>
            <div className="mt-4">
              <p>
                <strong>Total Amount:</strong> &nbsp; COP
              </p>
            </div>
          </div>
        <div className="mt-[2.5%]  flex justify-center gap-[2rem]">
          <button
            className="mb-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={() => setOpenModal(!openModal)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>}
        <div className='w-[100%] md:w-[50%] mx-auto flex flex-col justify-center items-center h-screen'>
            <h1  className='text-2xl font-bold my-[2.5%] text-center md:absolute md:top-[5rem]'> Verificar las redenciones por fecha </h1>
            <div className="flex justify-center items-center gap-[2rem] mb-[2rem]">
                <label id="Date" className='font-semibold'>Selecciona la fecha</label>
                <input 
                type='date'
                value={date} 
                className='border-2 border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                onChange={(e) => setDate(e.target.value)} 
                />
            </div>
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
                            textAlign: 'left',  // Alineación a la izquierda
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
                            textAlign: 'left',  // Alineación a la izquierda
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
                            textAlign: 'left',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        },
                        },
                    }}                        
            /> : <p className='text-lg text-red-300 mt-4'> No hay redenciones del usuario para la fecha {date} </p>}
        </div>
    </>
);
};

export default Page;
