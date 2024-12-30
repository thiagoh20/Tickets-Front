
// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { Ticket } from './definitions';

declare module 'next-auth' {
  interface User {
    rol: string; 
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      rol: string; 
    };
  }
}


export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  status: string;
  selectedTicket: Ticket | null;
}