"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ContractModal from "./ContractModal"

interface Artist {
  id: number
  name: string
  image: string
  description: string
  bio: string
  artStyle: string
}

interface ArtistModalProps {
  artist: Artist
  isOpen: boolean
  onClose: () => void
}

export default function ArtistModal({ artist, isOpen, onClose }: ArtistModalProps) {
  const [isContractModalOpen, setIsContractModalOpen] = useState(false)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px] bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary neon-text">{artist.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{artist.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Image
              src={artist.image || "/placeholder.svg"}
              alt={artist.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h3 className="font-semibold text-lg text-primary">About the Artist</h3>
            <p className="text-sm text-muted-foreground">{artist.bio}</p>
            <h3 className="font-semibold text-lg text-primary">Art Style</h3>
            <p className="text-sm text-muted-foreground">{artist.artStyle}</p>
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-box"
            onClick={() => setIsContractModalOpen(true)}
          >
            Read Official Contract
          </Button>
        </DialogContent>
      </Dialog>
      <ContractModal
        artistName={artist.name}
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
      />
    </>
  )
}

