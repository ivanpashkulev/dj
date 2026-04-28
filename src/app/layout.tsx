import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DJ Ivan Pashkulev',
  description: 'DJ services in Bansko, Bulgaria',
  openGraph: {
    title: 'DJ Ivan Pashkulev',
    description: 'DJ services in Bansko, Bulgaria',
    type: 'website',
  },
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
