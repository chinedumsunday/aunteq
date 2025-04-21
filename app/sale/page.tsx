"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductModal from "@/components/ProductModal"
import { useCart } from "@/contexts/CartContext"
import { Clock, Flame } from "lucide-react"

const saleProducts = [
  {
    id: 101,
    name: "Limited Edition Bored Ape Hoodie",
    image: "/placeholder.svg?height=400&width=400",
    price: 129.99,
    originalPrice: 199.99,
    nft: "Bored Ape Yacht Club",
    description:
      "Exclusive limited edition hoodie in collaboration with Bored Ape Yacht Club. Only 100 pieces available.",
    stock: 23,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    artist: "CryptoArtist",
    endDate: "2025-04-15T00:00:00",
  },
  {
    id: 102,
    name: "CryptoPunk Artist Collab Tee",
    image: "/placeholder.svg?height=400&width=400",
    price: 79.99,
    originalPrice: 99.99,
    nft: "CryptoPunks",
    description: "Limited run t-shirt designed in collaboration with the original CryptoPunk artist. Numbered edition.",
    stock: 45,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray"],
    artist: "NFTMaster",
    endDate: "2025-04-20T00:00:00",
  },
  {
    id: 103,
    name: "Azuki Collector's Jacket",
    image: "/placeholder.svg?height=400&width=400",
    price: 249.99,
    originalPrice: 349.99,
    nft: "Azuki",
    description: "Premium collector's jacket featuring hand-embroidered Azuki artwork. Limited to 50 pieces worldwide.",
    stock: 12,
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
    artist: "AzukiCreator",
    endDate: "2025-04-10T00:00:00",
  },
  {
    id: 104,
    name: "Doodles Special Edition Cap",
    image: "/placeholder.svg?height=400&width=400",
    price: 59.99,
    originalPrice: 79.99,
    nft: "Doodles",
    description: "Special edition cap featuring exclusive Doodles artwork not available anywhere else.",
    stock: 78,
    sizes: ["One Size"],
    colors: ["Multi"],
    artist: "DoodleArtist",
    endDate: "2025-04-25T00:00:00",
  },
  {
    id: 105,
    name: "CloneX Artist Series Sweater",
    image: "/placeholder.svg?height=400&width=400",
    price: 149.99,
    originalPrice: 199.99,
    nft: "CloneX",
    description: "Premium knit sweater from the CloneX Artist Series. Each piece features unique detailing.",
    stock: 34,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Burgundy"],
    artist: "CloneCreator",
    endDate: "2025-04-18T00:00:00",
  },
  {
    id: 106,
    name: "Pudgy Penguins Limited Socks",
    image: "/placeholder.svg?height=400&width=400",
    price: 29.99,
    originalPrice: 39.99,
    nft: "Pudgy Penguins",
    description: "Collector's edition Pudgy Penguins socks. Set of 3 pairs with different designs.",
    stock: 56,
    sizes: ["One Size"],
    colors: ["Multi"],
    artist: "PenguinDesigner",
    endDate: "2025-04-30T00:00:00",
  },
]

export default function SalePage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addToCart } = useCart()

  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate).getTime() - new Date().getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    }
  }

  const handleQuickAdd = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Limited Edition Sale</h1>
        <p className="text-muted-foreground max-w-2xl">
          Exclusive merchandise in collaboration with top NFT artists. Limited quantities available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {saleProducts.map((product) => {
          const timeLeft = calculateTimeLeft(product.endDate)
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

          return (
            <div
              key={product.id}
              className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                <Badge variant="destructive" className="px-2 py-1">
                  {discountPercent}% OFF
                </Badge>
                {product.stock < 30 && (
                  <Badge variant="secondary" className="px-2 py-1 flex items-center">
                    <Flame className="h-3 w-3 mr-1" />
                    Only {product.stock} left
                  </Badge>
                )}
              </div>

              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="sm" className="w-full" onClick={() => handleQuickAdd(product)}>
                    Add to Bag
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3
                  className="text-lg font-medium cursor-pointer hover:text-primary"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">In collaboration with {product.artist}</p>

                <div className="flex items-center mt-2">
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="mt-3 flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    Sale ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

