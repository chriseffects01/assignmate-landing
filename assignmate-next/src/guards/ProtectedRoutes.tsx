'use client';

import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, authenticated, isOffline } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (isOffline) return;

    if (!authenticated) {
      router.replace('/auth/login');
    }
  }, [authenticated, loading, router, isOffline]);

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return null;
  }

  // console.log('Protected routes checking the stuffff:', {
  //   loading,
  //   authenticated,
  //   isOffline,
  // });

  return <>{children}</>;
}
