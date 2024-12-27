import Image from 'next/image';
import TicketStatus from '@/app/ui/candidatos/status';
import { formatDateToLocal } from '@/app/lib/utils';
import {  fetchFilteredCandidatos } from '@/app/lib/data';
import { Ticket } from '@/app/lib/definitions';

export default async function TableInvoices({
  query,
  currentPage,
  grupo,
}: {
  query: string;
  currentPage: number;
  grupo: string;
}) {
  const tickets = await fetchFilteredCandidatos(query, currentPage, grupo);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tickets?.map((ticket: Ticket) => (
              <div
                key={ticket.idticket}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={'/customers/emil-kowalski.png'}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`profile picture`}
                      />
                      <p>{ticket.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {' '}
                      {ticket.email_person}
                    </p>
                  </div>
                  {/* <CandidatoStatus status={candidatos.estado_proceso} /> */}
                  {/* <InvoiceStatus status={invoice.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  {/* <div>
                    <p>{"Ingreso: " + formatDateToLocal(candidatos.fecha_ingreso)}</p>
                    <p>{"Envio: " + formatDateToLocal(candidatos.fecha_envio)}</p>
                  </div> */}
                  <div className="flex justify-end gap-2">
                    {/* <UpdateInvoice id={candidatos.id} grupo={grupo} page={currentPage} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Invoice Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Period
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Download
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tickets?.map((ticket: Ticket) => (
                <tr
                  key={ticket.idticket}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={'/customers/emil-kowalski.png'}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`profile picture`}
                      />
                      <p>{ticket.name + ' ' + ticket?.lastname}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ticket.identity_type + ': ' + ticket.identity_number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ticket?.count_adult + ticket?.count_kid}
                    {/* {formatCurrency(candidatos.amount)} */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TicketStatus status={ticket.status} />

                    {/* {formatDateToLocal(candidatos.fecha_ingreso)} */}
                    {/* {formatDateToLocal(candidatos.date)} */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(ticket.date_ticket)}
                    {/* <p>{formatDateToLocal(candidatos.fecha_envio)}</p> */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateInvoice id={candidatos.id} grupo={grupo} page={currentPage} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
