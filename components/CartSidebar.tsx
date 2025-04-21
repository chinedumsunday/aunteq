"use client"

import { useEffect, useRef, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { X, Trash2, ChevronRight, ShoppingBag, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.07 // 7% tax rate
  const total = subtotal + shipping + tax - discount

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setDiscount(subtotal * 0.1)
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
    }
  }

  useEffect(() => {
    // Close sidebar when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Reset discount when cart changes
  useEffect(() => {
    if (promoApplied) {
      setDiscount(subtotal * 0.1)
    }
  }, [subtotal, promoApplied])

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-card z-50 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-muted">
                <h2 className="text-lg font-semibold text-primary">MY BAG ({totalItems})</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-grow overflow-auto p-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">Your bag is empty</p>
                      <p className="text-sm text-muted-foreground mb-6">Items added to your bag will appear here</p>
                      <Button onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Continue Shopping
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    {cart.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex border-b border-muted pb-4"
                      >
                        <div className="w-24 h-24 flex-shrink-0 bg-muted rounded overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium hover:text-primary cursor-pointer">{item.name}</h3>
                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{item.nft}</p>
                          {item.size && <p className="text-xs text-muted-foreground mb-1">Size: {item.size}</p>}
                          {item.color && <p className="text-xs text-muted-foreground mb-1">Color: {item.color}</p>}
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border rounded border-muted">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-transparent"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-muted p-4">
                  {/* Promo Code */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Promo Code</p>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow"
                        disabled={promoApplied}
                      />
                      <Button onClick={applyPromoCode} disabled={promoApplied || !promoCode} variant="outline">
                        Apply
                      </Button>
                    </div>
                    {promoApplied && <p className="text-xs text-green-500 mt-1">Promo code applied!</p>}
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm">Tax (7%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span className="text-sm">Discount</span>
                        <span className="font-medium">-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-box" asChild>
                      <Link href="/checkout" onClick={onClose}>
                        CHECKOUT <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full" onClick={onClose}>
                      Continue Shopping
                    </Button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Got an NFT? Connect your wallet for exclusive discounts!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

