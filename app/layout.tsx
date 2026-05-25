import type { Metadata } from 'next'
import { Inter, Give_You_Glory, Foldit, Boldonse } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { site } from '@/lib/content'
import { LenisProvider } from '@/components/lenis-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const giveYouGlory = Give_You_Glory({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-give-you-glory',
  display: 'swap',
});

const foldit = Foldit({
  subsets: ['latin'],
  variable: '--font-foldit',
  display: 'swap',
});

const boldonse = Boldonse({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-boldonse',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
  description: `${site.title} based in ${site.location}. ${site.availability}. Creating cinematic edits, motion graphics, and visual storytelling for brands and creators.`,
  generator: 'v0.app',
  keywords: ['video editor', 'visual artist', 'motion graphics', 'video editing', 'content creator', 'Punjab'],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: 'Creating cinematic edits, motion graphics, and visual storytelling for brands and creators.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${giveYouGlory.variable} ${foldit.variable} ${boldonse.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LenisProvider>
          <div className="grain" aria-hidden="true" />
          {children}
        </LenisProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
