// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      );
    }

    // Use RPC to handle user creation with proper permissions
    const { data: userData, error: userError } = await supabase.rpc('handle_user_auth', {
      user_id: data.user.id,
      user_email: data.user.email
    });

    if (userError) {
      console.error('Error in user authentication flow:', userError);
      return NextResponse.json(
        { error: 'Error during user authentication' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: {
        ...data.user,
        role: userData?.role || 'user',
      },
      session: data.session,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred during login' },
      { status: 500 }
    );
  }
}