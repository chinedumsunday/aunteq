// components/Header.tsx

"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePrivy } from '@privy-io/react-auth'
import { RefObject } from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import MegaMenu from "./MegaMenu"
import CartSidebar from "./CartSidebar"
import { useTheme } from "@/contexts/ThemeContext"
import { useClickOutside } from "@/hooks/use-click-outside"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = [
  { name: "T-Shirts", path: "/marketplace", filter: "tshirts" },
  { name: "Hoodies", path: "/marketplace", filter: "hoodies" },
  { name: "Accessories", path: "/marketplace", filter: "accessories" },
]

const inter = Inter({ subsets: ["latin"] })

const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`

export default function Header() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { user, login, logout, authenticated } = usePrivy()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const walletAddress = user?.wallet?.address ?? "";


  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const categoryMenuRef = useRef<HTMLDivElement>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)

  useClickOutside(searchRef as unknown as RefObject<HTMLElement>, () => setIsSearchExpanded(false))
  useClickOutside(userMenuRef as unknown as RefObject<HTMLElement>, () => {})
  useClickOutside(categoryMenuRef as unknown as RefObject<HTMLElement>, () => setIsCategoryMenuOpen(false))
  useClickOutside(megaMenuRef as unknown as RefObject<HTMLElement>, () => setActiveMegaMenu(null))

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchExpanded(false)
    }
  }

  const handleCategoryClick = (filter: string) => {
    router.push(`/marketplace?category=${filter}`)
    setIsCategoryMenuOpen(false)
  }

  const toggleMegaMenu = (menu: string) => {
    setActiveMegaMenu(prev => (prev === menu ? null : menu))
  }

  return (
    <header className="bg-background sticky top-0 z-50 transition-colors duration-300">
      {/* Announcement Bar */}
      <div className="bg-accent text-accent-foreground text-center py-2 text-sm">
        <p>FREE SHIPPING ON ORDERS OVER $50 | NFT HOLDERS GET 15% OFF</p>
      </div>

      {/* Main Header */}
      <div className="border-b border-muted shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-3xl text-primary neon-text"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Aunteq
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">
              <Link href="/marketplace" className="py-2 block hover:text-primary font-medium">ALL</Link>

              {/* Categories */}
              <div className="relative" ref={categoryMenuRef}>
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  className="flex items-center gap-1 py-2 hover:text-primary font-medium"
                >
                  CATEGORIES
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isCategoryMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 w-48 mt-2 bg-card rounded-md shadow-lg py-1 z-50"
                    >
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => handleCategoryClick(category.filter)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                        >
                          {category.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className={`py-2 hover:text-primary font-medium ${activeMegaMenu === "collections" ? "text-primary border-b-2 border-primary" : ""}`}
                onClick={() => toggleMegaMenu("collections")}
              >
                COLLECTIONS
              </button>

              <Link href="/artists" className="py-2 block hover:text-primary font-medium">ARTISTS</Link>
              <Link href="/sale" className="py-2 block text-destructive font-bold">SALE</Link>
              <Link href="/rewards" className="py-2 block hover:text-primary font-medium">REWARDS</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:block relative" ref={searchRef}>
                <AnimatePresence>
                  {isSearchExpanded ? (
                    <motion.form
                      initial={{ width: 40, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 40, opacity: 0 }}
                      onSubmit={handleSearch}
                      className="relative"
                    >
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pr-10 bg-muted text-foreground"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3">
                        <Search className="h-4 w-4" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.button
                      onClick={() => setIsSearchExpanded(true)}
                      className="p-2 rounded-full hover:bg-muted"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Search className="h-5 w-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* User Menu (Connect Wallet + Dropdown) */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      {authenticated ? (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{String(user?.email ?? "").charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                  {authenticated && user?.wallet?.address ? (
                      <>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium flex items-center gap-2">
                            {user?.wallet?.address ? shortenAddress(user.wallet.address) : ""}
                            <button
                              onClick={() => {
                                if (user?.wallet?.address[0]) {
                                  navigator.clipboard.writeText(user.wallet.address)
                                }
                              }}
                              className="text-muted-foreground hover:text-primary"
                            >
                              📋
                            </button>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {user?.email?.address ? String(user.email.address) : "User"}
                            </span>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/seller/register">Become a seller</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={async () => {
                            logout()
                            router.push("/")
                          }}
                          className="text-destructive"
                        >
                          Logout
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault()
                          login()
                        }}
                      >
                        Connect Wallet
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-primary text-primary-foreground">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* MegaMenu */}
        {activeMegaMenu && <MegaMenu category={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card border-b border-muted overflow-hidden"
          >
            <div className="p-4">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative w-full">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pr-10 bg-muted text-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Mobile navigation */}
              <nav className="mb-6">
                <h3 className="text-xs uppercase text-muted-foreground font-semibold mb-3">Shop</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/marketplace" className="block py-2 text-base">
                      All Products
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => {
                          handleCategoryClick(category.filter)
                          setIsMobileMenuOpen(false)
                        }}
                        className="block py-2 text-base w-full text-left"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                  <li>
                    <Link href="/collections" className="block py-2 text-base">
                      Collections
                    </Link>
                  </li>
                  <li>
                    <Link href="/artists" className="block py-2 text-base">
                      Artists
                    </Link>
                  </li>
                  <li>
                    <Link href="/sale" className="block py-2 text-base text-destructive font-bold">
                      Sale
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Mobile account */}
              <div className="mb-6">
                <h3 className="text-xs uppercase text-muted-foreground font-semibold mb-3">Account</h3>
                <ul className="space-y-2">
                {authenticated && user?.wallet?.address ? (
                  <>
                    <li className="flex items-center gap-2 py-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>W</AvatarFallback>
                      </Avatar>
                      <span className="text-sm truncate flex items-center gap-2">
                      {walletAddress && shortenAddress(walletAddress)}
                      <button
                        onClick={() => {
                          if (walletAddress) {
                            navigator.clipboard.writeText(walletAddress)
                          }
                        }}
                        className="text-muted-foreground hover:text-primary"
                      >
                        📋
                      </button>
                      </span>
                    </li>
                    <li>
                      <Link href="/account/profile" className="block py-2 text-base">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block py-2 text-base w-full text-left text-destructive"
                        onClick={async () => {
                          logout();
                          router.push('/');
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          login();
                        }}
                        className="block w-full text-left py-2 text-base"
                      >
                        Connect Wallet
                      </Link>
                    </li>
                    <li>
                      <Link href="/auth/register" className="block py-2 text-base">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link href="/seller/register" className="block py-2 text-sm text-muted-foreground">
                        Become a Seller
                      </Link>
                    </li>
                  </>
                )}

                </ul>
              </div>

              {/* Mobile settings */}
              <div>
                <h3 className="text-xs uppercase text-muted-foreground font-semibold mb-3">Settings</h3>
                <div className="flex items-center justify-between py-2">
                  <span className="text-base">Theme</span>
                  <Button variant="outline" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

