"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductModal from "./ProductModal"
import { useCart } from "@/contexts/CartContext"

const trendingProducts = [
  {
    id: 1,
    name: "Bored Ape T-Shirt",
    image: "/placeholder.svg",
    price: 49.99,
    nft: "Bored Ape Yacht Club",
    description: "Show off your Bored Ape style with this exclusive t-shirt.",
  },
  {
    id: 2,
    name: "CryptoPunk Hoodie",
    image: "/placeholder.svg",
    price: 79.99,
    nft: "CryptoPunks",
    description: "Stay warm and punk with this CryptoPunk-inspired hoodie.",
  },
  {
    id: 3,
    name: "Azuki Cap",
    image: "/placeholder.svg",
    price: 34.99,
    nft: "Azuki",
    description: "Top off your look with this stylish Azuki-inspired cap.",
  },
  {
    id: 4,
    name: "Doodles Socks",
    image: "/placeholder.svg",
    price: 19.99,
    nft: "Doodles",
    description: "Colorful socks inspired by the Doodles collection.",
  },
]

export default function TrendingSection() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addToCart } = useCart()

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
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingProducts.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="sm" className="w-full" onClick={() => handleQuickAdd(product)}>
                  Add to Bag
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <h3
                className="text-sm font-medium cursor-pointer hover:text-primary"
                onClick={() => setSelectedProduct(product)}
              >
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground">{product.nft}</p>
              <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  )
}

