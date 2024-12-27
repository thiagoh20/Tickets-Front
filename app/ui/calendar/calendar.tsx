'use client';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './custom-styles.css'; // Asegúrate de tener este archivo
import { XMarkIcon } from '@heroicons/react/24/outline';

const TicketControl = ({ park }: { park: string }) => {
  const LinkIcon = XMarkIcon;
  const [disabledDays, setDisabledDays] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (day: Date) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
  };

  const handleAction = (action: 'enable' | 'disable') => {
    if (!selectedDay) return;

    if (action === 'disable') {
      if (
        !disabledDays.some(
          (disabledDay) =>
            disabledDay.toDateString() === selectedDay.toDateString(),
        )
      ) {
        setDisabledDays([...disabledDays, selectedDay]);
      }
    } else if (action === 'enable') {
      setDisabledDays(
        disabledDays.filter(
          (disabledDay) =>
            disabledDay.toDateString() !== selectedDay.toDateString(),
        ),
      );
    }

    closeModal();
  };

  const isDisabled = (day: Date) =>
    disabledDays.some(
      (disabledDay) => disabledDay.toDateString() === day.toDateString(),
    );

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="mb-4 text-2xl font-bold">Control de Tickets {park}</h2>
      <DayPicker
        mode="single"
        onDayClick={(day) => day && openModal(day)}
        modifiers={{
          booked: disabledDays,
        }}
        modifiersClassNames={{
          booked: 'rdp-day--disabled', // Usamos clases personalizadas desde custom-styles.css
        }}
      />

      {/* Modal */}
      {isModalOpen && selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative rounded-lg bg-white p-6 text-center shadow-md">
            <button
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <LinkIcon className="w-[1rem]" />
            </button>
            <h3 className="mb-4 text-lg font-semibold">
              {`Controlar ventas para el día ${selectedDay.toDateString()}`}
            </h3>
            <p
              className={`mb-4 ${isDisabled(selectedDay) ? 'text-red-500' : 'text-green-500'}`}
            >
              {isDisabled(selectedDay)
                ? 'Este día está deshabilitado.'
                : 'Este día está habilitado.'}
            </p>
            <div className="flex justify-around">
              <button
                className="mb-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                onClick={() => handleAction('disable')}
              >
                Deshabilitar ventas
              </button>
              <button
                className="mb-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                onClick={() => handleAction('enable')}
              >
                Habilitar ventas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketControl;
