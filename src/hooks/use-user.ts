// src/hooks/use-user.ts
import { useEffect, useState, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@/types/supabase';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  const fetchUserData = useCallback(async (userId: string) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }, [supabase]);

  const updateUserSession = useCallback(async (session: any) => {
    try {
      if (session?.user) {
        const userData = await fetchUserData(session.user.id);
        if (userData) {
          setUser({
            ...session.user,
            role: userData.role || 'user',
            email: userData.email || session.user.email,
          });
        } else {
          // If user data doesn't exist, create it
          const { data: newUser, error } = await supabase
            .from('users')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                role: 'user',
                created_at: new Date().toISOString(),
              },
            ])
            .select()
            .single();

          if (error) throw error;
          
          setUser({
            ...session.user,
            role: newUser.role,
            email: newUser.email,
          });
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error updating user session:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserData, supabase]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await updateUserSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await updateUserSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}