import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

// src/app/page.tsx - MAD agregado

'use client'; // Indica que este es un componente de cliente (necesita interactividad)

import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  /**
   * Maneja el clic en el botón de Google.
   * Redirige al usuario a la página de login de Google.
   */
  const handleLogin = async () => {
    // Aquí definimos la URL a la que Google debe redirigir después de iniciar sesión.
    // Usamos la URL actual de tu proyecto (que Vercel te dará)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Usamos una página de callback
        // Scopes necesarios para Google (puedes agregar más si necesitas, ej. email)
        scopes: 'email',
      },
    });

    if (error) {
      console.error('Error al iniciar sesión con Google:', error);
      alert('Hubo un error al intentar iniciar sesión.');
    }
    // Supabase se encarga de la redirección.
  };

  /**
   * Efecto para verificar si el usuario ya está logueado y redirigirlo.
   */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Si hay una sesión activa, redirigir al Dashboard principal
        router.push('/dashboard'); 
      }
    });
  }, [router, supabase]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Plataforma INTA: Acceso
        </h1>
        <p className="text-gray-600 mb-6">
          Inicia sesión con tu cuenta de Google para continuar.
        </p>
        
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition duration-150"
        >
          {/* Aquí podrías poner un ícono de Google */}
          <span className="mr-3 text-lg">G</span>
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
}
