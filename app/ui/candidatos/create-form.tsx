'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createCandidato } from '@/app/lib/actions';
import TicketOption from './TicketOption';
import { ToastContainer, toast } from 'react-toastify';
import { useFormState } from 'react-dom';
import {
  IdentificationIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { formatCurrency } from '@/app/lib/utils';

export default function Form({
  park,
}: {
  park: string;
}) {
  const initialState = {
    message: null,
    errors: {},
  };
  const [state, dispatch] = useFormState(createCandidato, initialState);
  const [reset, setReset] = useState(false);
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

  const ticketOptionsAP = [
    {
      title: 'Adultos - Pasaporte acuático (+140 cm)',
      description: 'Válido para visitantes de 140 centímetros de altura o más',
      price: 18000,
    },
    {
      title: 'Niños - Pasaporte acuático (-140 cm)',
      description:
        'Válido para visitantes menores de 140 centímetros de altura',
      price: 13000,
    },
  ];

  const ticketOptionsPN = [
    {
      title: 'Adultos - Pasaporte Extremo (+125 cm)',
      description: 'Válido para visitantes de 125 centímetros de altura o más',
      price: 44500,
    },
    {
      title: 'Niños - Pasaporte Fusión (-125 cm)',
      description:
        'Válido para visitantes menores de 125 centímetros de altura',
      price: 29300,
    }
  ];

  const ticketOptions =
    park === 'Parque Norte' ? ticketOptionsPN : ticketOptionsAP;

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSave = () => {
    notify;
    if (state.message != 'Faltan campos.') {
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.reset();
          setReset(!reset);
        }
      }, 1000);
    }
  };

  const handleReset = () => {
    formRef.current?.reset();
    return setReset(!reset);
  }

  return (
    <>
      <ToastContainer />
      <form ref={formRef} action={dispatch}>
        <input type="hidden" name="keyword" value="exampleKeyword" />
        <input type="hidden" name="park" value={park} />
        <input
          type="hidden"
          name="ticket"
          value={JSON.stringify(selectedTickets) || ''}
        />

        <div className="grid grid-cols-2 gap-2 rounded-md bg-gray-50 p-4 md:p-6">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
            <div className="rounded-md bg-gray-100 p-6 shadow-md md:p-8 h-[20rem] overflow-y-auto">
            {/* Otros campos */}
            <div className="space-y-6">
              {ticketOptions.map((ticket, index) => (
                <TicketOption
                  key={index}
                  title={ticket.title}
                  price={ticket.price}
                  onQuantityChange={handleQuantityChange}
                  reset={reset}
                />
              ))}
            </div>
            <div
              id="customer-error"
              aria-live="polite"
              aria-atomic="true"
              className="mt-4"
            >
              {state?.errors?.ticket &&
                state?.errors.ticket.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center text-xl font-semibold text-gray-900">
            <h2>Precio Total: &nbsp; &nbsp;</h2>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <Button type="button" onClick={handleReset} className="h-10 px-6 bg-gray-400">
              Cancelar
            </Button>
            <Button type="submit" onClick={handleSave} className="h-10 px-6">
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
