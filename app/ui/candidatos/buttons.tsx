'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCandidato } from '@/app/lib/actions';
import { useState } from 'react';

export function CreateInvoice({
  grupo,
}: {
  grupo: string;
}) {
  const href = grupo === 'Buen Comienzo'
    ? '/dashboard/customers/create'
    : '/dashboard/candidatos/create';

  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400/30"
    >
      <span className="hidden md:block">Validar Tickets</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id, grupo, page }: { id: string, grupo: string, page: number }) {
  const href = grupo === 'Buen Comienzo'
    ? '/dashboard/customers/' + id + '/edit?page=' + page
    : '/dashboard/candidatos/' + id + '/edit?page=' + page;
  return (
    <Link
      href={href}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setConfirmDelete(true); 
  };

  const handleConfirmDelete = () => {
    deleteCandidato(id).then(() => {
      window.location.reload(); 
    })
      .catch((error) => {
        console.error("Error eliminando el candidato: ", error);
      });
    setConfirmDelete(false); 
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false); 
  };

  return (
    <div>
      {confirmDelete ? (
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-400"
            onClick={handleConfirmDelete}
          >
            <TrashIcon className="w-5 mr-2" />
            Confirmar
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
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={handleDeleteClick}
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
        </form>
      )}
    </div>
  );
}


