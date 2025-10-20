// src/types/supabase.ts
import { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
}

export interface User extends SupabaseUser {
  role?: UserRole;
}