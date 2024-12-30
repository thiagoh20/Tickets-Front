import { formatInvoice } from '@/app/utils/formatInvoice';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const Invoices: React.FC<{ park: string }> = ({ park }: { park: string }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchDisabledDays = async () => {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_BACK_LINK}/api/marketing/getInvoicesPark`, { idpark: park == 'Parque Norte' ? 1 : 2 })
                .then((response) => setData(response.data))
                .catch((error) => { console.error("Error fetching disabled days: ", error); });
            } catch (error) {
                console.error("Error fetching disabled days: ", error);
            }
        };
        fetchDisabledDays();
    }, [park]);

  // Definición de columnas
  const columns = [
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
        name: 'Download', 
        selector: (row: any) => <ArrowDownCircleIcon cursor={'pointer'} width={25} />, 
        sortable: false,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={5} // Número de filas por página
      paginationRowsPerPageOptions={[5, 10]} // Opciones de filas por página
    />
  );
};

export default Invoices;
