import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

type Role = 'administrador' | 'supervisor' | 'marketing' | 'taquillero';

export async function middleware(req: any) {
  const secret = process.env.NEXTAUTH_SECRET || 'some-random-secret-key';
  const token = await getToken({ req, secret }); // Obtiene el token JWT
  const url = req.nextUrl; // URL actual de la solicitud

  // Si el token no existe, redirige a la página de inicio
  if (!token) {
    if (url.pathname !== '/') {
      return NextResponse.redirect(new URL('/', req.url)); // Evita un bucle de redirección
    }
    return NextResponse.next();
  }

  const role = token.role as Role;
  const pathname = url.pathname; // Ruta solicitada

  // Define reglas basadas en roles
  const roleAccess: Record<Role, string[]> = {
    administrador: [
      '/dashboard',
      '/dashboard/tickets',
      '/dashboard/graphs-sales',
      '/dashboard/graphs-interactions',
      '/dashboard/invoices',
      '/dashboard/parks',
      '/dashboard/portfolio',
    ],
    supervisor: ['/dashboard', '/dashboard/tickets'],
    marketing: [
      '/dashboard',
      '/dashboard/graphs-sales',
      '/dashboard/graphs-interactions',
    ],
    taquillero: ['/dashboard', '/dashboard/tickets'],
  };

  const allowedRoutes = roleAccess[role] || [];
  const isAllowed = allowedRoutes.some((route: string) =>
    pathname.startsWith(route),
  );

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/dashboard/tickets', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
