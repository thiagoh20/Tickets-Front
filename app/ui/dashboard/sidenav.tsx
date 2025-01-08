import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import DownloadExcelButton from './buttonDescarga';

export default function SideNav(rol:any) {
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link className="mb-2 px-2 flex h-20 items-center justify-center rounded-md md:h-40" href="/">
        <AcmeLogo />
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks rol={rol?.rol} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => {
          'use server';
          // await fetchCrearExcel();
        }}>
          {/* <DownloadExcelButton /> */}
          {/* <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-white bg-blue-600  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowDownTrayIcon className="w-6" />
            <div className="hidden md:block">Descargar Informe</div>
          </button> */}
        </form>
        <form action={async () => {
          'use server';
          await signOut();
        }}>

          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-slate-400/30 hover:text-gray-500 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
