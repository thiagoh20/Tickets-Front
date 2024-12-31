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
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Registrar Tickets',
    href: '/dashboard/validar',
    icon: UserGroupIcon,
  },
  {
    name: 'Tickets',
    href: '/dashboard/candidatos',
    icon: TicketIcon,
  },
  {
    name: 'Ventas',
    href: '/dashboard/graphs-sales',
    icon: ChartBarIcon,
  },
  {
    name: 'Interacciones',
    href: '/dashboard/graphs-interactions',
    icon: ChartPieIcon,
  },
  {
    name: 'Facturas',
    href: '/dashboard/invoices',
    icon: ClipboardDocumentIcon,
  },
  {
    name: 'Parques',
    href: '/dashboard/parks',
    icon: Cog8ToothIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
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
