"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { Trash2, ShoppingBag, Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock wishlist data - in a real app, this would be stored in a context or fetched from an API
const mockWishlistItems = [
  {
    id: 1,
    name: "Bored Ape T-Shirt",
    image: "/placeholder.svg?height=300&width=300",
    price: 49.99,
    nft: "Bored Ape Yacht Club",
    inStock: true,
  },
  {
    id: 2,
    name: "CryptoPunk Hoodie",
    image: "/placeholder.svg?height=300&width=300",
    price: 79.99,
    nft: "CryptoPunks",
    inStock: true,
  },
  {
    id: 3,
    name: "Azuki Cap",
    image: "/placeholder.svg?height=300&width=300",
    price: 34.99,
    nft: "Azuki",
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [itemToRemove, setItemToRemove] = useState(null)
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Simulate loading wishlist data
  useEffect(() => {
    // In a real app, you would fetch this from an API or local storage
    setWishlist(mockWishlistItems)
  }, [])

  const handleRemoveFromWishlist = (id) => {
    setItemToRemove(id)
  }

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      setWishlist((prev) => prev.filter((item) => item.id !== itemToRemove))
      toast({
        title: "Item removed",
        description: "The item has been removed from your wishlist",
      })
      setItemToRemove(null)
    }
  }

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })

    toast({
      title: "Added to bag",
      description: `${item.name} has been added to your bag`,
    })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Items added to your wishlist will appear here</p>
          <Button asChild>
            <Link href="/marketplace">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden bg-card">
              <div className="aspect-square relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.nft}</p>
                <p className="font-semibold mb-4">${item.price.toFixed(2)}</p>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => handleAddToCart(item)} disabled={!item.inStock}>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Bag" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleRemoveFromWishlist(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={itemToRemove !== null} onOpenChange={(open) => !open && setItemToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Wishlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this item from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToRemove(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

