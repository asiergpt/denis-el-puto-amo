import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { nombre, apellido, empresa } = body as Record<string, unknown>

  if (
    typeof nombre !== 'string' || !nombre.trim() ||
    typeof apellido !== 'string' || !apellido.trim() ||
    typeof empresa !== 'string' || !empresa.trim()
  ) {
    return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 })
  }

  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS denis_registros (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        empresa VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    const result = await client.query(
      'INSERT INTO denis_registros (nombre, apellido, empresa) VALUES ($1, $2, $3) RETURNING id',
      [nombre.trim(), apellido.trim(), empresa.trim()]
    )

    return NextResponse.json({ ok: true, id: result.rows[0].id }, { status: 201 })
  } catch (err) {
    console.error('DB error:', err)
    return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 })
  } finally {
    client.release()
  }
}
