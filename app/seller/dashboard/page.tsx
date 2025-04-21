"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Package, DollarSign, Users, ShieldCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function SellerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the dashboard
  const stats = {
    totalProducts: 12,
    pendingProducts: 2,
    totalSales: 3450.75,
    thisMonth: 1245.5,
    totalCustomers: 87,
    verificationStatus: "verified", // or "pending" or "unverified"
  }

  // Mock recent orders
  const recentOrders = [
    { id: "ORD-001", product: "Bored Ape T-Shirt", date: "2023-05-15", amount: 49.99, status: "Shipped" },
    { id: "ORD-002", product: "CryptoPunk Hoodie", date: "2023-05-14", amount: 79.99, status: "Processing" },
    { id: "ORD-003", product: "Azuki Cap", date: "2023-05-12", amount: 34.99, status: "Delivered" },
    { id: "ORD-004", product: "Doodles Jacket", date: "2023-05-10", amount: 129.99, status: "Shipped" },
  ]

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, track sales, and grow your business</p>
        </div>
        <Button onClick={() => router.push("/seller/new-product")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingProducts} pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">${stats.thisMonth.toFixed(2)} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{stats.verificationStatus}</div>
            {stats.verificationStatus !== "verified" && (
              <Button variant="link" className="p-0 h-auto text-xs" onClick={() => router.push("/seller/verification")}>
                Complete verification
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-none md:flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>You have {recentOrders.length} recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{order.product}</p>
                      <p className="text-sm text-muted-foreground">
                        Order {order.id} • {order.date}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">${order.amount}</div>
                    <div
                      className={`ml-4 text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Sales chart will be displayed here
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Bored Ape T-Shirt</div>
                      <div className="text-sm text-muted-foreground">45%</div>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">CryptoPunk Hoodie</div>
                      <div className="text-sm text-muted-foreground">32%</div>
                    </div>
                    <Progress value={32} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Azuki Cap</div>
                      <div className="text-sm text-muted-foreground">15%</div>
                    </div>
                    <Progress value={15} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Doodles Jacket</div>
                      <div className="text-sm text-muted-foreground">8%</div>
                    </div>
                    <Progress value={8} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
              <CardDescription>Manage your product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">Product management interface will be displayed here</h3>
                <p className="text-muted-foreground mt-2">You can add, edit, and manage your products</p>
                <Button className="mt-4" onClick={() => router.push("/seller/new-product")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and manage your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">Order management interface will be displayed here</h3>
                <p className="text-muted-foreground mt-2">You can track, fulfill, and manage your orders</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5" />
              Marketplace Verification
            </CardTitle>
            <CardDescription>Verify your identity and marketplace presence</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {stats.verificationStatus === "verified"
                ? "Your marketplace is verified. This helps build trust with customers and unlocks additional features."
                : "Complete the verification process to build trust with customers and unlock additional features."}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant={stats.verificationStatus === "verified" ? "outline" : "default"}
              onClick={() => router.push("/seller/verification")}
              className="w-full"
            >
              {stats.verificationStatus === "verified" ? "View Verification" : "Complete Verification"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Contracts & Agreements
            </CardTitle>
            <CardDescription>Manage your contracts and profit sharing agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Review and sign contracts for your products. Set up profit sharing with your community and understand our
              platform fees.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.push("/seller/contracts")} className="w-full">
              Manage Contracts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

