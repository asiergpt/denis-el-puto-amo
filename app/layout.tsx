import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Denis, el puto amo',
  description: 'El puto amo ha llegado.',
  openGraph: {
    title: 'Denis, el puto amo',
    description: 'El puto amo ha llegado.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
