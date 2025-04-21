"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "card">("crypto")

  // Confirmation state (Separate from CartModal)
  const [confirmRemove, setConfirmRemove] = useState<{ open: boolean; item: any | null }>({
    open: false,
    item: null,
  })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleRemoveClick = (item: any) => {
    console.log("Opening confirmation modal for item:", item) // Debugging
    setConfirmRemove({ open: true, item }) // Open confirmation modal
  }

  const confirmRemoveItem = () => {
    if (confirmRemove.item !== null) {
      console.log("Removing item:", confirmRemove.item) // Debugging
      removeFromCart(confirmRemove.item.id)
    }
    setConfirmRemove({ open: false, item: null }) // Close confirmation modal
  }

  const cancelRemove = () => {
    console.log("Cancelled removal") // Debugging
    setConfirmRemove({ open: false, item: null }) // Close confirmation modal
  }

  return (
    <>
      {/* Main Cart Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary neon-text">Your Cart</DialogTitle>
          </DialogHeader>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Image src="/placeholder.svg" alt={item.name} width={50} height={50} className="mr-2" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-2"
                      onClick={() => handleRemoveClick(item)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="font-semibold">Total: ${total.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold mb-2">Payment Method:</p>
                <div className="flex gap-2">
                  <Button
                    variant={paymentMethod === "crypto" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("crypto")}
                  >
                    Pay with Crypto
                  </Button>
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("card")}
                  >
                    Pay with Card
                  </Button>
                </div>
              </div>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground neon-box">
                Proceed to Checkout
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Item Removal (Separate) */}
      <Dialog open={confirmRemove.open} onOpenChange={cancelRemove}>
        <DialogContent className="bg-background p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="font-semibold">Confirm Removal</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-4">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{confirmRemove.item?.name}</span> from your cart?
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={cancelRemove}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={confirmRemoveItem}>
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

