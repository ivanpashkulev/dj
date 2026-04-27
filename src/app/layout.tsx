import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DJ Ivan Pashkulev - Bansko',
  description: 'Professional DJ services in Bansko, Bulgaria. Book now for your event.',
  keywords: ['DJ', 'Bansko', 'Bulgaria', 'music', 'events', 'weddings', 'parties'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
