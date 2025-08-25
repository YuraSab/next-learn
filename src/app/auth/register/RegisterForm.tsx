'use client'

import { registerUser } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "", repeatPassword: "" });
    const [statusMessage, setStatusMessage] = useState("");

    const validateForm = () => {
        const newErrors = {
            email: email.trim() ? "" : "An email field can’t be empty!",
            password: password.trim() ? "" : "A password field can’t be empty!",
            repeatPassword: repeatPassword.trim() ? "" : "A repeated password field can’t be empty!",
        };

        if (password !== repeatPassword) {
            newErrors.repeatPassword = "Passwords are different!";
        }

        setError(newErrors);

        return Boolean(!newErrors.email && !newErrors.password && !newErrors.repeatPassword);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            setStatusMessage("Please fix the errors before submitting.");
            return;
        }

        setStatusMessage("Registering...");

        const result = await registerUser(email, password);
        if (result.success) {
            setStatusMessage("Registration successful! Redirecting to login...");
            router.refresh(); // <-- Оновлення клієнтського кешу
            router.push("/auth/login");
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
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}
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
                {error.password && <p style={{ color: "red" }}>{error.password}</p>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {error.repeatPassword && <p style={{ color: "red" }}>{error.repeatPassword}</p>}
            </div>
            <button
                type="submit"
                style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}
            >
                Register
            </button>
            {statusMessage && <p style={{ marginTop: '10px', textAlign: 'center' }}>{statusMessage}</p>}
            <p style={{ textAlign: 'center' }}>
                Already have an account? <Link href="/auth/login">Login</Link>
            </p>
        </form>
    );
}
