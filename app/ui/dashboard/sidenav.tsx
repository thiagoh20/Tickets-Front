import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import DownloadExcelButton from './buttonDescarga';

export default function SideNav(user: any) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-4  flex h-20 transform items-center justify-start rounded-md bg-black p-4  md:h-40">
        <div className="ml-4 text-white">
          <p className="text-xl font-semibold tracking-wide">
            {user?.user?.name}
          </p>
          <p className="text-sm capitalize opacity-80">{user?.user?.email}</p>
          <p className="text-sm capitalize opacity-80">{user?.user?.role}</p>
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks rol={user?.user?.role} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
       
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-400/30 hover:text-gray-500 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Salir</div>
          </button>
        </form>
      </div>
    </div>
  );
}
