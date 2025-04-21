"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, CheckCircle2, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const formSchema = z.object({
  marketName: z.string().min(2, {
    message: "Market name must be at least 2 characters.",
  }),
  collectionLink: z.string().url({
    message: "Please enter a valid URL for your NFT collection.",
  }),
  productType: z.string({
    required_error: "Please select a product type.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL for your website.",
    })
    .optional()
    .or(z.literal("")),
  socialMedia: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
})

export default function SellerRegistration() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marketName: "",
      collectionLink: "",
      productType: "",
      description: "",
      website: "",
      socialMedia: "",
      email: "",
      termsAccepted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)

    toast({
      title: "Application submitted",
      description: "Your seller application has been submitted successfully. We'll review it and get back to you soon.",
    })

    // Redirect to login page after successful submission
    router.push("/seller/login")
  }

  return (
    <div className="container max-w-3xl py-10">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Become a Seller</CardTitle>
          <CardDescription>
            Register your NFT collection and start selling merchandise on our platform. We'll review your application
            and get back to you within 2-3 business days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="marketName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market/Brand Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your brand or market name" {...field} />
                      </FormControl>
                      <FormDescription>This is how your brand will appear on our platform.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="collectionLink"
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
                                Link to your NFT collection on OpenSea, Rarible, or other NFT marketplace.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://opensea.io/collection/your-collection" {...field} />
                      </FormControl>
                      <FormDescription>We'll verify your ownership of this collection.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the type of products you want to sell" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apparel">Apparel (T-shirts, Hoodies, etc.)</SelectItem>
                          <SelectItem value="accessories">Accessories (Caps, Bags, etc.)</SelectItem>
                          <SelectItem value="collectibles">Collectibles (Figures, Toys, etc.)</SelectItem>
                          <SelectItem value="prints">Art Prints</SelectItem>
                          <SelectItem value="mixed">Mixed Products</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the primary type of products you plan to sell.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your brand, collection, and the products you want to sell"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Provide a brief description of your brand and products.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourbrand.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Media (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="@yourbrand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input placeholder="contact@yourbrand.com" type="email" {...field} />
                      </FormControl>
                      <FormDescription>We'll use this email to contact you about your application.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I accept the terms and conditions</FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to our{" "}
                          <Link href="/terms" className="underline">
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="underline">
                            privacy policy
                          </Link>
                          . You also understand that we take a 20% commission on all sales.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t pt-6">
          <h3 className="text-sm font-medium mb-2">What happens next?</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span className="text-sm">We'll review your application within 2-3 business days</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span className="text-sm">If approved, you'll receive an email with login credentials</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span className="text-sm">You can then set up your seller profile and start listing products</span>
            </li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  )
}

