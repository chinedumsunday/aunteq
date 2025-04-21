"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText, Download, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type ContractStatus = "draft" | "pending" | "active" | "expired" | "terminated"

interface Contract {
  id: string
  name: string
  type: string
  status: ContractStatus
  startDate: string
  endDate: string
  profitShare: number
}

export default function SellerContracts() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("contracts")

  // Mock contracts data
  const contracts: Contract[] = [
    {
      id: "CTR-001",
      name: "Standard Seller Agreement",
      type: "Platform",
      status: "active",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      profitShare: 20,
    },
    {
      id: "CTR-002",
      name: "Bored Ape Collection Agreement",
      type: "Collection",
      status: "active",
      startDate: "2023-02-10",
      endDate: "2024-02-10",
      profitShare: 15,
    },
    {
      id: "CTR-003",
      name: "Limited Edition Promotion",
      type: "Promotion",
      status: "pending",
      startDate: "2023-06-01",
      endDate: "2023-08-01",
      profitShare: 25,
    },
  ]

  const getStatusBadge = (status: ContractStatus) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 text-xs font-medium">Active</span>
          </div>
        )
      case "pending":
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-yellow-600 text-xs font-medium">Pending</span>
          </div>
        )
      case "expired":
        return (
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600 text-xs font-medium">Expired</span>
          </div>
        )
      case "terminated":
        return (
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-600 text-xs font-medium">Terminated</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-blue-600 text-xs font-medium">Draft</span>
          </div>
        )
    }
  }

  const handleViewContract = (contractId: string) => {
    toast({
      title: "Contract Viewer",
      description: `Opening contract ${contractId} in viewer...`,
    })
    // In a real app, this would open a modal or navigate to a contract viewer
  }

  const handleDownloadContract = (contractId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading contract ${contractId}...`,
    })
    // In a real app, this would trigger a file download
  }

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
          <CardTitle className="text-2xl">Contracts & Agreements</CardTitle>
          <CardDescription>Manage your contracts, profit sharing agreements, and platform terms.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contracts">My Contracts</TabsTrigger>
              <TabsTrigger value="terms">Platform Terms</TabsTrigger>
            </TabsList>

            <TabsContent value="contracts" className="space-y-4 mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">
                          <div>{contract.name}</div>
                          <div className="text-xs text-muted-foreground">{contract.id}</div>
                        </TableCell>
                        <TableCell>{contract.type}</TableCell>
                        <TableCell>{getStatusBadge(contract.status)}</TableCell>
                        <TableCell>
                          <div className="text-xs">Start: {contract.startDate}</div>
                          <div className="text-xs">End: {contract.endDate}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleViewContract(contract.id)}
                              title="View Contract"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDownloadContract(contract.id)}
                              title="Download Contract"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => router.push("/seller/contracts/new")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Request New Contract
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Terms & Conditions</h3>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="platform-fee">
                    <AccordionTrigger>Platform Fee Structure</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Our platform charges a standard 20% fee on all sales. This fee is non-negotiable and covers:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Payment processing</li>
                          <li>Platform maintenance and development</li>
                          <li>Customer service</li>
                          <li>Marketing and promotion</li>
                          <li>Fraud protection</li>
                        </ul>
                        <p className="text-sm">
                          The fee is automatically deducted from each sale before the remaining amount is distributed
                          according to your profit sharing agreement.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="profit-sharing">
                    <AccordionTrigger>Profit Sharing with Community</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          You can choose to share a percentage of your profits (after our 20% platform fee) with your
                          NFT community. This is entirely optional but can help drive community engagement and support.
                        </p>
                        <p className="text-sm">
                          The profit sharing percentage can be set individually for each product, allowing you to create
                          different incentive structures for different product lines.
                        </p>
                        <p className="text-sm">Example profit distribution for a $100 sale with 15% community share:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Platform Fee (20%): $20.00</li>
                          <li>Remaining Profit: $80.00</li>
                          <li>Community Share (15% of $80.00): $12.00</li>
                          <li>Your Profit: $68.00</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="payment-terms">
                    <AccordionTrigger>Payment Terms</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Payments are processed and distributed on a bi-weekly basis. All sales made during a two-week
                          period will be paid out on the 1st and 15th of each month.
                        </p>
                        <p className="text-sm">You can choose to receive payments via:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Bank transfer</li>
                          <li>PayPal</li>
                          <li>Cryptocurrency (ETH or USDC)</li>
                        </ul>
                        <p className="text-sm">
                          A minimum balance of $50 is required for payouts. If your balance is below this threshold, it
                          will roll over to the next payment period.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="intellectual-property">
                    <AccordionTrigger>Intellectual Property Rights</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          By listing products on our platform, you confirm that you have the legal right to create and
                          sell merchandise based on the NFT collection you represent.
                        </p>
                        <p className="text-sm">
                          You retain all intellectual property rights to your designs and products, but grant us a
                          non-exclusive license to display, market, and sell your products on our platform.
                        </p>
                        <p className="text-sm">
                          If your NFT collection is based on licensed IP (e.g., a brand collaboration), you must provide
                          documentation proving you have the right to create merchandise based on that IP.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="termination">
                    <AccordionTrigger>Contract Termination</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Either party may terminate the agreement with 30 days&apos; written notice. Upon termination:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Your products will be removed from the platform</li>
                          <li>Any pending orders will be fulfilled</li>
                          <li>Final payments will be processed according to the regular payment schedule</li>
                        </ul>
                        <p className="text-sm">We reserve the right to terminate agreements immediately in cases of:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Violation of platform terms</li>
                          <li>Intellectual property infringement</li>
                          <li>Fraudulent activity</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Need Custom Terms?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  If you need custom contract terms or have specific requirements for your NFT collection, please
                  contact our partnerships team.
                </p>
                <Button variant="outline">Contact Partnerships Team</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

