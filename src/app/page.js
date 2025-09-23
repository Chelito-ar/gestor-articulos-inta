'use client'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error('Error al iniciar sesión:', error.message)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>Bienvenido al Gestor de Artículos</h1>
      <p>Por favor, iniciá sesión para continuar.</p>
      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Iniciar sesión con Google
      </button>
    </div>
  )
}