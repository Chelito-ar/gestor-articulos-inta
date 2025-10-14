// src/app/dashboard/page.tsx

import { redirect } from 'next/navigation';
import { getUserRole } from '@/lib/checkRole';

/**
 * Este es un Server Component de Next.js, ideal para lógica de redirección
 * y verificación de roles, ya que se ejecuta antes de renderizar la página.
 */
export default async function DashboardPage() {
  const role = await getUserRole();

  if (role === 'no-autenticado') {
    // Si no está logueado, lo enviamos de vuelta a la página principal de login.
    redirect('/');
  }

  if (role === 'comite') {
    // Redirección al dashboard exclusivo del Comité Editorial
    redirect('/comite/dashboard');
  }

  if (role === 'investigador') {
    // Redirección al dashboard del Investigador (que es la vista por defecto)
    redirect('/investigador/dashboard');
  }
  
  // En caso de que haya un rol desconocido, lo enviamos al login
  redirect('/'); 
}