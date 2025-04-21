"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Trash2, Upload, Info, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  nftCollectionLink: z.string().url({
    message: "Please enter a valid URL for your NFT collection.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  salePrice: z.string().optional(),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  communityShare: z.number().min(0).max(80),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
})

export default function NewProduct() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("basic")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      nftCollectionLink: "",
      price: "",
      salePrice: "",
      stock: "1",
      category: "",
      communityShare: 10,
      sizes: [],
      colors: [],
      termsAccepted: false,
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(_values: z.infer<typeof formSchema>) {
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one product image.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)

    toast({
      title: "Product submitted",
      description: "Your product has been submitted successfully and is pending approval.",
    })

    // Redirect to dashboard after successful submission
    router.push("/seller/dashboard")
  }

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"]
  const availableColors = ["Black", "White", "Gray", "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Orange"]

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/seller/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Product</CardTitle>
          <CardDescription>Create a new product listing for your NFT-inspired merchandise.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="profit">Profit Sharing</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Bored Ape T-Shirt" {...field} />
                        </FormControl>
                        <FormDescription>Choose a clear, descriptive name for your product.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product in detail..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include details about materials, fit, and connection to your NFT collection.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nftCollectionLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          NFT Collection Link
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Link to the specific NFT or collection that inspired this product.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://opensea.io/collection/your-collection" {...field} />
                        </FormControl>
                        <FormDescription>
                          This helps customers connect your merchandise to your NFT collection.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0.01" step="0.01" placeholder="29.99" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sale Price ($) (Optional)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0.01" step="0.01" placeholder="24.99" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="1" placeholder="100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tshirts">T-Shirts</SelectItem>
                            <SelectItem value="hoodies">Hoodies</SelectItem>
                            <SelectItem value="caps">Caps & Hats</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="posters">Posters & Prints</SelectItem>
                            <SelectItem value="collectibles">Collectibles</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Product Images</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload high-quality images of your product. We recommend at least 3 images from different
                        angles.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center p-4">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <label htmlFor="image-upload" className="text-sm font-medium text-primary cursor-pointer">
                          Upload Image
                        </label>
                        <p className="text-xs text-muted-foreground text-center mt-1">PNG, JPG or WEBP (max 5MB)</p>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>

                    {images.length === 0 && (
                      <p className="text-sm text-destructive">Please upload at least one product image.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="variants" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Available Sizes</h3>
                      <p className="text-sm text-muted-foreground">
                        Select all sizes that are available for this product.
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {availableSizes.map((size) => (
                        <FormField
                          key={size}
                          control={form.control}
                          name="sizes"
                          render={({ field }) => {
                            return (
                              <FormItem key={size} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(size)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), size])
                                        : field.onChange(field.value?.filter((value) => value !== size))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{size}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Available Colors</h3>
                      <p className="text-sm text-muted-foreground">
                        Select all colors that are available for this product.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableColors.map((color) => (
                        <FormField
                          key={color}
                          control={form.control}
                          name="colors"
                          render={({ field }) => {
                            return (
                              <FormItem key={color} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(color)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), color])
                                        : field.onChange(field.value?.filter((value) => value !== color))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{color}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="profit" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Profit Sharing</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure how profits from this product will be shared.
                      </p>
                    </div>

                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Platform Fee</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our platform takes a 20% fee from all sales. This is non-negotiable and covers our operational
                        costs, marketing, and customer service.
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Platform Fee:</span>
                        <span className="text-sm">20%</span>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="communityShare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Community Share Percentage
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    This is the percentage of your profits (after our 20% platform fee) that you want to
                                    share with your NFT community. Setting this higher can increase community engagement
                                    and support.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Slider
                                min={0}
                                max={80}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                              />
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">0%</span>
                                <span className="text-sm font-medium">{field.value}%</span>
                                <span className="text-sm text-muted-foreground">80%</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            This is the percentage of your profits that will be shared with your NFT community.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Profit Distribution Example</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on your settings, here&apos;s how profits would be distributed for a product with a price of
                        $100:
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Platform Fee (20%):</span>
                          <span className="text-sm">$20.00</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Remaining Profit:</span>
                          <span className="text-sm">$80.00</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Community Share ({form.watch("communityShare")}%):</span>
                          <span className="text-sm">${((80 * form.watch("communityShare")) / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-sm">Your Profit:</span>
                          <span className="text-sm">
                            ${((80 * (100 - form.watch("communityShare"))) / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="pt-4 border-t">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I accept the terms and conditions</FormLabel>
                          <FormDescription>
                            By submitting this product, you agree to our{" "}
                            <Link href="/terms" className="underline">
                              terms of service
                            </Link>{" "}
                            and confirm that you have the rights to sell merchandise based on this NFT collection. You
                            also agree to the 20% platform fee and the community share percentage you&apos;ve set.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  {activeTab !== "basic" ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const tabs = ["basic", "images", "variants", "profit"]
                        const currentIndex = tabs.indexOf(activeTab)
                        setActiveTab(tabs[currentIndex - 1])
                      }}
                    >
                      Previous
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {activeTab !== "profit" ? (
                    <Button
                      type="button"
                      onClick={() => {
                        const tabs = ["basic", "images", "variants", "profit"]
                        const currentIndex = tabs.indexOf(activeTab)
                        setActiveTab(tabs[currentIndex + 1])
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Product"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

