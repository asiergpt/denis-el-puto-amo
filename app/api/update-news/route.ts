import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

const CRON_SECRET = 'denis2026'

interface NewsItem {
  titulo: string
  fuente: string
  resumen: string
  url: string
  fecha_publicacion: Date | null
}

function extractXmlTag(xml: string, tag: string): string {
  const cdataMatch = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i').exec(xml)
  if (cdataMatch) return cdataMatch[1].trim()
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i').exec(xml)
  return match ? match[1].trim() : ''
}

function parseRssItems(xml: string): NewsItem[] {
  const items: NewsItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    const titulo = extractXmlTag(itemXml, 'title')
    const url = extractXmlTag(itemXml, 'link') || extractXmlTag(itemXml, 'guid')
    const resumen = extractXmlTag(itemXml, 'description')
    const pubDateStr = extractXmlTag(itemXml, 'pubDate')

    if (!titulo || !url) continue

    let fecha_publicacion: Date | null = null
    if (pubDateStr) {
      const d = new Date(pubDateStr)
      if (!isNaN(d.getTime())) fecha_publicacion = d
    }

    items.push({
      titulo,
      fuente: 'Reuters',
      resumen: resumen.replace(/<[^>]+>/g, '').slice(0, 500),
      url,
      fecha_publicacion,
    })
  }

  return items
}

async function fetchCoinGeckoNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/news', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return []
    const data = await res.json() as { data?: Array<{ title?: string; description?: string; url?: string; updated_at?: number }> }
    const articles = data?.data ?? []

    return articles.slice(0, 20).map((a) => ({
      titulo: a.title ?? '',
      fuente: 'CoinGecko',
      resumen: (a.description ?? '').slice(0, 500),
      url: a.url ?? '',
      fecha_publicacion: a.updated_at ? new Date(a.updated_at * 1000) : null,
    })).filter(n => n.titulo && n.url)
  } catch (err) {
    console.error('CoinGecko fetch error:', err)
    return []
  }
}

async function fetchReutersNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('https://feeds.reuters.com/reuters/businessNews', {
      headers: { 'Accept': 'application/rss+xml, application/xml, text/xml' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    return parseRssItems(xml).slice(0, 20)
  } catch (err) {
    console.error('Reuters fetch error:', err)
    return []
  }
}

async function upsertNews(items: NewsItem[]): Promise<number> {
  if (items.length === 0) return 0

  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS denis_noticias (
        id SERIAL PRIMARY KEY,
        titulo TEXT,
        fuente VARCHAR(255),
        resumen TEXT,
        url TEXT UNIQUE,
        fecha_publicacion TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    let inserted = 0
    for (const item of items) {
      if (!item.url) continue
      const result = await client.query(
        `INSERT INTO denis_noticias (titulo, fuente, resumen, url, fecha_publicacion)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (url) DO NOTHING`,
        [item.titulo, item.fuente, item.resumen, item.url, item.fecha_publicacion]
      )
      inserted += result.rowCount ?? 0
    }
    return inserted
  } finally {
    client.release()
  }
}

function isAuthorized(req: NextRequest): boolean {
  const headerSecret = req.headers.get('x-cron-secret')
  const querySecret = new URL(req.url).searchParams.get('secret')
  return headerSecret === CRON_SECRET || querySecret === CRON_SECRET
}

async function handleUpdate(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [coingeckoNews, reutersNews] = await Promise.all([
    fetchCoinGeckoNews(),
    fetchReutersNews(),
  ])

  const allNews = [...coingeckoNews, ...reutersNews]
  const inserted = await upsertNews(allNews)

  return NextResponse.json({
    ok: true,
    fetched: allNews.length,
    inserted,
    sources: {
      coingecko: coingeckoNews.length,
      reuters: reutersNews.length,
    },
  })
}

export async function GET(req: NextRequest) {
  return handleUpdate(req)
}

export async function POST(req: NextRequest) {
  return handleUpdate(req)
}
