'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/app/ui/candidatos/breadcrumbs';
import { Button } from '@/app/ui/button';
import { createCandidato } from '@/app/lib/actions';
import TicketOption from './TicketOption';
import { ToastContainer, toast } from 'react-toastify';
import { CandidatosTable } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';
import {
  IdentificationIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
// import Modal from './modalTicket';
import { formatCurrency } from '@/app/lib/utils';

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
  let updatedTotalPrice = 0;
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  useEffect(() => {
    setTotalPrice(updatedTotalPrice);
  }, [updatedTotalPrice]);

  const handleQuantityChange = (
    title: string,
    quantity: number,
    totalPrice: number,
  ) => {
    // Actualizar el estado con el título y la cantidad seleccionada
    let updatedTotalPrice = 0;
    setSelectedTickets((prevState) => {
      const updatedTickets = prevState.filter(
        (ticket) => ticket.title !== title,
      );
      if (quantity > 0) {
        updatedTickets.push({ title, quantity, totalPrice });
      }
      updatedTotalPrice = updatedTickets.reduce(
        (acc, ticket) => acc + ticket.totalPrice,
        0,
      );

      setTotalPrice(updatedTotalPrice);
      return updatedTickets;
    });
  };
  const notify = (state: any) => {
    if (state.message === 'Faltan campos.') {
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
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    if (state?.message) {
      notify(state);
    }
  }, [state]);

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
      <ToastContainer />
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
          <div className="flex justify-start text-xl font-semibold text-gray-900">
            <h2>Total Precio: {formatCurrency(totalPrice)}</h2>
          </div>
          <div className="mt-6 flex justify-start gap-4">
            <Link
              href={breadcrumbs[0].href}
              className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit" onClick={notify}>
              Guardar
            </Button>
            
          </div>
        </div>
      </form>

      {/* <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        status={'Valido'}
        selectedTicket={tickett}
      >
        <h2 className="text-lg font-bold">Detalles del Ticket</h2>
        <div className="mt-4">
         
          <h3 className="text-md font-semibold">Datos del Cliente</h3>
          <ul className="mt-2 text-sm text-gray-700">
            <li>
              <strong>Nombre:</strong> {}
            </li>
            <li>
              <strong>Tipo de Identificación:</strong>
              {}
            </li>
            <li>
              <strong>Número de Identificación:</strong> {}
            </li>
            
          </ul>
        
          <h3 className="text-md mt-4 font-semibold">Resumen</h3>
          <ul className="mt-2 text-sm text-gray-700">
            <li>
              <strong>Adultos:</strong>
              <span className="text-lg font-bold text-blue-600">
                {' '}
                {}{' '}
              </span>
              ({})
            </li>
            <li>
              <strong>Niños:</strong>
              <span className="text-lg font-bold text-green-600">
                {' '}
                {}{' '}
              </span>
              ({})
            </li>
            <li>
              <strong>Factura Electrónica:</strong>{' '}
              {}
            </li>
          </ul>
        </div>
      </Modal> */}
    </>
  );
}
