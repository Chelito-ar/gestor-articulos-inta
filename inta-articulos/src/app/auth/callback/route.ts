// src/app/auth/callback/route.ts
// Esta es una Route Handler de Next.js. Se ejecuta en el servidor.

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Esta función maneja la redirección después del login de Google
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code'); // Obtenemos el código de Google

  if (code) {
    const cookieStore = cookies();
    // Creamos un cliente que usa las cookies para mantener la sesión
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Intercambia el código de Google por una sesión de Supabase
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirige al usuario al dashboard principal (donde chequeará su rol)
  return NextResponse.redirect(requestUrl.origin + '/dashboard');
}