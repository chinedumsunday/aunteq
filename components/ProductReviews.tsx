"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, User, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface Review {
  id: number
  author: string
  avatar?: string
  rating: number
  title: string
  comment: string
  date: string
  isVerified: boolean
  helpfulCount: number
  images?: string[]
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    author: "Michael T.",
    avatar: "/placeholder.svg",
    rating: 5,
    title: "Exceptional quality and design",
    comment:
      "This shirt exceeded my expectations. The material feels premium and the print quality is outstanding. The design is exactly like the NFT artwork. Definitely worth the price!",
    date: "2 months ago",
    isVerified: true,
    helpfulCount: 24,
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    author: "Sarah K.",
    rating: 4,
    title: "Great shirt, runs a bit small",
    comment:
      "Love the design and quality of the shirt. The material is soft and comfortable. Only reason for 4 stars is that it runs a bit small. I'd recommend sizing up if you're between sizes.",
    date: "1 month ago",
    isVerified: true,
    helpfulCount: 12,
  },
  {
    id: 3,
    author: "David L.",
    avatar: "/placeholder.svg",
    rating: 5,
    title: "Perfect addition to my collection",
    comment:
      "As a BAYC holder, I had to get this shirt. The design is spot on and the quality is excellent. Highly recommend to any NFT enthusiast!",
    date: "3 weeks ago",
    isVerified: true,
    helpfulCount: 8,
  },
  {
    id: 4,
    author: "Emma R.",
    rating: 3,
    title: "Good but expected more",
    comment:
      "The design is nice but the material isn't as premium as I expected for this price point. It's comfortable enough but I was hoping for something more substantial.",
    date: "2 weeks ago",
    isVerified: false,
    helpfulCount: 5,
  },
  {
    id: 5,
    author: "Jason M.",
    avatar: "/placeholder.svg",
    rating: 5,
    title: "Absolute fire!",
    comment:
      "This is my favorite piece of NFT merch so far. The quality is top-notch and the design gets a lot of compliments. Will definitely be buying more from this collection.",
    date: "1 week ago",
    isVerified: true,
    helpfulCount: 15,
    images: ["/placeholder.svg"],
  },
]

interface ProductReviewsProps {
  productId: number
  rating: number
  reviewCount: number
}

export default function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [sortBy, setSortBy] = useState("recent")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  })

  // Calculate rating distribution
  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  const filteredReviews = filterRating ? reviews.filter((review) => review.rating === filterRating) : reviews

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "helpful") {
      return b.helpfulCount - a.helpfulCount
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else if (sortBy === "lowest") {
      return a.rating - b.rating
    }
    return 0
  })

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      ))
  }

  const markHelpful = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, helpfulCount: review.helpfulCount + 1 } : review,
      ),
    )

    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback!",
    })
  }

  const handleSubmitReview = () => {
    // Validate form
    if (!newReview.title.trim() || !newReview.comment.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields before submitting",
        variant: "destructive",
      })
      return
    }

    // Add new review (in a real app, this would be an API call)
    const newReviewObj: Review = {
      id: reviews.length + 1,
      author: "You",
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: "Just now",
      isVerified: true,
      helpfulCount: 0,
    }

    setReviews([newReviewObj, ...reviews])
    setIsWriteReviewOpen(false)
    setNewReview({ rating: 5, title: "", comment: "" })

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    })
  }

  const clearFilter = () => {
    setFilterRating(null)
  }

  return (
    <div className="space-y-8">
      {/* Review Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-bold mb-2">{rating.toFixed(1)}</div>
          <div className="flex mb-2">{renderStars(rating)}</div>
          <p className="text-sm text-muted-foreground mb-4">Based on {reviewCount} reviews</p>

          <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
            <DialogTrigger asChild>
              <Button>Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
                <DialogDescription>Share your experience with this product to help other customers.</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= newReview.rating ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Review Title</Label>
                  <input
                    id="title"
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Summarize your experience"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Review</Label>
                  <Textarea
                    id="comment"
                    placeholder="What did you like or dislike? How was the fit?"
                    className="min-h-[100px]"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Add Photos (optional)</Label>
                  <div className="flex items-center justify-center border border-dashed border-muted rounded-md p-4">
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                      <Button variant="outline" size="sm">
                        Upload Photos
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsWriteReviewOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitReview}>Submit Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="col-span-2">
          <h3 className="font-medium mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <button
                  className="flex items-center w-16"
                  onClick={() => setFilterRating(filterRating === star ? null : star)}
                >
                  <span className="text-sm mr-1">{star}</span>
                  <Star className="h-4 w-4 fill-primary text-primary" />
                </button>
                <Progress value={(ratingCounts[star] / reviewCount) * 100} className="h-2 flex-grow" />
                <span className="text-sm w-8 text-right">{ratingCounts[star]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Reviews Filtering and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Reviews</h3>
          {filterRating && (
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm">
              <span>★ {filterRating}</span>
              <button onClick={clearFilter} className="hover:text-primary">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No reviews match your filter</p>
            <Button variant="outline" onClick={clearFilter}>
              Clear Filter
            </Button>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <div key={review.id} className="border-b border-muted pb-6">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {review.avatar ? (
                      <AvatarImage src={review.avatar} alt={review.author} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{review.author}</div>
                    {review.isVerified && <div className="text-xs text-green-500">Verified Purchase</div>}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{review.date}</div>
              </div>

              <div className="flex mb-2">{renderStars(review.rating)}</div>

              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-sm mb-4">{review.comment}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, i) => (
                    <div key={i} className="w-16 h-16 relative rounded overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => markHelpful(review.id)}
                className="text-xs flex items-center gap-1"
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                Helpful ({review.helpfulCount})
              </Button>
            </div>
          ))
        )}
      </div>

      {reviews.length > 5 && (
        <div className="flex justify-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
    </div>
  )
}

function X(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

