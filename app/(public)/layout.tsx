import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LenisProvider>
      <div className="grain" aria-hidden="true" />
      {children}
      {process.env.NODE_ENV === "production" && <Analytics />}
    </LenisProvider>
  )
}
