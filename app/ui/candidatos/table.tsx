// components/server/InvoicesTable.tsx
import React from 'react';
import { fetchFilteredCandidatos } from '@/app/lib/data';
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
