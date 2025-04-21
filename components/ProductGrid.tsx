"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductModal from "./ProductModal"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/components/ui/use-toast"
import { Heart, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

const products = [
  {
    id: 1,
    name: "Bored Ape T-Shirt",
    image: "/placeholder.svg",
    price: 49.99,
    nft: "Bored Ape Yacht Club",
    description: "Show off your Bored Ape style with this exclusive t-shirt.",
    collection: "bored-ape",
    category: "tshirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Navy", value: "#0A142F" },
    ],
    isNew: true,
  },
  {
    id: 2,
    name: "CryptoPunk Hoodie",
    image: "/placeholder.svg",
    price: 79.99,
    nft: "CryptoPunks",
    description: "Stay warm and punk with this CryptoPunk-inspired hoodie.",
    collection: "cryptopunks",
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" },
    ],
  },
  {
    id: 3,
    name: "Azuki Cap",
    image: "/placeholder.svg",
    price: 34.99,
    nft: "Azuki",
    description: "Top off your look with this stylish Azuki-inspired cap.",
    collection: "azuki",
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Red", value: "#FF0000" },
      { name: "Blue", value: "#0000FF" },
    ],
  },
  {
    id: 4,
    name: "Doodles Jacket",
    image: "/placeholder.svg",
    price: 129.99,
    nft: "Doodles",
    description: "Colorful jacket inspired by the Doodles collection.",
    collection: "doodles",
    category: "jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Multi", value: "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)" }],
    isLimited: true,
  },
  {
    id: 5,
    name: "World of Women Scarf",
    image: "/placeholder.svg",
    price: 29.99,
    nft: "World of Women",
    description: "Elegant scarf featuring World of Women artwork.",
    collection: "world-of-women",
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Purple", value: "#800080" },
      { name: "Pink", value: "#FFC0CB" },
    ],
  },
  {
    id: 6,
    name: "Limited CryptoPunk Collector's Tee",
    image: "/placeholder.svg",
    price: 149.99,
    nft: "CryptoPunks",
    description: "Limited edition collector's t-shirt featuring rare CryptoPunks.",
    collection: "cryptopunks",
    category: "limited",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", value: "#000000" }],
    isLimited: true,
  },
  {
    id: 7,
    name: "Bored Ape Sweatpants",
    image: "/placeholder.svg",
    price: 69.99,
    nft: "Bored Ape Yacht Club",
    description: "Comfortable sweatpants featuring Bored Ape designs.",
    collection: "bored-ape",
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Gray", value: "#808080" },
      { name: "Black", value: "#000000" },
    ],
  },
  {
    id: 8,
    name: "Azuki Phone Case",
    image: "/placeholder.svg",
    price: 24.99,
    nft: "Azuki",
    description: "Protect your phone with this stylish Azuki-inspired case.",
    collection: "azuki",
    category: "accessories",
    sizes: ["iPhone 13", "iPhone 14", "Samsung S22"],
    colors: [
      { name: "Clear", value: "transparent" },
      { name: "Black", value: "#000000" },
    ],
  },
]

export default function ProductGrid({ searchTerm, sortBy, selectedCollections, selectedCategories, priceRange }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([])
  const [showRemoveAlert, setShowRemoveAlert] = useState(false)
  const [productToRemove, setProductToRemove] = useState(null)

  const handleQuickAdd = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      nft: product.nft,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })
  }

  const toggleWishlist = (productId: number) => {
    if (wishlistedItems.includes(productId)) {
      setProductToRemove(productId)
      setShowRemoveAlert(true)
    } else {
      setWishlistedItems((prev) => [...prev, productId])
      toast({
        title: "Added to wishlist",
        description: "Product has been added to your wishlist",
      })
    }
  }

  const confirmRemoveFromWishlist = () => {
    setWishlistedItems((prev) => prev.filter((id) => id !== productToRemove))
    setShowRemoveAlert(false)
    toast({
      title: "Removed from wishlist",
      description: "Product has been removed from your wishlist",
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nft.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCollection = selectedCollections.length === 0 || selectedCollections.includes(product.collection)

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCollection && matchesCategory && matchesPrice
  })

  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "newest":
      // In a real app, would sort by date added/created
      filteredProducts.sort((a, b) => b.id - a.id)
      break
    case "best-selling":
      // In a real app, would sort by sales count
      // For now, just randomize
      filteredProducts.sort(() => Math.random() - 0.5)
      break
    // Default is "featured", no sorting needed
  }

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-muted">
                <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && <Badge className="text-xs">New</Badge>}
                  {product.isLimited && (
                    <Badge variant="destructive" className="text-xs">
                      Limited
                    </Badge>
                  )}
                </div>

                {/* Quick actions */}
                <div className="absolute top-2 right-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlistedItems.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                </div>

                {/* Quick add */}
                <div className="absolute inset-x-0 bottom-0 flex h-[40%] items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Button
                    className="w-full bg-primary/90 backdrop-blur-sm transition-colors hover:bg-primary text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleQuickAdd(product)
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Quick Add
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
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <AlertDialog open={showRemoveAlert} onOpenChange={setShowRemoveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from wishlist?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this item from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveFromWishlist}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

