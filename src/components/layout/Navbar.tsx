// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { LogoutButton } from '@/app/(routes)/auth/LogoutButton';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';

export function Navbar() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <nav className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          {user?.role === 'admin' ? 'Admin Panel' : 'My Account'}
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                className="text-sm font-medium hover:underline"
              >
                {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
              </Link>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}