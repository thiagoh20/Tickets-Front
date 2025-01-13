'use client';

import {
  BackspaceIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UserMinusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCandidato } from '@/app/lib/actions';
import { useState } from 'react';

export function CreateInvoice({ grupo }: { grupo: string }) {
  const href =
    grupo === 'Buen Comienzo'
      ? '/dashboard/customers/create'
      : '/dashboard/candidatos/create';

  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Candidato</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id, page }: { id: string; page: number }) {
  const href = '/dashboard/candidatos/' + id + '/edit?page=' + page;
  return (
    <Link href={href} className="rounded-md border p-2 hover:bg-gray-100">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setConfirmDelete(true); // Mostrar confirmación de eliminación
  };

  const handleConfirmDelete = () => {
    console.log(id);
    //   deleteCandidato(id)
    //     .then(() => {
    //       window.location.reload(); // Recargar la página después de eliminar
    //     })
    //     .catch((error) => {
    //       console.error('Error eliminando el candidato: ', error);
    //     }); // Llamar a la acción de eliminar
    //   setConfirmDelete(false); // Ocultar confirmación
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false); // Cancelar eliminación
  };

  return (
    <div>
      {confirmDelete ? (
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-400"
            onClick={handleConfirmDelete}
          >
            <UserMinusIcon className="mr-2 w-5" />
            Desahabilitar
          </button>

          <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={handleCancelDelete}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <form>
          <button
            className="rounded-md border bg-red-200 p-2 hover:bg-red-300 "
            onClick={handleDeleteClick}
          >
            <span className=" ">Desahabilitar User</span>
          </button>
        </form>
      )}
    </div>
  );
}

export function UpdatePass({ id }: { id: string }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setConfirmDelete(true); // Mostrar confirmación de eliminación
  };

  const handleConfirmDelete = () => {
    console.log(id);
    // deleteCandidato(id).then(() => {
    //   window.location.reload(); // Recargar la página después de eliminar
    // })
    //   .catch((error) => {
    //     console.error("Error eliminando el candidato: ", error);
    //   }); // Llamar a la acción de eliminar
    setConfirmDelete(false); // Ocultar confirmación
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false); // Cancelar eliminación
  };

  return (
    <div>
      {confirmDelete ? (
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-400"
            onClick={handleConfirmDelete}
          >
            <BackspaceIcon className="mr-2 w-5" />
            Restablecer
          </button>

          <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={handleCancelDelete}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <form>
          <button
            className="rounded-md border p-2 hover:bg-blue-300 bg-blue-200"
            onClick={handleDeleteClick}
          >
            <span className="">Restablecer Contraseña</span>
          </button>
        </form>
      )}
    </div>
  );
}
