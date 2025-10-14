// src/lib/supabase/server.ts

import { createServerClient, ReadonlyRequestCookies } from '@supabase/supabase-js';

// Función para crear un cliente Supabase que se ejecuta en el servidor (Server Components)
export function createSupabaseServerClient(cookieStore: ReadonlyRequestCookies) {
  // Las variables de entorno ya están disponibles, pero se cargan de forma segura
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
      },
    }
  );
}