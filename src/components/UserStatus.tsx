// src/components/UserStatus.tsx
'use client';

import { useAuth } from '@/components/AuthContext';

export default function UserStatus() {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading user...</p>;
    }

    if (user) {
        return <p>Currently logged in as: {user.email}</p>;
    }

    return null;
}