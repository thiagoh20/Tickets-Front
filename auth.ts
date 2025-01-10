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
        idUser: user?.id_user.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol,
        park: user.idpark,
        changePass: "0",
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
          .object({ email: z.string().min(3), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (!user) return null;

          return {
            idUser: user.idUser,
            name: user.name,
            email: user.email,
            role: user?.rol,
            park: user?.park,
            changePass:user?.changePass,
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
        token.idUser = user.idUser;
        token.role = user.role;
        token.park = user.park;
        token.changePass=user.changePass;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && typeof token.role === 'string') {
        (session.user as any).role = token.role;
        (session.user as any).park = token.park;
        (session.user as any).idUser = token.idUser;
        (session.user as any).changePass=token.changePass;
      }
      return session;
    },
  },
});
