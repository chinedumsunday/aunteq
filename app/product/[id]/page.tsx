"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, Share2, Star, StarHalf, Check, Info, ShoppingCart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/CartContext"
import ProductReviews from "@/components/ProductReviews"
import RelatedProducts from "@/components/RelatedProducts"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface ProductData {
  id: number
  name: string
  description: string
  price: number
  discountedPrice?: number
  rating: number
  reviewCount: number
  nft: string
  collection: string
  images: string[]
  sizes: string[]
  colors: {
    name: string
    value: string
  }[]
  features: string[]
  details: {
    material: string
    fit: string
    care: string[]
  }
  stock: {
    [key: string]: number
  }
  tags: string[]
  isNew: boolean
  isLimited: boolean
}

// Mock product data
const productData: ProductData = {
  id: 123,
  name: "Bored Ape Yacht Club T-Shirt",
  description:
    "Official Bored Ape Yacht Club merchandise. This premium t-shirt features high-quality print of BAYC #8817, one of the most iconic NFTs in the collection.",
  price: 79.99,
  discountedPrice: 59.99,
  rating: 4.8,
  reviewCount: 124,
  nft: "Bored Ape #8817",
  collection: "Bored Ape Yacht Club",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Navy", value: "#0A142F" },
  ],
  features: [
    "Premium cotton blend",
    "Authentic BAYC design",
    "Ribbed crew neck",
    "Double-stitched hems",
    "Limited edition",
  ],
  details: {
    material: "100% Premium Combed Organic Cotton, 180 GSM",
    fit: "Regular fit, true to size",
    care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Do not iron decoration"],
  },
  stock: {
    "S-Black": 10,
    "M-Black": 5,
    "L-Black": 0,
    "XL-Black": 8,
    "XXL-Black": 3,
    "S-White": 12,
    "M-White": 15,
    "L-White": 8,
    "XL-White": 4,
    "XXL-White": 2,
    "S-Navy": 7,
    "M-Navy": 9,
    "L-Navy": 6,
    "XL-Navy": 4,
    "XXL-Navy": 3,
  },
  tags: ["BAYC", "NFT", "Limited Edition", "Streetwear"],
  isNew: true,
  isLimited: true,
}

