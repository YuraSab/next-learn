'use server';

import { auth } from "@/config/firebase";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { revalidatePath } from "next/cache";
import { auth as adminAuth } from '@/lib/firebaseAdmin'; // Імпорт адміністраторського SDK

type SimpleSuccessResult = {
    success: true,
}
type ErrorResult = {
    success: false,
    error: string,
}
type AuthPromiseType = Promise<SimpleSuccessResult | ErrorResult>;

export async function registerUser(email: string, password: string): AuthPromiseType {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Отримання idToken
        const idToken = await user.getIdToken();

        // Відправка idToken на Route Handler для створення сесії
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to create session on server after registration.');
        }

        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: (error as Error).message 
                ? (error as Error).message 
                : 'An unknown error occurred.' 
        };
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Отримання ID Token користувача, який потрібен для створення сесійного файлу cookie
        // По суті idToken це локальне значення, яке ми отриуємо саме для цієї конкретної сесії, цього пристрою і тд. 
        // Воно саме по собі зберігається десь годину, тому ми збрігаємо його в куках на 5 днів (або на стільки скільки треба)
        const idToken = await user.getIdToken();

        // Генерація кастомного токена, який потрібен для клієнтського входу
        // Він створюється вашим сервером динамічно, кожного разу, коли ви викликаєте adminAuth.createCustomToken(user.uid). 
        // Він генерується та підписується з використанням вашого ключа сервісного облікового запису. 
        // Це одноразовий токен, який клієнт використовує для входу, після чого він стає недійсним.
        const customToken = await adminAuth.createCustomToken(user.uid);

        // Відправка ID Token до API-маршруту для створення сесійного файлу cookie
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: idToken }), // Надсилаємо ID Token!
        });

        if (!response.ok) {
            throw new Error('Failed to create session on server.');
        }

        revalidatePath('/');
        
        // Повертаємо кастомний токен для клієнтського входу
        return { success: true, customToken: customToken }; 
    } catch (error: any) {
        console.error("Error during login:", error);
        return { success: false, error: error.message };
    }
}



export async function logoutUser(): AuthPromiseType {
    try {
        await signOut(auth);

        // Видалення сесії на сервері
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to log out on server.');
        }

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: (error as Error).message 
                ? (error as Error).message 
                : 'An unknown error occurred.' 
        };
    }
}