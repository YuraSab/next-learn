// src/app/login/page.tsx
'use client';

import { loginUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/config/firebase'; // Клієнтський SDK
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setStatusMessage("Logging in...");

        const result = await loginUser(email, password);
        if (result.success, result.customToken) {
            // Використовуємо кастомний токен для входу на клієнті
            await signInWithCustomToken(auth, result.customToken);

            setStatusMessage("Login successful!");
            router.refresh();
            router.push("/");
        } else {
            setStatusMessage(`Error: ${result.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <button
                type="submit"
                style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}
            >
                Login
            </button>
            {statusMessage && <p style={{ marginTop: '10px', textAlign: 'center' }}>{statusMessage}</p>}
            <p style={{ textAlign: 'center' }}>
                Don't have an account? <Link href="/auth/register">Register</Link>
            </p>
        </form>
    );
}