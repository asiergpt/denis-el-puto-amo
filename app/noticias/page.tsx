import Link from 'next/link'

interface Noticia {
  id: number
  titulo: string
  fuente: string
  resumen: string
  url: string
  fecha_publicacion: string | null
}

async function getNoticias(): Promise<Noticia[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/noticias`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.noticias ?? []
  } catch {
    return []
  }
}

export default async function NoticiasPage() {
  const noticias = await getNoticias()

  return (
    <main className="min-h-screen bg-black flex flex-col items-center px-4 py-16 relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 border-b border-yellow-500/10"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl" style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.6))' }}>👑</span>
          <span className="text-xs font-black tracking-widest uppercase text-gold-gradient">Denis</span>
        </Link>
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
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.4)',
              color: 'rgba(251,191,36,0.9)',
            }}
          >
            Noticias ◈
          </Link>
        </div>
      </nav>

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-yellow-500/4 blur-[140px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-600/3 blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto mt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-4xl" style={{ filter: 'drop-shadow(0 0 16px rgba(251,191,36,0.7))' }}>📰</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase mb-3">
            <span className="text-gold-gradient">Noticias Cripto</span>
          </h1>
          <p className="text-white/30 text-sm tracking-[0.3em] uppercase font-semibold">&amp; Mercados</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-yellow-500/50" />
            <span className="text-yellow-500/40 text-xs tracking-[0.3em] uppercase">Actualizado diariamente</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
        </div>

        {/* News list */}
        {noticias.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(251,191,36,0.15)',
            }}
          >
            <div className="text-3xl mb-4">⏳</div>
            <p className="text-yellow-500/60 text-sm tracking-widest uppercase font-semibold">
              Actualizando noticias... vuelve pronto
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {noticias.map((noticia) => (
              <article
                key={noticia.id}
                className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(251,191,36,0.15)',
                  boxShadow: '0 0 20px rgba(251,191,36,0.04)',
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span
                    className="shrink-0 text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(251,191,36,0.1)',
                      border: '1px solid rgba(251,191,36,0.25)',
                      color: 'rgba(251,191,36,0.8)',
                    }}
                  >
                    {noticia.fuente}
                  </span>
                  {noticia.fecha_publicacion && (
                    <time className="text-white/20 text-xs shrink-0 mt-1">
                      {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </time>
                  )}
                </div>

                <h2 className="text-white/90 font-bold text-base leading-snug mb-2">
                  {noticia.titulo}
                </h2>

                {noticia.resumen && (
                  <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-3">
                    {noticia.resumen}
                  </p>
                )}

                {noticia.url && (
                  <a
                    href={noticia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 hover:gap-2.5"
                    style={{ color: 'rgba(251,191,36,0.7)' }}
                  >
                    Leer artículo
                    <span>→</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white/15 text-xs mt-12 tracking-widest uppercase">
          Denis &copy; {new Date().getFullYear()} — El puto amo para siempre
        </p>
      </div>
    </main>
  )
}
