import Link from "next/link"
import Image from "next/image"

interface CategoryCardProps {
  title: string
  image: string
  href: string
}

export default function CategoryCard({ title, image, href }: CategoryCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white font-semibold text-lg p-4 w-full text-center">{title}</h3>
        </div>
      </div>
    </Link>
  )
}

