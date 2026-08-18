import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Titan_One, Nunito } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/site-config'

const titan = Titan_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-titan',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `About | ${siteConfig.logoText}`,
  description: siteConfig.hero.body,
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: siteConfig.hero.bg,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${titan.variable} ${nunito.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
