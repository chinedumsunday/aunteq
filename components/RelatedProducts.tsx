"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: number
  name: string
  image: string
  price: number
  discountedPrice?: number
  nft: string
  isNew: boolean
  rating: number
}

// Mock related products data
const mockRelatedProducts: Product[] = [
  {
    id: 234,
    name: "BAYC Hoodie Black",
    image: "/placeholder.svg",
    price: 89.99,
    nft: "Bored Ape Yacht Club",
    isNew: true,
    rating: 4.7,
  },
  {
    id: 235,
    name: "BAYC Cap",
    image: "/placeholder.svg",
    price: 34.99,
    discountedPrice: 29.99,
    nft: "Bored Ape Yacht Club",
    isNew: false,
    rating: 4.5,
  },
  {
    id: 236,
    name: "BAYC Phone Case",
    image: "/placeholder.svg",
    price: 24.99,
    nft: "Bored Ape Yacht Club",
    isNew: false,
    rating: 4.2,
  },
  {
    id: 237,
    name: "BAYC Socks",
    image: "/placeholder.svg",
    price: 14.99,
    nft: "Bored Ape Yacht Club",
    isNew: true,
    rating: 4.0,
  },
]

interface RelatedProductsProps {
  collectionName: string
  currentProductId: number
}

export default function RelatedProducts({ collectionName, currentProductId }: RelatedProductsProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    setWishlistedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )

    const isAdding = !wishlistedItems.includes(productId)

    toast({
      title: isAdding ? "Added to wishlist" : "Removed from wishlist",
      description: isAdding ? "Product has been added to your wishlist" : "Product has been removed from your wishlist",
    })
  }

  const handleQuickAdd = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.price,
      quantity: 1,
      image: product.image,
      nft: product.nft,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {mockRelatedProducts.map((product) => (
        <div key={product.id} className="group relative">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Product badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && <Badge className="text-xs">New</Badge>}
              {product.discountedPrice && (
                <Badge variant="destructive" className="text-xs">
                  {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Quick actions */}
            <div className="absolute top-2 right-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  className={`h-4 w-4 ${wishlistedItems.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
            </div>

            {/* Quick add */}
            <div className="absolute inset-x-0 bottom-0 flex h-[40%] translate-y-full items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
              <Button
                className="w-full bg-primary/90 backdrop-blur-sm transition-colors hover:bg-primary text-primary-foreground"
                onClick={() => handleQuickAdd(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Quick Add
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <Link href={`/product/${product.id}`} className="block">
              <h3 className="text-sm font-medium group-hover:text-primary transition-colors duration-200 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground">{product.nft}</p>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex">
                  {product.discountedPrice ? (
                    <>
                      <span className="text-sm font-medium">${product.discountedPrice.toFixed(2)}</span>
                      <span className="ml-1 text-xs line-through text-muted-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <svg className="h-3 w-3 fill-primary text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-xs">{product.rating}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

