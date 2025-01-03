import { ChartBarIcon, ChartPieIcon, ClipboardDocumentIcon, Cog8ToothIcon, TicketIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

const Marketing = () => {
  return (
    <div className="grid w-[95%] grid-cols-3 gap-2">
      <Link href="/dashboard/invoices">
        <div className="flex h-full items-center bg-gray-200 p-4">
          <ClipboardDocumentIcon width={300} className="mr-2 text-teal-500" />
          <p className="text-lg font-semibold">Facturas</p>
        </div>
      </Link>
      <Link href="/dashboard/graphs-sales">
        <div className="flex h-full items-center bg-gray-200 p-4">
          <ChartBarIcon width={300} className="mr-2 text-blue-500" />
          <p className="text-lg font-semibold">Ventas</p>
        </div>
      </Link>
      <Link href="/dashboard/graphs-interactions">
        <div className="flex h-full items-center bg-gray-200 p-4">
          <ChartPieIcon width={300} className="mr-2 text-teal-500" />
          <p className="text-lg font-semibold">Interacciones</p>
        </div>
      </Link>
      <div className="col-span-3 flex justify-center gap-2">
        <Link href="/dashboard/parks">
          <div className="flex h-full items-center bg-gray-200 p-4">
          <Cog8ToothIcon width={300} className="mr-2 text-blue-500" />
          <p className="text-lg font-semibold">Parques</p>
          </div>
        </Link>
        <Link href="/dashboard/tickets">
          <div className="flex h-full items-center bg-gray-200 p-4">
          <TicketIcon width={300} className="mr-2 text-teal-500" />
          <p className="text-lg font-semibold">Tickets</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Marketing;
