"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SellerVerification() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"unverified" | "pending" | "verified">("unverified")

  // Form state
  const [walletAddress, setWalletAddress] = useState("")
  const [collectionUrl, setCollectionUrl] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [idDocument, setIdDocument] = useState<File | null>(null)
  const [proofOfOwnership, setProofOfOwnership] = useState<File | null>(null)

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIdDocument(e.target.files[0])
    }
  }

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProofOfOwnership(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!walletAddress || !collectionUrl || !idDocument || !proofOfOwnership) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and upload all required documents.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setVerificationStatus("pending")

    toast({
      title: "Verification submitted",
      description: "Your verification request has been submitted and is pending review.",
    })
  }

  return (
    <div className="container max-w-3xl py-10">
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
          <CardTitle className="text-2xl">Marketplace Verification</CardTitle>
          <CardDescription>
            Verify your identity and NFT collection ownership to build trust with customers and unlock additional
            features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {verificationStatus === "verified" ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-center">Your Marketplace is Verified!</h3>
              <p className="text-muted-foreground text-center mt-2 max-w-md">
                Your identity and NFT collection ownership have been verified. You now have access to all seller
                features.
              </p>
              <Button className="mt-6" onClick={() => router.push("/seller/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          ) : verificationStatus === "pending" ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium text-center">Verification Pending</h3>
              <p className="text-muted-foreground text-center mt-2 max-w-md">
                Your verification request has been submitted and is currently under review. This process typically takes
                2-3 business days.
              </p>
              <Button className="mt-6" onClick={() => router.push("/seller/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wallet-address" className="flex items-center">
                    Wallet Address
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">The wallet address that owns your NFT collection.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="wallet-address"
                    placeholder="0x..."
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    This should be the wallet that owns your NFT collection.
                  </p>
                </div>

                <div>
                  <Label htmlFor="collection-url" className="flex items-center">
                    NFT Collection URL
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Link to your NFT collection on OpenSea, Rarible, or other NFT marketplace.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="collection-url"
                    placeholder="https://opensea.io/collection/your-collection"
                    value={collectionUrl}
                    onChange={(e) => setCollectionUrl(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    This should be a link to your NFT collection on a marketplace like OpenSea or Rarible.
                  </p>
                </div>

                <div>
                  <Label htmlFor="id-document" className="flex items-center">
                    Identity Document
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Upload a government-issued ID for identity verification.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="id-document-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (max. 5MB)</p>
                        </div>
                        <input
                          id="id-document-upload"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={handleIdUpload}
                          required
                        />
                      </label>
                    </div>
                    {idDocument && <p className="text-sm mt-2">Selected file: {idDocument.name}</p>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This document will be used to verify your identity and will be kept confidential.
                  </p>
                </div>

                <div>
                  <Label htmlFor="proof-ownership" className="flex items-center">
                    Proof of Collection Ownership
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Upload a screenshot or document proving you own the NFT collection.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="proof-ownership-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (max. 5MB)</p>
                        </div>
                        <input
                          id="proof-ownership-upload"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={handleProofUpload}
                          required
                        />
                      </label>
                    </div>
                    {proofOfOwnership && <p className="text-sm mt-2">Selected file: {proofOfOwnership.name}</p>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This could be a screenshot of your wallet showing ownership, or a signed message from your wallet.
                  </p>
                </div>

                <div>
                  <Label htmlFor="additional-info">Additional Information (Optional)</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any additional information you'd like to provide..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Verification"}
              </Button>
            </form>
          )}

          <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="benefits">
                <AccordionTrigger>Benefits of Verification</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Verified badge on all your products</li>
                    <li>Higher visibility in search results</li>
                    <li>Access to premium seller features</li>
                    <li>Increased trust from customers</li>
                    <li>Ability to participate in featured collections</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="process">
                <AccordionTrigger>Verification Process</AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-2 list-decimal pl-5">
                    <li>Submit your verification request with all required documents</li>
                    <li>Our team reviews your submission (typically 2-3 business days)</li>
                    <li>We may contact you for additional information if needed</li>
                    <li>Once approved, your marketplace will be marked as verified</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq">
                <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">What types of ID are accepted?</h4>
                      <p className="text-sm text-muted-foreground">
                        We accept government-issued photo IDs such as passports, driver's licenses, and national ID
                        cards.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">How do I prove I own my NFT collection?</h4>
                      <p className="text-sm text-muted-foreground">
                        You can provide a screenshot of your wallet showing ownership, a signed message from your
                        wallet, or access to the collection's smart contract.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Is my personal information secure?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, all personal information and documents are encrypted and stored securely. They are only
                        used for verification purposes and are not shared with third parties.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

