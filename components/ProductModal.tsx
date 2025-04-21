"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: number
  name: string
  image: string
  price: number
  nft: string
  description: string
  sizes?: string[]
  colors?: {
    name: string
    value: string
  }[]
  category?: string
  isNew?: boolean
  isLimited?: boolean
}

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [activeTab, setActiveTab] = useState("details")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const isClothing = ["tshirts", "hoodies", "jackets", "bottoms"].includes(product.category)
  const isAccessory = product.category === "accessories"

  const handleAddToCart = () => {
    // Validate selections for clothing items
    if (isClothing && (!selectedSize || !selectedColor)) {
      toast({
        title: "Selection required",
        description: "Please select both size and color",
        variant: "destructive",
      })
      return
    }

    // Validate selections for accessories
    if (isAccessory && product.sizes && product.sizes.length > 1 && !selectedSize) {
      toast({
        title: "Selection required",
        description: "Please select a size option",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      nft: product.nft,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary neon-text">{product.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">Inspired by {product.nft}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="font-bold text-lg text-secondary">${product.price.toFixed(2)}</p>

                {product.isLimited && (
                  <div className="bg-destructive/10 text-destructive p-2 rounded-md text-sm">
                    Limited Edition - While supplies last
                  </div>
                )}
              </TabsContent>

              <TabsContent value="options" className="space-y-4">
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Size</Label>
                    <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <Label
                          key={size}
                          className={`flex h-9 min-w-9 px-2 items-center justify-center rounded-md border text-sm transition-colors
                            ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-transparent"}
                            cursor-pointer hover:border-primary
                          `}
                        >
                          <RadioGroupItem value={size} className="sr-only" />
                          {size}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Color</Label>
                    <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <Label
                          key={color.name}
                          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all
                            ${selectedColor === color.name ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-muted"}
                            cursor-pointer hover:ring-primary
                          `}
                          style={{ background: color.value }}
                        >
                          <RadioGroupItem value={color.name} className="sr-only" />
                          {selectedColor === color.name && (
                            <Check
                              className={`h-4 w-4 ${color.name === "White" || color.name === "Clear" ? "text-black" : "text-white"}`}
                            />
                          )}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Quantity Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantity</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-muted text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      -
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-muted text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-box"
          onClick={handleAddToCart}
        >
          Add to Bag
        </Button>
      </DialogContent>
    </Dialog>
  )
}

