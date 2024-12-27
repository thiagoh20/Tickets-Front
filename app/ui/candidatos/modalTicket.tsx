'use client';

import { ModalProps } from '@/app/lib/interface';
import React from 'react';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        {children}
        <button
          className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
