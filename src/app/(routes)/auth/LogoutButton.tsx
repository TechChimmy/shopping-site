// src/app/(routes)/auth/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUser } from '@/hooks/use-user';

export function LogoutButton() {
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      // Immediately clear the user state for better UX
      setUser(null);
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      toast.success('Logged out successfully!');
      
      // Force clear any cached data
      window.localStorage.clear();
      window.sessionStorage.clear();
      
      // Redirect to login and force a full page reload to clear all states
      window.location.href = '/auth/login';
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'An error occurred during logout');
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      className="hover:bg-destructive/10 hover:text-destructive"
    >
      Logout
    </Button>
  );
}