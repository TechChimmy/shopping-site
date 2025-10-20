// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred during logout' },
      { status: 500 }
    );
  }
}