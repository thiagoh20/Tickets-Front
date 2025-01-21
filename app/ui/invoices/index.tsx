import { formatInvoice } from '@/app/utils/formatInvoice';
import { ArrowDownCircleIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from '@/app/ui/modal';

const Invoices: React.FC<{ park: string }> = ({ park }: { park: string }) => {
    const [data, setData] = useState([])
    const [invoice, setInvoice] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
      const openModal = (row: any) => {
        setInvoice(row);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        const fetchDisabledDays = async () => {
            try {
                await axios.post(`/api/marketing/getInvoicesPark`, { idpark: park == 'Parque Norte' ? 1 : 2 })
                .then((response) => setData(response.data))
                .catch((error) => { console.error("Error fetching disabled days: ", error); });
            } catch (error) {
                console.error("Error fetching disabled days: ", error);
            }
        };
        fetchDisabledDays();
    }, [park]);

  // Definición de columnas
  const columns: any = [
    { 
        name: 'Status', 
        selector: (row: any) => '🟢', 
        sortable: false,
    },
    { 
        name: 'Invoice', 
        selector: (row: any) => park == 'Parque Norte' ? `PN_${formatInvoice(row.Mes)}` : `AP_${formatInvoice(row.Mes)}`, 
        sortable: true 
    },
    { 
        name: 'Period', 
        selector: (row: any) => row.Mes, 
        sortable: true 
    },
    { 
        name: 'Category', 
        selector: (row: any) => park, 
        sortable: true 
    },
    { 
        name: 'Date', 
        selector: (row: any) => `15 de ${row.Mes}`, 
        sortable: true 
    },
    { 
        name: 'Amount', 
        selector: (row: any) => row.Total, 
        sortable: true 
    },
    { 
        name: 'View', 
        selector: (row: any) => <EyeIcon cursor={'pointer'} width={25} onClick={() => openModal(row)} />, 
        sortable: false,
        width: '120px'
    },
    { 
        name: 'Download', 
        selector: (row: any) => <ArrowDownCircleIcon cursor={'pointer'} width={25} />, 
        sortable: false,
        width: '120px'
    },
  ];

return (
    <div className='w-[100%] md:w-full px-[1rem]'>
        {isModalOpen && <Modal closeModal={closeModal} invoice={invoice} park={park} />}
        <DataTable
                columns={columns}
                data={data}
                pagination
                paginationPerPage={5} // Número de filas por página
                paginationRowsPerPageOptions={[5, 10]} // Opciones de filas por página
                customStyles = {{
                    header: {
                    style: {
                        minHeight: '56px',
                        backgroundColor: park == 'Parque Norte' ? '#2109a7' : '#28a745',  // Fondo azul o verde según el parque
                        color: 'white',  // Texto blanco para resaltar
                        fontSize: '1.2rem',  // Tamaño de fuente más grande
                        fontWeight: 'bold',  // Negrita en el texto
                        textAlign: 'left',  // Alineación a la izquierda
                        paddingLeft: '20px',  // Espaciado a la izquierda
                    },
                    },
                    headRow: {
                    style: {
                        backgroundColor: park == 'Parque Norte' ? '#f0f8ff' : '#e9f7ef',  // Fondo diferente según el parque
                        borderBottom: '2px solid #dee2e6',  // Línea separadora debajo de la cabecera
                    },
                    },
                    headCells: {
                    style: {
                        fontWeight: 'bold',  // Negrita en las celdas de la cabecera
                        fontSize: '1rem',  // Fuente con tamaño adecuado
                        color: park == 'Parque Norte' ? '#003366' : '#155724',  // Color verde oscuro o azul según el parque
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
                        backgroundColor: park == 'Parque Norte' ? '#cce5ff' : '#d4edda',  // Color de fondo al pasar el cursor según el parque
                        borderBottomColor: park == 'Parque Norte' ? '#99c2ff' : '#c3e6cb',  // Cambio del borde al pasar el cursor según el parque
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
        />
    </div>
);
};

export default Invoices;
