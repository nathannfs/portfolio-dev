import "./globals.css"

import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import { Header } from "@/components/header"
import { BackToTop } from "@/components/motion/back-to-top"
import { CustomCursor } from "@/components/motion/custom-cursor"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SkipLink } from "@/components/skip-link"
import { structuredData } from "@/lib/structured-data"

import Providers from "./providers"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const SITE_DESCRIPTION =
  "Full-stack engineer working with TypeScript end to end: NestJS and Node on the API, Next.js and React on the interface, PostgreSQL underneath. I build multi-tenant SaaS at OMD do Brasil and on my own."

export const metadata: Metadata = {
  title: "Nathan Ferreira Santos | Full-Stack Software Engineer",
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://www.nathannfs.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    title: "Nathan Ferreira Santos | Full-Stack Software Engineer",
    description: SITE_DESCRIPTION,
    url: "https://www.nathannfs.com/",
    siteName: "Nathan Ferreira Santos · Full-Stack Software Engineer",
    images: [
      {
        url: "/nathan.jpeg",
        width: 800,
        height: 800,
        alt: "Nathan Ferreira Santos · Full-Stack Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan Ferreira Santos | Full-Stack Software Engineer",
    description: SITE_DESCRIPTION,
    site: "@nathannfs",
    creator: "@nathannfs",
    images: ["/nathan.jpeg"],
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/icon.png",
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Nathan Ferreira Santos · Full-Stack Software Engineer",
  generator: "Next.js",
  keywords: [
    "Nathan Ferreira Santos",
    "Full Stack Engineer",
    "Software Engineer",
    "TypeScript",
    "NestJS",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Drizzle ORM",
    "Multi-tenant SaaS",
    "Row Level Security",
    "Docker",
  ],
  authors: [{ name: "Nathan Ferreira Santos", url: "https://www.nathannfs.com" }],
  creator: "Nathan Ferreira Santos",
  publisher: "Nathan Ferreira Santos",
  category: "technology",
  other: {
    "mobile-web-app-capable": "yes",
    copyright: "© 2026 Nathan Ferreira Santos",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge([
          geistSans.variable,
          geistMono.variable,
          "bg-zinc-50 font-sans text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50",
        ])}
      >
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
        <Providers>
          <SkipLink />
          <SmoothScroll>
            <CustomCursor />
            <Header />
            <main className="pt-[80px]" id="main-content">
              {children}
            </main>
            <BackToTop />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  )
}
