'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/app/ui/candidatos/breadcrumbs';
import { Button } from '@/app/ui/button';
import { createCandidato } from '@/app/lib/actions';
import TicketOption from './TicketOption';
import { CandidatosTable } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';
import {
  IdentificationIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Modal from './modalTicket';

export default function Form({
  candidato,
  grupo,
  breadcrumbs,
}: {
  candidato: CandidatosTable[];
  grupo: string;
  breadcrumbs: Breadcrumb[];
}) {
  const initialState = {
    message: null,
    errors: {},
  };
  const [state, dispatch] = useFormState(createCandidato, initialState);
  const pathname = usePathname();
  const keyword = pathname.split('/')[2];
  const [selectedTickets, setSelectedTickets] = useState<
    { title: string; quantity: number; totalPrice: number }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleQuantityChange = (
    title: string,
    quantity: number,
    totalPrice: number,
  ) => {
    // Actualizar el estado con el título y la cantidad seleccionada
    setSelectedTickets((prevState) => {
      const updatedTickets = prevState.filter(
        (ticket) => ticket.title !== title,
      );
      if (quantity > 0) {
        updatedTickets.push({ title, quantity, totalPrice });
      }
      return updatedTickets;
    });
  };
  const tickett={
    idticket: 8,
    id_park: 2,
    namepark: "Juan Pablo II",
    ticket_code: "MSZ1001",
    type_pay: "PSE",
    type_money: "COP",
    name: "Juan",
    lastname: "Florez Vargas",
    email_person: "florezju@gmail.com",
    phone_number: "3097545231",
    identity_type: "CC",
    identity_number: "109482484",
    date_ticket: "2025-01-02T00:00:00.000Z",
    status: "Valido",
    type_ticket_adults: "Pasaporte Acuatico Adulto",
    count_adult: 3,
    type_ticket_kids:" Pasaporte Acuatico Niño",
    count_kid: 5,
    invoice_electronic: 0,
    created_at: "2024-12-28T07:13:26.000Z",
    price_ticket: "119000.00",
}

  // console.log(selectedTickets);
  const ticketOptions = [
    {
      title: 'Adultos - Pasaporte acuático (+140 cm)',
      description: 'Válido para visitantes de 140 centímetros de altura o más',
      price: 18000,
    },
    {
      title: 'Niños - Pasaporte acuático (-140 cm)',
      description:
        'Válido para visitantes menores de 140 centímetros de altura',
      price: 12000,
    },
  ];

  return (
    <>
      <form action={dispatch}>
        <input type="hidden" name="grupo" value={grupo} />
        <input type="hidden" name="keyword" value="exampleKeyword" />
        <input
          type="hidden"
          name="ticket"
          value={JSON.stringify(selectedTickets) || ''}
        />

        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Candidato tipo de identificacion */}
          <div className="mb-4">
            <label htmlFor="tipoid" className="mb-2 block text-sm font-medium">
              Tipo de identificación
            </label>
            <div className="relative">
              <select
                id="tipoid"
                name="tipoid"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="customer-error"
              >
                <option value="" disabled>
                  Selecione tipo de identificacion
                </option>
                <option key={'TI'} value={'TI'}>
                  TI
                </option>
                <option key={'CC'} value={'CC'}>
                  CC
                </option>
              </select>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.tipoid &&
                state?.errors.tipoid.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Candidato numero identificacion */}
          <div className="mb-4">
            <label htmlFor="id" className="mb-2 block text-sm font-medium">
              Número de indetificación
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="id"
                  name="id"
                  type="number"
                  placeholder="Identificación"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
                <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <div id="amount-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.id &&
                  state?.errors.id.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          {/* Candidato Nombre */}
          <div className="mb-4 ">
            <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
              Nombre
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <div id="amount-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.nombre &&
                  state?.errors.nombre.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          {/* Candidato Nombre */}
          <div className="mb-4 ">
            <label
              htmlFor="apellidos"
              className="mb-2 block text-sm font-medium"
            >
              Apellidos
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  placeholder="Apellidos"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <div id="amount-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.apellidos &&
                  state?.errors.apellidos.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-gray-50 p-4 md:p-4">
            {/* Otros campos */}
            <div className="space-y-4">
              {ticketOptions.map((ticket, index) => (
                <TicketOption
                  key={index}
                  title={ticket.title}
                  description={ticket.description}
                  price={ticket.price}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.ticket &&
                state?.errors.ticket.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-6 flex justify-start gap-4">
            <Link
              href={breadcrumbs[0].href}
              className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Guardar</Button>
            {state?.message && (
              <p className="mt-2 text-sm text-lime-500" key={state?.message}>
                {state?.message}
              </p>
            )}
          </div>
        </div>
      </form>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        status={"Valido"}
        selectedTicket={tickett}
      >
        <h2 className="text-lg font-bold">Detalles del Ticket</h2>
      </Modal>
    </>
  );
}
