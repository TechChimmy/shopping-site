'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to dashboard based on user role
      const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      router.push(dashboardPath);
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // If user is not logged in, show welcome page
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
        <Card className="p-8 w-full max-w-lg text-center shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Welcome to E-Commerce Testing Platform</h1>
          <p className="mb-6 text-gray-600">
            Your sandbox e-commerce platform with Supabase authentication.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button variant="default">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // This will be shown very briefly before the redirect happens
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Redirecting to your dashboard...</div>
    </div>
  );
}
