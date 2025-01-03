"use client"
import Marketing from '@/app/ui/dashboard/marketing';
import TicketOffice from '@/app/ui/dashboard/ticketOffice';
import { useEffect, useState } from 'react';

const Page = () => {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      setUser('user');
    } catch(err) {
      console.error(err);
    }
  }, [])

  return (
    <main className="h-full flex flex-col items-center justify-center">
      { user == 'user' ? <Marketing /> : <TicketOffice />}
    </main>
  );
}

export default Page;