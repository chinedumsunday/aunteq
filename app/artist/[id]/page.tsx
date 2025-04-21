import Image from "next/image"
import { Button } from "@/components/ui/button"

const artists = [
  {
    id: 1,
    name: "CryptoArtist",
    image: "/placeholder.svg",
    description: "Creator of the famous CryptoPunks collection",
    bio: "CryptoArtist has been at the forefront of the NFT revolution, creating iconic digital art that has captured the imagination of collectors worldwide.",
  },
  // Add more artists here
]

export default function ArtistProfile({ params }) {
  const artist = artists.find((a) => a.id === Number.parseInt(params.id))

  if (!artist) {
    return <div>Artist not found</div>
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={artist.image || "/placeholder.svg"}
          alt={artist.name}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{artist.name}</h1>
          <p className="text-lg mb-4">{artist.description}</p>
          <p className="mb-6">{artist.bio}</p>
          <Button>View Contract</Button>
        </div>
      </div>
    </div>
  )
}

