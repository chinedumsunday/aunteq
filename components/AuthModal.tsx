"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "register"
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLoginCheckboxChange = (checked) => {
    setLoginData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  const handleRegisterCheckboxChange = (checked) => {
    setRegisterData((prev) => ({
      ...prev,
      agreeTerms: checked,
    }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Success",
        description: "You have successfully logged in",
      })
      onClose()
      // In a real app, you would redirect or update auth state here
    }, 1500)
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()

    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (!registerData.agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      })
      onClose()
      // In a real app, you would redirect or update auth state here
    }, 1500)
  }

  const handleSocialLogin = (provider) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Success",
        description: `You have successfully logged in with ${provider}`,
      })
      onClose()
      // In a real app, you would redirect or update auth state here
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Account</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="login" className="p-4 pt-2">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => handleSocialLogin("Google")} disabled={isLoading}>
                    <svg
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" onClick={() => handleSocialLogin("Wallet")} disabled={isLoading}>
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                    Wallet
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <form onSubmit={handleLoginSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button variant="link" className="p-0 h-auto text-xs">
                          Forgot password?
                        </Button>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={loginData.rememberMe}
                        onCheckedChange={handleLoginCheckboxChange}
                        disabled={isLoading}
                      />
                      <Label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="register" className="p-4 pt-2">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => handleSocialLogin("Google")} disabled={isLoading}>
                    <svg
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" onClick={() => handleSocialLogin("Wallet")} disabled={isLoading}>
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                    Wallet
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={registerData.agreeTerms}
                        onCheckedChange={handleRegisterCheckboxChange}
                        disabled={isLoading}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the terms and conditions
                      </Label>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

