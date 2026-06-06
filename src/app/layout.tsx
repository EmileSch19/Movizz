import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Navbar from "@/components/Navbar"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Movizz",
  description: "Ta filmographie personnelle",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={geist.className}>

        {/* Navbar affichée sur toutes les pages */}
        <Navbar />

        {/* Contenu de chaque page */}
        <main className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </main>

      </body>
    </html>
  )
}