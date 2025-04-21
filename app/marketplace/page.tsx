"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, X } from "lucide-react"
import ProductGrid from "@/components/ProductGrid"

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCollections, setSelectedCollections] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const collections = [
    { id: "bored-ape", label: "Bored Ape Yacht Club" },
    { id: "cryptopunks", label: "CryptoPunks" },
    { id: "azuki", label: "Azuki" },
    { id: "doodles", label: "Doodles" },
    { id: "world-of-women", label: "World of Women" },
  ]

  const categories = [
    { id: "tshirts", label: "T-Shirts" },
    { id: "hoodies", label: "Hoodies" },
    { id: "jackets", label: "Jackets" },
    { id: "accessories", label: "Accessories" },
    { id: "limited", label: "Limited Editions" },
  ]

  const toggleCollection = (id) => {
    setSelectedCollections(
      selectedCollections.includes(id)
        ? selectedCollections.filter((item) => item !== id)
        : [...selectedCollections, id],
    )
  }

  const toggleCategory = (id) => {
    setSelectedCategories(
      selectedCategories.includes(id) ? selectedCategories.filter((item) => item !== id) : [...selectedCategories, id],
    )
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Banner */}
      <div className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">NFT Merchandise Marketplace</h1>
          <p>Shop the latest drops from your favorite NFT collections</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 space-y-8">
            <div>
              <h3 className="font-semibold mb-4">Price Range</h3>
              <Slider value={priceRange} min={0} max={200} step={5} onValueChange={setPriceRange} className="mb-2" />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Collections</h3>
              <div className="space-y-2">
                {collections.map((collection) => (
                  <div key={collection.id} className="flex items-center">
                    <Checkbox
                      id={`collection-${collection.id}`}
                      checked={selectedCollections.includes(collection.id)}
                      onCheckedChange={() => toggleCollection(collection.id)}
                    />
                    <label htmlFor={`collection-${collection.id}`} className="ml-2 text-sm cursor-pointer">
                      {collection.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm cursor-pointer">
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6 items-center">
              <Button
                variant="outline"
                className="md:hidden flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto flex-1 sm:flex-initial"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded bg-background"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>

            {/* Selected filters */}
            {(selectedCollections.length > 0 || selectedCategories.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCollections.map((id) => {
                  const collection = collections.find((c) => c.id === id)
                  return (
                    <div key={id} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm">
                      {collection.label}
                      <button onClick={() => toggleCollection(id)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
                {selectedCategories.map((id) => {
                  const category = categories.find((c) => c.id === id)
                  return (
                    <div key={id} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm">
                      {category.label}
                      <button onClick={() => toggleCategory(id)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={() => {
                    setSelectedCollections([])
                    setSelectedCategories([])
                  }}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products */}
            <ProductGrid
              searchTerm={searchTerm}
              sortBy={sortBy}
              selectedCollections={selectedCollections}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="fixed inset-0 bg-background z-50 md:hidden overflow-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider value={priceRange} min={0} max={200} step={5} onValueChange={setPriceRange} className="mb-2" />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Collections</h3>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <div key={collection.id} className="flex items-center">
                      <Checkbox
                        id={`mobile-collection-${collection.id}`}
                        checked={selectedCollections.includes(collection.id)}
                        onCheckedChange={() => toggleCollection(collection.id)}
                      />
                      <label htmlFor={`mobile-collection-${collection.id}`} className="ml-2 text-sm">
                        {collection.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`mobile-category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label htmlFor={`mobile-category-${category.id}`} className="ml-2 text-sm">
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedCollections([])
                  setSelectedCategories([])
                  setPriceRange([0, 200])
                }}
              >
                Clear All
              </Button>
              <Button className="flex-1" onClick={() => setShowFilters(false)}>
                View Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

