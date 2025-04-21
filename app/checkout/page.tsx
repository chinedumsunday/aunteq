"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/components/ui/use-toast"
import { CheckIcon, CreditCard, Wallet, Truck, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

enum CheckoutStep {
  Information = "information",
  Shipping = "shipping",
  Payment = "payment",
  Review = "review",
}

const paymentMethods = [
  {
    id: "card",
    name: "Credit Card",
    icon: CreditCard,
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Wallet,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: (props) => (
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
        {...props}
      >
        <path d="M7.144 19.532l1.049-5.751c.11-.606.691-1.002 1.304-.948 2.155.192 6.877.1 8.818-4.002 2.554-5.397-.59-7.769-6.295-7.769H7.43a1.97 1.97 0 0 0-1.944 1.655L2.77 19.5a1.35 1.35 0 0 0 1.344 1.51H6.84a1.34 1.34 0 0 0 1.32-.95z" />
        <path d="M15.5 7.5c2.5 0 4.5 1.5 4.5 4s-1.5 5-4.5 5h-3l-1 5.5" />
      </svg>
    ),
  },
]

const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "3-5 business days",
    price: 4.99,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "1-2 business days",
    price: 9.99,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 19.99,
  },
]

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.Information)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
    savePaymentInfo: false,
    promoCode: "",
  })

  // Get cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = formData.shippingMethod === "standard" ? 4.99 : formData.shippingMethod === "express" ? 9.99 : 19.99
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + shipping + tax

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    if (currentStep === CheckoutStep.Information) {
      // Validate information fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
        toast({
          title: "Missing Information",
          description: "Please fill out all required fields",
          variant: "destructive",
        })
        return
      }
      setCurrentStep(CheckoutStep.Shipping)
    } else if (currentStep === CheckoutStep.Shipping) {
      setCurrentStep(CheckoutStep.Payment)
    } else if (currentStep === CheckoutStep.Payment) {
      // Validate payment information if credit card is selected
      if (formData.paymentMethod === "card") {
        if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvc) {
          toast({
            title: "Missing Payment Information",
            description: "Please fill out all payment fields",
            variant: "destructive",
          })
          return
        }
      }
      setCurrentStep(CheckoutStep.Review)
    } else if (currentStep === CheckoutStep.Review) {
      handlePlaceOrder()
    }
  }

  const handlePreviousStep = () => {
    if (currentStep === CheckoutStep.Shipping) {
      setCurrentStep(CheckoutStep.Information)
    } else if (currentStep === CheckoutStep.Payment) {
      setCurrentStep(CheckoutStep.Shipping)
    } else if (currentStep === CheckoutStep.Review) {
      setCurrentStep(CheckoutStep.Payment)
    }
  }

  const handlePlaceOrder = () => {
    setIsLoading(true)

    // Simulate API call to place order
    setTimeout(() => {
      setIsLoading(false)
      clearCart()
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
      })
      // In a real app, you would redirect to a confirmation page
      window.location.href = "/checkout/success"
    }, 2000)
  }

  const stepIndicator = (step: CheckoutStep, label: string, isActive: boolean, isCompleted: boolean) => {
    return (
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
            ${
              isActive
                ? "bg-primary text-primary-foreground"
                : isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
            }
          `}
        >
          {isCompleted ? <CheckIcon className="h-4 w-4" /> : getStepNumber(step)}
        </div>
        <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</span>
      </div>
    )
  }

  const getStepNumber = (step: CheckoutStep) => {
    switch (step) {
      case CheckoutStep.Information:
        return 1
      case CheckoutStep.Shipping:
        return 2
      case CheckoutStep.Payment:
        return 3
      case CheckoutStep.Review:
        return 4
    }
  }

  const getStepLabel = (step: CheckoutStep) => {
    switch (step) {
      case CheckoutStep.Information:
        return "Information"
      case CheckoutStep.Shipping:
        return "Shipping"
      case CheckoutStep.Payment:
        return "Payment"
      case CheckoutStep.Review:
        return "Review"
    }
  }

  const isStepActive = (step: CheckoutStep) => currentStep === step

  const isStepCompleted = (step: CheckoutStep) => {
    const steps = [CheckoutStep.Information, CheckoutStep.Shipping, CheckoutStep.Payment, CheckoutStep.Review]
    return steps.indexOf(step) < steps.indexOf(currentStep)
  }

  if (cart.length === 0) {
    return (
      <div className="container max-w-4xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">You don't have any items in your cart.</p>
        <Button asChild>
          <Link href="/marketplace">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
        {stepIndicator(
          CheckoutStep.Information,
          "Information",
          isStepActive(CheckoutStep.Information),
          isStepCompleted(CheckoutStep.Information),
        )}
        <div className="w-full h-px bg-muted"></div>
        {stepIndicator(
          CheckoutStep.Shipping,
          "Shipping",
          isStepActive(CheckoutStep.Shipping),
          isStepCompleted(CheckoutStep.Shipping),
        )}
        <div className="w-full h-px bg-muted"></div>
        {stepIndicator(
          CheckoutStep.Payment,
          "Payment",
          isStepActive(CheckoutStep.Payment),
          isStepCompleted(CheckoutStep.Payment),
        )}
        <div className="w-full h-px bg-muted"></div>
        {stepIndicator(
          CheckoutStep.Review,
          "Review",
          isStepActive(CheckoutStep.Review),
          isStepCompleted(CheckoutStep.Review),
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === CheckoutStep.Information && (
                <div className="bg-card rounded-lg p-6 border">
                  <h2 className="text-lg font-semibold mb-4">Contact & Shipping Information</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="address">Address *</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                      <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <select
                        id="country"
                        name="country"
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === CheckoutStep.Shipping && (
                <div className="bg-card rounded-lg p-6 border">
                  <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>

                  <RadioGroup
                    value={formData.shippingMethod}
                    onValueChange={(value) => handleRadioChange("shippingMethod", value)}
                    className="space-y-3"
                  >
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                          ${formData.shippingMethod === option.id ? "border-primary bg-primary/5" : "border-muted"}
                        `}
                        onClick={() => handleRadioChange("shippingMethod", option.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div>
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <div className="font-medium">${option.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="mt-6">
                    <h3 className="text-base font-medium mb-3">Delivery Notes (Optional)</h3>
                    <textarea
                      className="w-full h-24 px-3 py-2 border border-input bg-background rounded-md resize-none"
                      placeholder="Add any special instructions for delivery"
                    ></textarea>
                  </div>
                </div>
              )}

              {currentStep === CheckoutStep.Payment && (
                <div className="bg-card rounded-lg p-6 border">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

                  <Tabs defaultValue="card" className="mb-6">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              name="expiry"
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" name="cvc" placeholder="123" value={formData.cvc} onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="crypto">
                      <div className="text-center py-6">
                        <Wallet className="h-12 w-12 mb-4 mx-auto text-primary" />
                        <h3 className="text-lg font-medium mb-2">Pay with Cryptocurrency</h3>
                        <p className="text-muted-foreground mb-4">
                          You'll be asked to connect your wallet in the next step
                        </p>
                        <Button onClick={() => handleRadioChange("paymentMethod", "crypto")} variant="outline">
                          Continue with Crypto
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal">
                      <div className="text-center py-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mb-4 mx-auto text-primary"
                        >
                          <path d="M7.144 19.532l1.049-5.751c.11-.606.691-1.002 1.304-.948 2.155.192 6.877.1 8.818-4.002 2.554-5.397-.59-7.769-6.295-7.769H7.43a1.97 1.97 0 0 0-1.944 1.655L2.77 19.5a1.35 1.35 0 0 0 1.344 1.51H6.84a1.34 1.34 0 0 0 1.32-.95z" />
                          <path d="M15.5 7.5c2.5 0 4.5 1.5 4.5 4s-1.5 5-4.5 5h-3l-1 5.5" />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">Pay with PayPal</h3>
                        <p className="text-muted-foreground mb-4">
                          You'll be redirected to PayPal to complete your purchase
                        </p>
                        <Button onClick={() => handleRadioChange("paymentMethod", "paypal")} variant="outline">
                          Continue with PayPal
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="savePaymentInfo"
                      name="savePaymentInfo"
                      checked={formData.savePaymentInfo}
                      onChange={handleChange}
                      className="rounded border-muted"
                    />
                    <Label htmlFor="savePaymentInfo" className="text-sm">
                      Save my payment information for future orders
                    </Label>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Your payment information is secure and encrypted. We never store your full card details.
                  </p>
                </div>
              )}

              {currentStep === CheckoutStep.Review && (
                <div className="bg-card rounded-lg p-6 border">
                  <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Contact Information</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(CheckoutStep.Information)}
                          className="text-xs h-8"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Shipping Address</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(CheckoutStep.Information)}
                          className="text-xs h-8"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p>
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p>{formData.country}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Shipping Method</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(CheckoutStep.Shipping)}
                          className="text-xs h-8"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p>
                          {shippingOptions.find((option) => option.id === formData.shippingMethod)?.name} - $
                          {shippingOptions.find((option) => option.id === formData.shippingMethod)?.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {shippingOptions.find((option) => option.id === formData.shippingMethod)?.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Payment Method</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(CheckoutStep.Payment)}
                          className="text-xs h-8"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        {formData.paymentMethod === "card" && (
                          <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                        )}
                        {formData.paymentMethod === "crypto" && <p>Cryptocurrency</p>}
                        {formData.paymentMethod === "paypal" && <p>PayPal</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep !== CheckoutStep.Information ? (
                <Button variant="outline" onClick={handlePreviousStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              <Button onClick={handleNextStep} disabled={isLoading} className="ml-auto">
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <>
                    {currentStep === CheckoutStep.Review ? "Place Order" : "Continue"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg border p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="max-h-80 overflow-y-auto mb-4 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex py-3 border-b border-muted last:border-0">
                  <div className="h-16 w-16 flex-shrink-0 bg-muted rounded overflow-hidden mr-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                    {item.color && <p className="text-xs text-muted-foreground">Color: {item.color}</p>}
                    <div className="flex justify-between mt-1">
                      <p className="text-xs">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="mb-4">
              <Label htmlFor="promoCode" className="text-sm mb-2 block">
                Promo Code
              </Label>
              <div className="flex gap-2">
                <Input
                  id="promoCode"
                  name="promoCode"
                  placeholder="Enter code"
                  value={formData.promoCode}
                  onChange={handleChange}
                  className="flex-grow"
                />
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center text-xs text-muted-foreground">
              <Truck className="h-4 w-4 mr-1" />
              Free shipping on orders over $50
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

