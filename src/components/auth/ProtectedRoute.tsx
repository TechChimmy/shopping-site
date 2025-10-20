// src/components/auth/ProtectedRoute.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export function ProtectedRoute({ children, requiredRole = 'admin' }: ProtectedRouteProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const redirect = encodeURIComponent(window.location.pathname);
        router.push(`/auth/login?redirect=${redirect}`);
        toast.error('Please log in to access this page');
      } else if (requiredRole === 'admin' && user.role !== 'admin') {
        router.push('/');
        toast.error('You do not have permission to access this page');
      }
    }
  }, [user, isLoading, router, requiredRole]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (requiredRole === 'admin' && user.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
}