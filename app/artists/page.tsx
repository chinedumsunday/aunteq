"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ArtistModal from "@/components/ArtistModal"

const artists = [
  {
    id: 1,
    name: "CryptoArtist",
    image: "/placeholder.svg",
    description: "Creator of the famous CryptoPunks collection",
    bio: "CryptoArtist has been at the forefront of the NFT revolution, creating iconic digital art that has captured the imagination of collectors worldwide.",
    artStyle: "Pixel art with a focus on unique character traits and rare attributes.",
  },
  {
    id: 2,
    name: "NFTMaster",
    image: "/placeholder.svg",
    description: "Known for the Bored Ape Yacht Club series",
    bio: "NFTMaster is a digital artist who specializes in creating vibrant, cartoon-style animal characters that have become highly sought after in the NFT space.",
    artStyle: "Colorful, cartoon-style illustrations with a focus on anthropomorphic animals.",
  },
  // Add more artists here
]

export default function ArtistsPage() {
  const [selectedArtist, setSelectedArtist] = useState(null)

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary neon-text">Featured Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="bg-card rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 neon-box"
          >
            <Image
              src={artist.image || "/placeholder.svg"}
              alt={artist.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-xl mb-2 text-primary">{artist.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{artist.description}</p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setSelectedArtist(artist)}
              >
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
      {selectedArtist && (
        <ArtistModal artist={selectedArtist} isOpen={!!selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}
    </div>
  )
}

