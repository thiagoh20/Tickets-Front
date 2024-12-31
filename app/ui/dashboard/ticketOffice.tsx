import { TicketIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

const TicketOffice = () => {
  return (
    <div className="grid w-[95%] grid-cols-2 gap-2">
      <Link href="/dashboard/validar">
        <div className="flex h-full items-center bg-gray-200 p-4">
          <UserGroupIcon width={300} className="mr-2 text-teal-500" />
          <p className="text-lg font-semibold">Validar Tickets</p>
        </div>
      </Link>
      <Link href="/dashboard/tickets">
        <div className="flex h-full items-center bg-gray-200 p-4">
          <TicketIcon width={300} className="mr-2 text-blue-500" />
          <p className="text-lg font-semibold">Tickets</p>
        </div>
      </Link>
    </div>
  );
};

export default TicketOffice;
