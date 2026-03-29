import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

export async function GET() {
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

    const result = await client.query(
      'SELECT id, titulo, fuente, resumen, url, fecha_publicacion FROM denis_noticias ORDER BY fecha_publicacion DESC NULLS LAST LIMIT 20'
    )

    return NextResponse.json({ ok: true, noticias: result.rows })
  } catch (err) {
    console.error('DB error:', err)
    return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 })
  } finally {
    client.release()
  }
}
