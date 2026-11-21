import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import Navbar from "@/components/Navbar"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })

export const metadata: Metadata = {
  title: "Movizz — Trouve ton prochain film",
  description: "Recherche, découvre et garde tes films préférés sous la main.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="font-sans antialiased">
        {/* Navbar affichée sur toutes les pages */}
        <Navbar />

        {/* Contenu de chaque page */}
        <main className="mx-auto max-w-6xl px-6 pb-20">{children}</main>
      </body>
    </html>
  )
}
