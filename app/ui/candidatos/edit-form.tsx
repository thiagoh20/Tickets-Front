'use client';

import {  CandidatosTable } from '@/app/lib/definitions';
import { Breadcrumb } from '@/app/ui/candidatos/breadcrumbs';
import {
  AtSymbolIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  IdentificationIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {  updateCandidato } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function EditInvoiceForm({
  candidato,
  grupo,
  breadcrumbs
}: {
  candidato: CandidatosTable;
  grupo: string;
  breadcrumbs: Breadcrumb[]
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  
  const keyword = pathname.split('/')[2];
  const initialState = { message: null, errors: {} };
  const currentPage = searchParams.get('page') || 1;
  
  const updateInvoiceWithId = updateCandidato.bind(null, candidato.id);
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);

  const fechaIngreso = candidato.fecha_ingreso ? new Date(candidato.fecha_ingreso) : null;
  const fechaIngresoFormatted = fechaIngreso ? fechaIngreso.toISOString().split('T')[0] : undefined;

  const fechaEnvio = candidato.fecha_envio ? new Date(candidato.fecha_envio) : null;
  const fechaEnvioFormatted = fechaEnvio ? fechaEnvio.toISOString().split('T')[0] : undefined;

  const [estadoProceso, setEstadoProceso] = useState<string>('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstadoProceso(event.target.value);
  };

  useEffect(() => {
    if (candidato.estado_proceso) {
      setEstadoProceso(candidato.estado_proceso);
    }
  }, [candidato]); // Dependencia en candidato
  return (
    // Passing an id as argument won't work
    <form action={dispatch}>
      <input type="hidden" name="grupo" value={grupo} />
      <input type="hidden" name="page" value={currentPage} />
      <input type="hidden" name="keyword" value={keyword} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Candidato Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
            Nombre completo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre apellido"
                defaultValue={candidato.nombre}               
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

      
        <div className="mb-4">
          <label htmlFor="tipoid" className="mb-2 block text-sm font-medium">
            Tipo de identificación
          </label>
          <div className="relative">
            <select
              id="tipoid"
              name="tipoid"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={candidato.tipoid}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Selecione tipo de identificacion
              </option>
              <option key={"TI"} value={"TI"}>TI</option>
              <option key={"CC"} value={"CC"}>CC</option>
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tipoid &&
              state.errors.tipoid.map((error: string) => (
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
                defaultValue={candidato.id}
                placeholder="Identificación"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.id &&
                state.errors.id.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {/* Candidato Cargo */}
        <div className="mb-4">
          <label htmlFor="cargo" className="mb-2 block text-sm font-medium">
            Cargo del candidato
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cargo"
                name="cargo"
                type="text"
                defaultValue={candidato.cargo}         
                placeholder="Cargo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <ClipboardDocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.cargo &&
                state.errors.cargo.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {/* Candidato numero  celular */}
        <div className="mb-4">
          <label htmlFor="celular" className="mb-2 block text-sm font-medium">
            Número de celular
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="celular"
                name="celular"
                type="number"
                placeholder="Celular"
                defaultValue={candidato.celular}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.celular &&
                state.errors.celular.map((error: string) => (
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
                defaultValue={candidato.correo}
                
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
        {/* Invoice Status */}
        <fieldset className="mb-4 ">
          <legend className="mb-2 block text-sm font-medium ">
            Estado del proceso del candicato
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input

                  id="En_proceso"
                  name="estado_proceso"
                  type="radio"
                  value="En Proceso" 
                  defaultChecked={candidato.estado_proceso === 'En Proceso'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="En proceso"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  En proceso <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Enviado"
                  name="estado_proceso"
                  type="radio"
                  value="Enviado"
                  defaultChecked={candidato.estado_proceso === 'Enviado'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="Enviado"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Enviado <CheckIcon className="h-4 w-4" />
                </label>

              </div>
              <div className="flex items-center">
                <input
                  id="no_paso"
                  name="estado_proceso"
                  type="radio"
                  value="No paso"
                  defaultChecked={candidato.estado_proceso === 'No paso'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="no_paso"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  No paso<XMarkIcon className="h-4 w-4" />
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
        {/* Candidato observacion*/}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Observación
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="motivo"
                name="motivo"
                placeholder="Observacion del candidato"
                defaultValue={candidato.motivo}
                className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                maxLength={500}
              />
            </div>
            <label htmlFor="amount" className="mb-2 text-sm font-normal text-gray-400 absolute right-0">
              Limite 500
            </label>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.motivo &&
                state.errors.motivo.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {/* Candidato Fecha de inicio del proceso */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Fecha de inicio del proceso del candidato
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fecha_ingreso"
                name="fecha_ingreso"
                type="date"
                defaultValue={fechaIngresoFormatted}
                className="peer block w-48 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>

          </div>
        </div>
        {/* Candidato Fecha de envío a contratación */}
        {estadoProceso === 'Enviado' && (
          <div className="mb-4">
            <label htmlFor="fecha_envio" className="mb-2 block text-sm font-medium">
              Fecha de envío a contratación
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="fecha_envio"
                  name="fecha_envio"
                  type="date"
                  defaultValue={fechaEnvioFormatted}
                  className="peer block w-48 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                />
                <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={breadcrumbs[0].href}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar candidato</Button>
      </div>
    </form>
  );
}
