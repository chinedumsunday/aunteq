import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: 1,
    name: "Bored Ape Yacht Club",
    image: "/placeholder.svg",
    description:
      "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs—unique digital collectibles living on the Ethereum blockchain.",
    link: "/collections/bored-ape",
  },
  {
    id: 2,
    name: "CryptoPunks",
    image: "/placeholder.svg",
    description:
      "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard.",
    link: "/collections/cryptopunks",
  },
  {
    id: 3,
    name: "Azuki",
    image: "/placeholder.svg",
    description:
      "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet.",
    link: "/collections/azuki",
  },
]

export default function CollectionSpotlight() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {collections.map((collection) => (
        <div key={collection.id} className="bg-background rounded-lg overflow-hidden shadow-lg">
          <Image
            src={collection.image || "/placeholder.svg"}
            alt={collection.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{collection.description}</p>
            <Button asChild variant="outline">
              <Link href={collection.link}>Explore Collection</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

