import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`flex items-center align-top leading-none text-white`}>
      <Image src={'/customers/Metroparques.png'} alt="Metroparques.png" width={600} height={600} />
    </div>
  );
}
