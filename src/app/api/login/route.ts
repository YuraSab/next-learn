// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';


// Те, що loginUser та registerUser обидва посилаються на один і той же POST метод, є цілком нормальним. 
// Мета цього методу (/api/login) — отримати токен від клієнта та створити сесійний cookie. 
// Обидва процеси — вхід і реєстрація — зрештою призводять до однієї й тієї ж дії: створення сесії для нового користувача.
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { idToken } = body; // Очікуємо ID Token

  if (!idToken) {
    return NextResponse.json({ success: false, error: 'Authorization token not provided.' }, { status: 401 });
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 днів

  try {
    // Створення сесійного cookie з ID Token
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set({
      name: '__session',
      value: sessionCookie,
      httpOnly: true,
      // Цей рядок коду означає, що cookie буде передаватися лише через захищене з'єднання HTTPS, 
      // але тільки у виробничому середовищі (коли NODE_ENV дорівнює production). 
      // У середовищі розробки (development) це правило не застосовується, щоб дозволити вам працювати на http://localhost.
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: expiresIn,
    });

    return response;
  } catch (error) {
    console.error("Error creating session cookie:", error);
    return NextResponse.json({ success: false, error: 'Failed to create session cookie.' }, { status: 500 });
  }
}