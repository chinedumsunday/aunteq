"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductModal from "./ProductModal"

const featuredProducts = [
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
]

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg overflow-hidden transform transition-all hover:scale-105 neon-box"
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-primary">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">Inspired by {product.nft}</p>
              <p className="font-bold mb-4 text-secondary">${product.price.toFixed(2)}</p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setSelectedProduct(product)}
              >
                View Product
              </Button>
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

