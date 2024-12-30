// components/server/InvoicesTable.tsx
import React from 'react';
import Image from 'next/image';
import TicketStatus from '@/app/ui/candidatos/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredCandidatos } from '@/app/lib/data';
import { Ticket } from '@/app/lib/definitions';
import InvoicesTableClient from './tableClient';


export default async function InvoicesTable({
  query,
  currentPage,
  grupo,
}: {
  query: string;
  currentPage: number;
  grupo: string;
}) {
  const tickets = await fetchFilteredCandidatos(query, currentPage, grupo);

  return <InvoicesTableClient tickets={tickets} />;
}