export default function ProductPage({ _params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isInWishlist, setIsInWishlist] = useState(false)

  const currentStock = selectedSize && selectedColor ? productData.stock[`${selectedSize}-${selectedColor}`] || 0 : 0

  const isOutOfStock = currentStock === 0
  const isLowStock = currentStock > 0 && currentStock <= 5

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-primary text-primary" />)
    }

    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-muted-foreground" />)
    }

    return stars
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before adding to cart",
        variant: "destructive",
      })
      return
    }

    if (isOutOfStock) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: productData.id,
      name: productData.name,
      price: productData.discountedPrice || productData.price,
      quantity,
      image: productData.images[0],
      size: selectedSize,
      color: selectedColor,
      nft: productData.nft,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} × ${productData.name} added to your cart`,
    })
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)

    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: isInWishlist
        ? `${productData.name} has been removed from your wishlist`
        : `${productData.name} has been added to your wishlist`,
    })
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <ol className="flex items-center space-x-1">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          </li>
          <li>
            <Link href="/marketplace" className="text-muted-foreground hover:text-primary">
              Shop
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          </li>
          <li>
            <Link
              href={`/collections/${productData.collection.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-muted-foreground hover:text-primary"
            >
              {productData.collection}
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          </li>
          <li>
            <span className="text-foreground font-medium">{productData.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={productData.images[selectedImage] || "/placeholder.svg"}
              alt={productData.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {productData.isNew && <Badge className="absolute top-4 left-4">New</Badge>}
            {productData.isLimited && (
              <Badge variant="secondary" className="absolute top-4 right-4">
                Limited Edition
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productData.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md ${
                  selectedImage === index ? "ring-2 ring-primary" : "ring-1 ring-muted"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Badges */}
          <div>
            <h1 className="text-3xl font-bold">{productData.name}</h1>
            <p className="text-muted-foreground mt-1">Inspired by {productData.nft}</p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            {productData.discountedPrice ? (
              <>
                <span className="text-2xl font-bold">${productData.discountedPrice.toFixed(2)}</span>
                <span className="text-lg text-muted-foreground line-through">${productData.price.toFixed(2)}</span>
                <Badge variant="destructive" className="ml-2">
                  Save ${(productData.price - productData.discountedPrice).toFixed(2)}
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">${productData.price.toFixed(2)}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(productData.rating)}</div>
            <span className="text-sm text-muted-foreground">
              {productData.rating} ({productData.reviewCount} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed">{productData.description}</p>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Size</Label>
              <Link href="/size-guide" className="text-xs text-primary hover:underline">
                Size Guide
              </Link>
            </div>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
              {productData.sizes.map((size) => {
                const hasStock = productData.colors.some((color) => productData.stock[`${size}-${color.name}`] > 0)

                return (
                  <Label
                    key={size}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors
                      ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-transparent"}
                      ${!hasStock ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-primary"}
                    `}
                  >
                    <RadioGroupItem value={size} className="sr-only" disabled={!hasStock} />
                    {size}
                  </Label>
                )
              })}
            </RadioGroup>
          </div>

          {/* Color Selection */}
          <div>
            <Label className="text-sm font-medium block mb-2">Color</Label>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
              {productData.colors.map((color) => {
                const hasStock = selectedSize
                  ? productData.stock[`${selectedSize}-${color.name}`] > 0
                  : productData.sizes.some((size) => productData.stock[`${size}-${color.name}`] > 0)

                return (
                  <TooltipProvider key={color.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label
                          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all
                            ${selectedColor === color.name ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-muted"}
                            ${!hasStock ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:ring-primary"}
                          `}
                          style={{ background: color.value }}
                        >
                          <RadioGroupItem value={color.name} className="sr-only" disabled={!hasStock} />
                          {selectedColor === color.name && (
                            <Check className={`h-4 w-4 ${color.name === "White" ? "text-black" : "text-white"}`} />
                          )}
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">{color.name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </RadioGroup>
          </div>

          {/* Stock Status */}
          <div>
            {selectedSize && selectedColor ? (
              isOutOfStock ? (
                <p className="text-sm text-destructive flex items-center">
                  <Info className="h-4 w-4 mr-1" /> Out of stock
                </p>
              ) : isLowStock ? (
                <p className="text-sm text-amber-500 flex items-center">
                  <Info className="h-4 w-4 mr-1" /> Low stock - only {currentStock} left
                </p>
              ) : (
                <p className="text-sm text-green-500 flex items-center">
                  <Check className="h-4 w-4 mr-1" /> In stock - {currentStock} available
                </p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">Please select both size and color to check availability</p>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center border rounded-md">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-r-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-l-none"
                onClick={() => setQuantity(quantity + 1)}
                disabled={isOutOfStock || quantity >= currentStock}
              >
                +
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 flex-1">
              <Button
                className="flex items-center gap-2 w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={isOutOfStock || !selectedSize || !selectedColor}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </Button>

              <Button
                variant={isInWishlist ? "default" : "outline"}
                size="lg"
                className={`flex items-center gap-2 w-full ${isInWishlist ? "bg-primary" : ""}`}
                onClick={toggleWishlist}
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
                <span>Wishlist</span>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 border-t border-muted pt-6">
            <h3 className="font-medium">Product Features</h3>
            <ul className="space-y-2">
              {productData.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Share */}
          <div className="flex items-center space-x-4 border-t border-muted pt-6">
            <span className="text-sm font-medium">Share:</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Shipping & Returns
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Reviews ({productData.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Details</h3>
                <p className="text-sm leading-relaxed">{productData.description}</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="material">
                    <AccordionTrigger>Material & Composition</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{productData.details.material}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="fit">
                    <AccordionTrigger>Fit & Sizing</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{productData.details.fit}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="care">
                    <AccordionTrigger>Care Instructions</AccordionTrigger>
                    <AccordionContent>
                      <ul className="text-sm space-y-1">
                        {productData.details.care.map((instruction, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <Image src="/placeholder.svg" alt="Product video thumbnail" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-primary/90 p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                <p className="text-sm leading-relaxed mb-4">
                  We offer worldwide shipping on all orders. Shipping time depends on your location.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="border border-muted rounded-lg p-4">
                    <h4 className="font-medium mb-2">Standard Shipping</h4>
                    <p className="text-sm text-muted-foreground">3-5 business days</p>
                    <p className="text-sm font-medium mt-2">$4.99</p>
                    <p className="text-xs text-muted-foreground mt-1">Free on orders over $50</p>
                  </div>
                  <div className="border border-muted rounded-lg p-4">
                    <h4 className="font-medium mb-2">Express Shipping</h4>
                    <p className="text-sm text-muted-foreground">1-2 business days</p>
                    <p className="text-sm font-medium mt-2">$9.99</p>
                  </div>
                  <div className="border border-muted rounded-lg p-4">
                    <h4 className="font-medium mb-2">International Shipping</h4>
                    <p className="text-sm text-muted-foreground">7-14 business days</p>
                    <p className="text-sm font-medium mt-2">$14.99+</p>
                    <p className="text-xs text-muted-foreground mt-1">Customs fees may apply</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                <p className="text-sm leading-relaxed">
                  We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original
                  packaging with tags attached.
                </p>

                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Easy Returns</h4>
                      <p className="text-xs text-muted-foreground">
                        Simply use our return portal to generate a shipping label
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Free Return Shipping</h4>
                      <p className="text-xs text-muted-foreground">
                        We cover return shipping costs for all domestic orders
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Fast Refunds</h4>
                      <p className="text-xs text-muted-foreground">
                        Refunds are processed within 5 business days of receiving your return
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <ProductReviews
              productId={productData.id}
              rating={productData.rating}
              reviewCount={productData.reviewCount}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts collectionName={productData.collection} currentProductId={productData.id} />
      </div>
    </div>
  )
}

