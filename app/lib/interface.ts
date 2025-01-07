// types/next-auth.d.ts
import NextAuth from 'next-auth';
import {JWT} from 'next-auth/jwt';
import { Ticket } from './definitions';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
    };
  }
  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      role?: string;
    };
  }
 
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  status: string;
  selectedTicket: Ticket | null;
  onValidate: () => void;
}
