'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  TicketIcon,
  ClipboardDocumentIcon,
  Cog8ToothIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
    roles: ['administrador', 'supervisor', 'marketing'],
  },
  {
    name: 'Tickets',
    href: '/dashboard/tickets',
    roles: ['administrador', 'taquillero', 'supervisor'],
    icon: TicketIcon,
  },
  {
    name: 'Ventas',
    href: '/dashboard/graphs-sales',
    icon: ChartBarIcon,
    roles: ['administrador',  'marketing'],
  },
  {
    name: 'Interacciones',
    href: '/dashboard/graphs-interactions',
    icon: ChartPieIcon,
    roles: ['administrador', 'marketing'],
  },
  {
    name: 'Facturas',
    href: '/dashboard/invoices',
    icon: ClipboardDocumentIcon,
    roles: ['administrador', 'marketing'],
  },
  {
    name: 'Parques',
    href: '/dashboard/parks',
    icon: Cog8ToothIcon,
    roles: ['administrador', 'supervisor', 'marketing'],
  },
  {
    name: 'Pasaportes',
    href: '/dashboard/portfolio',
    icon: CurrencyDollarIcon,
    roles: [ 'administrador','supervisor', 'marketing'],
  },
  {
    name: 'Registrar',
    href: '/dashboard/register',
    icon: PlusCircleIcon,
    roles: ['administrador', 'marketing'],
  },
];

export default function NavLinks(rol: any) {
  const pathname = usePathname();
 
  return (
    <>
      {links
        .filter((link) => link.roles.includes(rol.rol)) // Filtra según el rol del usuario
        .map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-400/30 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-slate-400/30 text-gray-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
    </>
  );
}
