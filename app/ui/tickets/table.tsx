// components/server/InvoicesTable.tsx
import React from 'react';
import { fetchFilteredCandidatos } from '@/app/lib/data';
import InvoicesTableClient from './tableClient';

export default async function InvoicesTable({
  query,
  currentPage,
  role,
}: {
  query: string;
  currentPage: number;
  role: any;
}) {
  console.log(role)
  const tickets = await fetchFilteredCandidatos(query, currentPage, role?.role);

  return <InvoicesTableClient tickets={tickets} idUser={role.idUser} />;
}
