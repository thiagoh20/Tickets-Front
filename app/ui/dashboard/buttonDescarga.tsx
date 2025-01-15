"use client"; 

import { useState } from "react";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
const DownloadExcelButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${window.location.origin}/dashboard/generar-excel`);
           
            if (!response.ok) {
                throw new Error('Error al generar el archivo');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'candidatos.xlsx'; 
            document.body.appendChild(a);
            a.click();
           
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleDownload} disabled={loading} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-white bg-black p-3 text-sm font-medium hover:bg-slate-400/30 hover:text-gray-400 md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowDownTrayIcon className="w-6" />
            <div className="hidden md:block">{loading ? 'Descargando...' : 'Descargar Informe.'}</div>
        </button>
    );
};

export default DownloadExcelButton;
