import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex items-center align-top leading-none text-white`}>
      <p className="text-2xl">Tickets</p>
    </div>
  );
}
