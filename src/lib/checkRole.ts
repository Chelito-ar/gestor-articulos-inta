// src/lib/checkRole.ts

import { createSupabaseServerClient } from './supabase/server';
import { cookies } from 'next/headers';

type UserRole = 'investigador' | 'comite' | 'no-autenticado';

/**
 * Consulta la base de datos para obtener el rol del usuario autenticado.
 * Si el usuario no tiene un perfil, se considera "investigador" por defecto
 * (tú debes crearle el perfil con el rol correcto después del primer login).
 */
export async function getUserRole(): Promise<UserRole> {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  // 1. Obtener la sesión actual
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return 'no-autenticado';
  }

  // 2. Obtener el perfil del usuario de la tabla 'perfiles'
  const { data: profile, error } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', session.user.id)
    .single();

  if (error || !profile) {
    // Si hay un error o no tiene perfil, lo tratamos como investigador por defecto
    // NOTA: Es crucial que después del primer login se cree una entrada en 'perfiles'
    // con el rol correcto ('investigador' o 'comite')
    console.warn(`Usuario ${session.user.id} no tiene perfil, asumiendo 'investigador'.`);
    return 'investigador';
  }

  // 3. Devolver el rol
  return profile.rol as UserRole;
}