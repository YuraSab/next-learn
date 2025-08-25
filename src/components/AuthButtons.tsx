'use client';

import { useAuth } from '@/components/AuthContext';
import { logoutUser } from '@/actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthButtons = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>; // Відображаємо стан завантаження
  }

  const handleLogOut = async () => {
    const result = await logoutUser();
    if (result.success) {
      router.push('/auth/login'); // Перенаправлення на сторінку входу після виходу
    } else {
      console.error("Logout failed:", result.error);
    }
  };

  if (user) {
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <p>Hello, {user.email}</p>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Link href="/auth/login">
        <button>Log In</button>
      </Link>
      <Link href="/auth/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default AuthButtons;