import "./globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import { Header } from "@/components/header"
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

export const metadata: Metadata = {
  title: "Nathan Santos | Mid-Level Product Engineer",
  description:
    "Product Engineer specializing in TypeScript, Next.js, and scalable SaaS architecture. Building products that ship fast and scale to millions.",
  metadataBase: new URL("https://www.nathannfs.com"),
  openGraph: {
    title: "Nathan Santos | Mid-Level Product Engineer",
    description:
      "Product Engineer specializing in TypeScript, Next.js, and scalable SaaS architecture. Building products that ship fast and scale to millions.",
    url: "https://www.nathannfs.com",
    siteName: "Nathan Santos — Product Engineer",
    images: [
      {
        url: "/nathan.jpeg",
        width: 800,
        height: 800,
        alt: "Nathan Santos — Mid-Level Product Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nathan Santos | Mid-Level Product Engineer",
    description:
      "Product Engineer specializing in TypeScript, Next.js, and scalable SaaS architecture.",
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
  applicationName: "Nathan Santos — Product Engineer",
  generator: "Next.js",
  keywords: [
    "Nathan Santos",
    "Product Engineer",
    "Mid-Level Developer",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Supabase",
    "SaaS Architecture",
    "Full Stack Engineer",
    "Frontend",
    "Backend",
    "Web Developer",
    "React 19",
    "Tailwind CSS",
  ],
  authors: [{ name: "Nathan Santos", url: "https://www.nathannfs.com" }],
  creator: "Nathan Santos",
  publisher: "Nathan Santos",
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="#0ea5e9" name="theme-color" />
        <link href="https://www.nathannfs.com/" rel="canonical" />
        <meta content="Nathan Santos" name="author" />
        <link href="/manifest.json" rel="manifest" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="strict-origin-when-cross-origin" name="referrer" />
        <meta content="© 2025 Nathan Santos" name="copyright" />
      </head>
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
        <a
          className="sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:font-medium focus:text-foreground focus:shadow-md focus:ring-2 focus:ring-sky-500 focus:not-sr-only"
          href="#main-content"
        >
          Ir ao conteúdo principal
        </a>
        <Providers>
          <Header />
          <main className="pt-[80px]" id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
