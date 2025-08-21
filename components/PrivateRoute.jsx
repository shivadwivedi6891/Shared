'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const { user,token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
    }
  }, [user, router]);

  return user ? <>{children}</> : null;
}
