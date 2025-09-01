'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function PublicRoute({ children }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user && token) {
      router.replace('/dashboard/buyer');
    } else {
      setIsChecking(false); // Only render children if not logged in
    }
  }, [user, token, router]);

  if (isChecking) return null; // prevent flash

  // If logged in → children never render
  if (user && token) return null;

  return children;
}
