"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RewardsPage() {
  const [selectedToken, setSelectedToken] = useState("")

  const mockRewards = [
    { nft: "Bored Ape #1234", amount: 0.5 },
    { nft: "CryptoPunk #5678", amount: 0.3 },
    // Add more mock rewards
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Rewards</h1>
      <div className="bg-background rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
        <ul className="space-y-4 mb-6">
          {mockRewards.map((reward, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{reward.nft}</span>
              <span className="font-bold">{reward.amount} ETH</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Select value={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
            </SelectContent>
          </Select>
          <Button>Claim Rewards</Button>
        </div>
      </div>
    </div>
  )
}

