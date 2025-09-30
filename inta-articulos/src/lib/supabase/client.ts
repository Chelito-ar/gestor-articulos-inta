// src/lib/supabase/client.ts

import { createBrowserClient } from '@supabase/supabase-js';

// Asegura que las variables de entorno existan
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno para Supabase');
}

/**
 * Función para inicializar y devolver el cliente de Supabase para el navegador (cliente).
 * Este cliente se utiliza para todas las interacciones de autenticación y base de datos
 * que ocurren en el front-end.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  );
}