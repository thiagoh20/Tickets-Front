'use client';
import { CandidatosTable } from '@/app/lib/definitions';
import { Breadcrumb } from '@/app/ui/candidatos/breadcrumbs';
import Link from 'next/link';
import {
  AtSymbolIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCandidato } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Search from '../search';

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
    grupo: grupo,
    fecha_envio: null,
  };
  const [state, dispatch] = useFormState(createCandidato, initialState);
  const [estadoProceso, setEstadoProceso] = useState<string>('');
  const pathname = usePathname();
  const keyword = pathname.split('/')[2];
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstadoProceso(event.target.value);
  };

  return (
    <form action={dispatch}>
      <input type="hidden" name="grupo" value={grupo} />
      <input type="hidden" name="keyword" value={keyword} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className=" mb-4  flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar Ticket..." />
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
              {state.errors?.nombre &&
                state.errors.nombre.map((error: string) => (
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
            Apellidos
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Apellidos"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.nombre &&
                state.errors.nombre.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Candidato Email */}
        <div className="mb-4">
          <label htmlFor="correo" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="user@gcorreo.com"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.correo &&
                state.errors.correo.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Ticket Status */}
        <fieldset className="mb-4 ">
          <legend className="mb-2 block text-sm font-medium ">
            Estado de su ticket
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="En_proceso"
                  name="estado_proceso"
                  type="radio"
                  value="En Proceso"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="En proceso"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Devolucion
                  <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Enviado"
                  name="estado_proceso"
                  type="radio"
                  value="Enviado"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="Enviado"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Valido <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no_paso"
                  name="estado_proceso"
                  type="radio"
                  value="No paso"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="no_paso"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Cancelado
                  <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no_paso"
                  name="estado_proceso"
                  type="radio"
                  value="No paso"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="no_paso"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Usado
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.estado_proceso &&
              state.errors.estado_proceso.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Candidato Fecha de inicio del proceso */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Fecha del ticket
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fecha_ingreso"
                name="fecha_ingreso"
                type="date"
                className="peer block w-48 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
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
        </div>
      </div>
    </form>
  );
}
