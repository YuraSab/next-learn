// middleware.ts
import { auth } from '@/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';


// Список маршрутів, які потрібно захистити
const protectedRoutes = [
  '/create-post',
  '/edit-post',
  '/dashboard'
];

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('__session')?.value;
  const url = new URL('/auth/login', request.url);

  // Перевірка, чи поточний шлях починається з одного із захищених маршрутів
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Якщо немає сесійного кукі, перенаправляємо
    if (!sessionCookie) {
      return NextResponse.redirect(url);
    }

    try {
      // Перевіряємо дійсність кукі, використовуючи Firebase Admin SDK
      await auth.verifySessionCookie(sessionCookie, true);
      // Якщо кукі дійсний, продовжуємо запит
      return NextResponse.next();
    } catch (error) {
      // Якщо перевірка не вдалася, перенаправляємо на сторінку входу
      return NextResponse.redirect(url);
    }
  }

  // Для всіх інших маршрутів, дозволяємо запит
  return NextResponse.next();
}

export const config = {
  // Це ключова частина:
  // Вказуємо, які маршрути має обробляти middleware.
  // Також встановлюємо runtime на 'nodejs', щоб уникнути помилки з 'fs'.
  matcher: ['/create-post/:path*', '/edit-post/:path*', '/dashboard/:path*'],
  runtime: 'nodejs',
};