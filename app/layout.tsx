import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/contexts/CartContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Toaster } from "@/components/ui/toaster"
import PrivyProvider  from "./providers/PrivyProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NFT Merch Store",
  description: "Exclusive merchandise inspired by NFT art",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <CartProvider>
          <PrivyProvider>
          <body className={inter.className}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </body>
          </PrivyProvider>
        </CartProvider>
      </ThemeProvider>
    </html>
  )
}

