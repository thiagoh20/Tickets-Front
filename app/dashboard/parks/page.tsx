"use client";
import TicketControl from '@/app/ui/calendar/calendar';
import React, { useState } from 'react';

const Page = () => {
    const [park, setPark] = useState<string | null>(null);

    return (
        <div className="h-[100%] flex flex-col items-center justify-center bg-gray-100">
            <div className="flex items-center p-4 justify-between w-full max-w-md mx-auto space-x-4">
                <button
                    onClick={() => setPark('PN')}
                    className={`flex-1 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                        park === 'PN' ? 'ring-4 ring-blue-300' : ''
                    }`}
                >
                    Parque Norte
                </button>
                <button
                    onClick={() => setPark('AP')}
                    className={`flex-1 h-12 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                        park === 'AP' ? 'ring-4 ring-green-300' : ''
                    }`}
                >
                    Aeroparque
                </button>
            </div>
            <div className="mt-8 w-full max-w-2xl mx-auto">
                {park === 'PN' && <TicketControl park="Parque Norte" />}
                {park === 'AP' && <TicketControl park="Aeroparque" />}
            </div>
        </div>
    );
};

export default Page;