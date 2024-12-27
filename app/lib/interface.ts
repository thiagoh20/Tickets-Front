
// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    rol: string; // Agrega la propiedad 'role' al tipo User
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      rol: string; // Asegúrate de incluirlo también aquí
    };
  }
}