import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User, ApiResponse } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import axios from 'axios';

async function getUser(
  email: string,
  password: string,
): Promise<User | undefined> {
  try {
    const response = await axios.post<ApiResponse>(
      `${process.env.NEXT_PUBLIC_BACK_LINK}/api/taquilla/loginUser`,
      { email, password },
    );
    const apiResponse = response.data;
    if (apiResponse.user) {
      const user = apiResponse.user;
      return {
        id_user: user?.id_user.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }

    return undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET || 'some-random-secret-key',
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (!user) return null;
         
          return {
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            role: user?.rol,
          };
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
 
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && typeof token.role === 'string') {
        session.user.role = token.role;
      }
      return session;
    },
  },

});
