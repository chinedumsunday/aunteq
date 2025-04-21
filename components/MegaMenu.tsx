"use client"

interface MegaMenuProps {
  category: string
  onClose: () => void
}

export default function MegaMenu({ category, onClose }: MegaMenuProps) {
  // Different content based on category
  const getCategoryContent = () => {
    switch (category) {
      case "men":
        return {
          title: "Men's Collection",
          sections: [
            {
              title: "Clothing",
              links: ["T-Shirts", "Hoodies", "Jackets", "Pants", "Shorts", "Accessories"],
            },
            {
              title: "Collections",
              links: ["Bored Ape", "CryptoPunks", "Azuki", "Doodles", "World of Women"],
            },
            {
              title: "Featured",
              links: ["New Arrivals", "Best Sellers", "Sale", "Exclusive Drops"],
            },
          ],
        }
      case "women":
        return {
          title: "Women's Collection",
          sections: [
            {
              title: "Clothing",
              links: ["T-Shirts", "Hoodies", "Jackets", "Dresses", "Skirts", "Accessories"],
            },
            {
              title: "Collections",
              links: ["Bored Ape", "CryptoPunks", "Azuki", "Doodles", "World of Women"],
            },
            {
              title: "Featured",
              links: ["New Arrivals", "Best Sellers", "Sale", "Exclusive Drops"],
            },
          ],
        }
      case "collections":
        return {
          title: "NFT Collections",
          sections: [
            {
              title: "Popular Collections",
              links: ["Bored Ape Yacht Club", "CryptoPunks", "Azuki", "Doodles", "World of Women"],
            },
            {
              title: "Artists",
              links: ["Featured Artists", "New Artists", "Collaborations"],
            },
            {
              title: "Special Editions",
              links: ["Limited Drops", "Exclusive Merch", "Collector's Items"],
            },
          ],
        }
      default:
        return {
          title: "",
          sections: [],
        }
    }
  }

  const content = getCategoryContent()

  return (
    <div className="bg-card border-b border-muted">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-4">
            <h2 className="text-xl font-bold mb-4">{content.title}</h2>
          </div>

          {content.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-primary mb-2">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm hover:text-primary"
                      onClick={(e) => {
                        e.preventDefault()
                        onClose()
                        // Navigation logic here
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Trending Now</h3>
              <p className="text-sm mb-4">Check out our latest drops from your favorite artists!</p>
              <a href="#" className="text-sm text-primary hover:underline">
                Shop Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

