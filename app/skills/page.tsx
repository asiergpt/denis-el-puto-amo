import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills — Denis, el puto amo',
  description: 'Por qué esto es lo mejor del mercado.',
}

const skills = [
  {
    emoji: '🛒',
    name: 'Pricewatcher',
    description: 'Comparador de precios en tiempo real. Mercadona, Dia, BM, Eroski y más — todo indexado, todo buscable.',
  },
  {
    emoji: '💻',
    name: 'Coding Agent',
    description: 'Crea webs, apps y código con Claude Code/Codex en segundos. De idea a producción sin fricción.',
  },
  {
    emoji: '🗄️',
    name: 'SQL Toolkit',
    description: 'Consultas y gestión de bases de datos desde el chat. SQLite, PostgreSQL, Neon — sin cliente, sin configuración.',
  },
  {
    emoji: '📧',
    name: 'AgentMail',
    description: 'Email programático sin IMAP ni SMTP. Envía, lee y organiza correos con una instrucción en lenguaje natural.',
  },
  {
    emoji: '🐙',
    name: 'GitHub',
    description: 'Gestión de repos, PRs e issues desde el chat. Revisa, fusiona y despliega sin salir de Telegram.',
  },
  {
    emoji: '🌤️',
    name: 'Weather',
    description: 'Clima y pronósticos instantáneos para cualquier ciudad del mundo. Temperatura, lluvia, viento — al momento.',
  },
  {
    emoji: '🌐',
    name: 'Agent Browser',
    description: 'Navegación web automatizada. El agente abre, lee, interactúa y extrae datos de cualquier web por ti.',
  },
  {
    emoji: '📄',
    name: 'Summarize',
    description: 'Resúmenes de URLs, PDFs, vídeos de YouTube y archivos de audio. Convierte horas de contenido en minutos.',
  },
  {
    emoji: '🔍',
    name: 'Blogwatcher',
    description: 'Monitorización de blogs y feeds RSS. Recibe alertas cuando aparece contenido nuevo en tus fuentes favoritas.',
  },
  {
    emoji: '🏥',
    name: 'Healthcheck',
    description: 'Auditoría de seguridad del servidor en tiempo real. Detecta vulnerabilidades y anomalías antes de que sean un problema.',
  },
]

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-yellow-500/5 blur-[140px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-600/3 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/3 blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-yellow-500/10">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.6))' }}>👑</span>
          <span className="text-sm font-black tracking-widest uppercase text-gold-gradient">Denis</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
          >
            Inicio
          </Link>
          <span
            className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-lg"
            style={{
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.3)',
              color: '#fbbf24',
            }}
          >
            Skills
          </span>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Page header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-yellow-500/50 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Infraestructura de IA personal</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight uppercase mb-4">
            <span className="text-gold-gradient">Por qué esto es</span>
            <br />
            <span className="text-white">lo mejor del mercado</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-yellow-500/40" />
            <span className="text-yellow-500/40 text-xs tracking-[0.4em] uppercase font-semibold">10 herramientas. 1 agente.</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-yellow-500/40" />
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(251,191,36,0.15)',
                boxShadow: '0 0 30px rgba(251,191,36,0.04), inset 0 1px 0 rgba(251,191,36,0.08)',
                animationDelay: `${i * 60}ms`,
              }}
            >
              <div
                className="text-4xl mb-4 inline-block"
                style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.5))' }}
              >
                {skill.emoji}
              </div>
              <h3 className="text-lg font-black tracking-wide uppercase mb-2 text-gold-gradient">
                {skill.name}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Epic closing section */}
        <div
          className="rounded-3xl p-10 sm:p-14 text-center"
          style={{
            background: 'linear-gradient(145deg, rgba(251,191,36,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(251,191,36,0.25)',
            boxShadow: '0 0 60px rgba(251,191,36,0.08), inset 0 1px 0 rgba(251,191,36,0.15)',
          }}
        >
          <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.8))' }}>🏆</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase mt-6 mb-8">
            <span className="text-white">¿Por qué lo que ha montado</span>
            <br />
            <span className="text-gold-gradient">Asier es lo mejor?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10 max-w-4xl mx-auto">
            {[
              {
                icon: '📱',
                title: 'Asistente personal 24/7',
                body: 'Conectado a Telegram en todo momento. Manda un mensaje y la IA actúa — sin apps, sin interfaz, sin fricción. El asistente más potente en tu bolsillo.',
              },
              {
                icon: '🚀',
                title: 'Deploy de webs en minutos',
                body: 'De cero a Next.js + Neon + Vercel en producción. Esta misma web se montó así. No es un demo — es infraestructura real desplegada al instante.',
              },
              {
                icon: '🛒',
                title: 'Base de datos épica',
                body: 'Más de 20.000 productos de supermercados indexados. Precios en tiempo real de Mercadona, Dia, BM y Eroski. Comparación instantánea que ninguna app del mercado ofrece.',
              },
              {
                icon: '⚡',
                title: 'Automatización total',
                body: 'Emails enviados, código generado, datos extraídos, webs desplegadas — todo desde una conversación. Lo que antes tardaba horas, ahora tarda segundos.',
              },
              {
                icon: '🏗️',
                title: 'Stack moderno y escalable',
                body: 'Construido desde cero con las mejores herramientas: Next.js, TypeScript, Neon PostgreSQL, Vercel, Claude AI. Nada de legacy, nada de parches — todo diseñado para escalar.',
              },
              {
                icon: '🧠',
                title: 'No es un chatbot. Es infraestructura.',
                body: 'Cualquiera puede usar ChatGPT. Esto es diferente: un agente de IA conectado a herramientas reales, bases de datos reales, servicios reales. Infraestructura de IA personal de nivel enterprise.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(251,191,36,0.1)',
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-black text-sm tracking-wider uppercase text-yellow-400 mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-yellow-500/40" />
            <span className="text-yellow-500/60 text-xs tracking-[0.4em] uppercase font-semibold">Esto no tiene competencia</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-yellow-500/40" />
          </div>

          <Link
            href="/"
            className="btn-gold inline-block rounded-xl px-8 py-4 text-sm tracking-widest uppercase font-black"
          >
            Unirme al olimpo 👑
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-white/15 text-xs mt-12 tracking-widest uppercase">
          Denis &copy; {new Date().getFullYear()} — El puto amo para siempre
        </p>
      </div>
    </main>
  )
}
