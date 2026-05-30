import type { Metadata } from "next"
import { Inter, Give_You_Glory, Foldit, Boldonse } from "next/font/google"
import { getPortfolio } from "@/lib/cms/queries/get-portfolio"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const giveYouGlory = Give_You_Glory({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-give-you-glory",
  display: "swap",
})

const foldit = Foldit({
  subsets: ["latin"],
  variable: "--font-foldit",
  display: "swap",
})

const boldonse = Boldonse({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-boldonse",
  display: "swap",
  adjustFontFallback: false,
})

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getPortfolio()
  return {
    title: site.seo.title,
    description: site.seo.description,
    generator: "v0.app",
    keywords: site.seo.keywords,
    authors: [{ name: site.name }],
    openGraph: {
      title: site.seo.title,
      description: site.seo.ogDescription,
      type: "website",
    },
    icons: {
      icon: [
        {
          url: "/icon-light-32x32.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/icon-dark-32x32.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/icon.svg",
          type: "image/svg+xml",
        },
      ],
      apple: "/apple-icon.png",
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${giveYouGlory.variable} ${foldit.variable} ${boldonse.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased overflow-x-clip" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
