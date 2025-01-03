'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import TicketStatus from '@/app/ui/candidatos/status';
import { Ticket } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import Modal from './modalTicket';
import { validateTicket } from '@/app/lib/actions';
import { toast, ToastContainer } from 'react-toastify';

interface InvoicesTableClientProps {
  tickets: Ticket[];
}

export default function InvoicesTableClient({
  tickets,
}: InvoicesTableClientProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (ticketId: Ticket) => {
    setSelectedTicket(ticketId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };
  const handleValidateTicket = async () => {
    if (selectedTicket) {
      try {
        const data = {
          type_document: selectedTicket.identity_type,
          document: selectedTicket.identity_number,
          park: selectedTicket.namepark,
        };
        const response = await validateTicket(data);
        notify({ message: response }); // Usar notify en lugar de alert
        closeModal(); // Cierra el modal después de la validación
        setTimeout(() => {
          window.location.reload(); // Recargar la página después de una pausa breve
        }, 1000); 
      } catch (error) {
        notify({ message: 'Error al validar el ticket' }); // Usar notify en lugar de alert
      }
    } else {
      notify({ message: 'Faltan campos.' }); // Manejar el caso en que falten campos
    }
  };

  const notify = (state: any) => {
    if (state.message === 'El ticket existe pero se encuentra vencido') {
      toast.error(state.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(state.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
                  <th scope="col" className="px-3 py-5 font-medium">
                    Parque
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Nombre
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Identificación
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Entradas
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Estado
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Factura Electrónica
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tickets.map((ticket: Ticket) => (
                  <tr
                    key={ticket.idticket}
                    className="w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none hover:bg-gray-100"
                    onClick={() => handleRowClick(ticket)}
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
                          <p>
                            {ticket.namepark}
                          </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {ticket.name + ' ' + ticket.lastname}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {ticket.identity_type + ': ' + ticket.identity_number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {ticket.count_adult + ticket.count_kid}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <TicketStatus status={ticket.status} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {!!ticket.invoice_electronic ? 'Sí' : 'No'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(ticket.date_ticket)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        status={selectedTicket?.status || ''}
        selectedTicket={selectedTicket || null}
        onValidate={handleValidateTicket}
      >
        <h2 className="text-lg font-bold">Detalles del Ticket</h2>
        <div className="mt-4">
          {/* Datos del cliente */}
          <h3 className="text-md font-semibold">Datos del Cliente</h3>
          <ul className="mt-2 text-sm text-gray-700">
            <li>
              <strong>Nombre:</strong>{' '}
              {selectedTicket?.name + ' ' + selectedTicket?.lastname}
            </li>
            <li>
              <strong>Tipo de Identificación:</strong>
              {selectedTicket?.identity_type}
            </li>
            <li>
              <strong>Número de Identificación:</strong>{' '}
              {selectedTicket?.identity_number}
            </li>
            <li>
              <strong>Email:</strong>
              {selectedTicket?.email_person}
            </li>
            <li>
              <strong>Teléfono:</strong> {selectedTicket?.phone_number}
            </li>
          </ul>
          {/* Detalles del ticket */}
          <h3 className="text-md mt-4 font-semibold">Detalles del Ticket</h3>
          <ul className="mt-2 text-sm text-gray-700">
            <li>
              <strong>ID del Ticket:</strong> {selectedTicket?.ticket_code}
            </li>
            <li>
              <strong>Parque: </strong> {selectedTicket?.namepark}
            </li>
            <li>
              <strong>Fecha: </strong>
              {formatDateToLocal(selectedTicket?.date_ticket || '')}
            </li>
            <li>
              <strong>Estado: </strong>{' '}
              <TicketStatus status={selectedTicket?.status || ''} />
            </li>
          </ul>
          {/* Resumen */}
          <h3 className="text-md mt-4 font-semibold">Resumen</h3>
          <ul className="mt-2 text-sm text-gray-700">
            <li>
              <strong>Adultos:</strong>
              <span className="text-lg font-bold text-blue-600">
                {' '}
                {selectedTicket?.count_adult}{' '}
              </span>
              ({selectedTicket?.type_ticket_adults})
            </li>
            <li>
              <strong>Niños:</strong>
              <span className="text-lg font-bold text-green-600">
                {' '}
                {selectedTicket?.count_kid}{' '}
              </span>
              ({selectedTicket?.type_ticket_kids})
            </li>
            <li>
              <strong>Factura Electrónica:</strong>{' '}
              {selectedTicket?.invoice_electronic === 1 ? 'Sí' : 'No'}
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}
