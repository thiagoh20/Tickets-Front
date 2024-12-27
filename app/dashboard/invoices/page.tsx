import Pagination from '@/app/ui/candidatos/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/candidatos/table';
import { CreateInvoice } from '@/app/ui/candidatos/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTicketsCount } from '@/app/lib/data';
import { Metadata } from 'next';
import TableInvoices from '@/app/ui/candidatos/invoiceTable';

export const metadata: Metadata = {
  title: 'Tickets',
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    grupo?: string;
  };
}) {
  const grupo = "Cero a Siempre"
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTicketsCount(query, grupo);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Todos los Tickets</h1>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <TableInvoices query={query} currentPage={currentPage} grupo={grupo} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}