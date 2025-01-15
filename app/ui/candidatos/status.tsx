import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function UserStatus({ status }: { status: string }) {
 
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'border border-green-500 bg-green-500/10 text-green-500 font-bold':
            status === 'Enable', 
          'border border-red-500 bg-red-500/10 text-red-500 font-bold': status === 'Disable',
        },
      )}
    >
      {status === 'Enable' ? <>Habilitado</> : null}

      {status === 'Disable' ? <>Deshabilitdo</> : null}
    </span>
  );
}
