'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [form, setForm] = useState({ nombre: '', apellido: '', empresa: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error desconocido')

      setStatus('success')
      setMessage('Registrado en la leyenda. El puto amo te ha visto.')
      setForm({ nombre: '', apellido: '', empresa: '' })
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Algo salió mal.')
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 border-b border-yellow-500/10">
        <div className="flex items-center gap-2">
          <span className="text-xl" style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.6))' }}>👑</span>
          <span className="text-xs font-black tracking-widest uppercase text-gold-gradient">Denis</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/skills"
            className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.2)',
              color: 'rgba(251,191,36,0.7)',
            }}
          >
            Ver skills ✦
          </Link>
          <Link
            href="/noticias"
            className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.2)',
              color: 'rgba(251,191,36,0.7)',
            }}
          >
            Noticias ◈
          </Link>
        </div>
      </nav>
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-yellow-500/5 blur-[120px]" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-yellow-600/3 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/3 blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Crown / icon */}
        <div className="text-center mb-4 animate-fade-in-up">
          <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.8))' }}>
            👑
          </span>
        </div>

        {/* Main title */}
        <div className="text-center mb-3 opacity-0 animate-fade-in-up delay-100">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none uppercase">
            <span className="text-gold-gradient">Denis</span>
          </h1>
        </div>

        <div className="text-center mb-2 opacity-0 animate-fade-in-up delay-200">
          <p className="text-white/30 text-xl sm:text-2xl font-semibold tracking-[0.3em] uppercase">
            — el —
          </p>
        </div>

        <div className="text-center mb-10 opacity-0 animate-fade-in-up delay-300">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none uppercase">
            <span className="text-gold-gradient">Puto Amo</span>
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-yellow-500/60" />
            <span className="text-yellow-500/60 text-xs tracking-[0.4em] uppercase font-semibold">Est. desde siempre</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-yellow-500/60" />
          </div>
        </div>

        {/* Form card */}
        <div
          className="opacity-0 animate-fade-in-up delay-400 rounded-2xl p-8 sm:p-10"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(251,191,36,0.2)',
            boxShadow: '0 0 40px rgba(251,191,36,0.08), inset 0 1px 0 rgba(251,191,36,0.1)',
          }}
        >
          <p className="text-center text-white/40 text-sm tracking-widest uppercase mb-8 font-semibold">
            Regístrate en el olimpo
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-yellow-500/70 tracking-widest uppercase mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                className="input-gold w-full rounded-xl px-4 py-3.5 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-yellow-500/70 tracking-widest uppercase mb-2">
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Tu apellido"
                required
                className="input-gold w-full rounded-xl px-4 py-3.5 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-yellow-500/70 tracking-widest uppercase mb-2">
                Empresa
              </label>
              <input
                type="text"
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                placeholder="Tu empresa"
                required
                className="input-gold w-full rounded-xl px-4 py-3.5 text-sm font-medium"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-gold w-full rounded-xl py-4 text-sm tracking-widest uppercase"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  'Unirme al olimpo'
                )}
              </button>
            </div>

            {/* Status message */}
            {status === 'success' && (
              <div className="rounded-xl px-4 py-3 text-center text-sm font-semibold"
                style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
                👑 {message}
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-xl px-4 py-3 text-center text-sm font-semibold"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/15 text-xs mt-8 tracking-widest uppercase">
          Denis &copy; {new Date().getFullYear()} — El puto amo para siempre
        </p>
      </div>
    </main>
  )
}
