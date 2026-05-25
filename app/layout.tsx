import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import PeacockTransition from '@/components/PeacockTransition'
import { AuthProvider } from '@/lib/AuthContext'
import BackendKeepAlive from '@/components/BackendKeepAlive'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mayura Tours - Explore Sri Lanka Like Never Before',
  description: 'Crafting bespoke Sri Lankan journeys with a commitment to luxury, authenticity, and sustainable exploration.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background">
        <AuthProvider>
          <BackendKeepAlive />
          <PeacockTransition />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AuthProvider>
      </body>
    </html>
  )
}
