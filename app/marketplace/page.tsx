"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Search, MapPin, Clock, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Mock marketplace data
const marketplaceItems = [
  {
    id: 1,
    title: "Bamboo Laptop Stand - Like New",
    price: 899,
    originalPrice: 1499,
    image: "/images/bamboo-laptop-stand.png",
    condition: "Like New",
    seller: "Priya S.",
    sellerRating: 4.8,
    location: "Koramangala, Bangalore",
    postedTime: "2 hours ago",
    description: "Barely used bamboo laptop stand. Perfect for work from home setup.",
    category: "Electronics",
    ecoRating: 5,
    isLiked: false,
  },
  {
    id: 2,
    title: "Organic Cotton Bedsheet Set",
    price: 1299,
    originalPrice: 2199,
    image: "/images/organic-bedsheet.png",
    condition: "Good",
    seller: "Rahul K.",
    sellerRating: 4.6,
    location: "HSR Layout, Bangalore",
    postedTime: "5 hours ago",
    description: "100% organic cotton bedsheet set. Washed and sanitized.",
    category: "Home & Living",
    ecoRating: 4,
    isLiked: true,
  },
  {
    id: 3,
    title: "Solar Garden Lights (Set of 6)",
    price: 799,
    originalPrice: 1299,
    image: "/images/solar-garden-lights.png",
    condition: "Good",
    seller: "Anita M.",
    sellerRating: 4.9,
    location: "Indiranagar, Bangalore",
    postedTime: "1 day ago",
    description: "Solar-powered garden lights. Works perfectly, just upgrading to newer model.",
    category: "Garden & Outdoor",
    ecoRating: 5,
    isLiked: false,
  },
  {
    id: 4,
    title: "Reusable Glass Food Containers",
    price: 649,
    originalPrice: 999,
    image: "/images/glass-containers.png",
    condition: "Like New",
    seller: "Suresh P.",
    sellerRating: 4.7,
    location: "Whitefield, Bangalore",
    postedTime: "1 day ago",
    description: "Set of 5 glass food containers with airtight lids. Excellent condition.",
    category: "Kitchen",
    ecoRating: 4,
    isLiked: false,
  },
  {
    id: 5,
    title: "Jute Shopping Bags (Pack of 3)",
    price: 299,
    originalPrice: 499,
    image: "/images/jute-bags.png",
    condition: "Good",
    seller: "Maya R.",
    sellerRating: 4.5,
    location: "Jayanagar, Bangalore",
    postedTime: "2 days ago",
    description: "Sturdy jute shopping bags. Perfect for grocery shopping.",
    category: "Bags & Accessories",
    ecoRating: 5,
    isLiked: true,
  },
  {
    id: 6,
    title: "Wooden Desk Organizer",
    price: 549,
    originalPrice: 899,
    image: "/images/wooden-organizer.png",
    condition: "Good",
    seller: "Vikram A.",
    sellerRating: 4.8,
    location: "Electronic City, Bangalore",
    postedTime: "3 days ago",
    description: "Handcrafted wooden desk organizer. Minor scratches but fully functional.",
    category: "Office Supplies",
    ecoRating: 4,
    isLiked: false,
  },
]

const categories = [
  "All",
  "Electronics",
  "Home & Living",
  "Kitchen",
  "Garden & Outdoor",
  "Bags & Accessories",
  "Office Supplies",
]

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showSellModal, setShowSellModal] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([2, 5])

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-3 h-3 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const renderEcoStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-3 h-3 ${index < rating ? "fill-green-400 text-green-400" : "text-gray-300"}`} />
    ))
  }

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const contactSeller = (item: any) => {
    alert(`Contacting ${item.seller} about "${item.title}"`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-400 to-sky-500 px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-sky-600 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">EcoMarketplace</h1>
            <p className="text-sky-100 text-sm">Buy & Sell Pre-loved Eco Items</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search eco-friendly items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sell Button */}
        <Button
          onClick={() => setShowSellModal(true)}
          className="w-full mb-4 bg-green-500 hover:bg-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Sell Your Eco Items
        </Button>

        {/* Category Filter */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                  <Button
                    onClick={() => toggleLike(item.id)}
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs">{item.condition}</Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-black mb-2 line-clamp-2">{item.title}</h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-black">₹{item.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                    <Badge variant="outline" className="text-xs text-green-600">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                    </Badge>
                  </div>

                  {/* Eco Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-gray-600">Eco Rating:</span>
                    <div className="flex">{renderEcoStars(item.ecoRating)}</div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{item.seller}</span>
                      <div className="flex items-center gap-1">
                        <div className="flex">{renderStars(item.sellerRating)}</div>
                        <span className="text-xs text-gray-600">({item.sellerRating})</span>
                      </div>
                    </div>
                  </div>

                  {/* Location and Time */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.postedTime}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>

                  {/* Contact Button */}
                  <Button
                    onClick={() => contactSeller(item)}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    size="sm"
                  >
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-4">
            <h3 className="font-bold text-black mb-3">Why Choose EcoMarketplace?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">♻️</span>
                </div>
                <div>
                  <div className="font-semibold text-black text-sm">Reduce Waste</div>
                  <div className="text-xs text-gray-600">Give items a second life instead of throwing away</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">💰</span>
                </div>
                <div>
                  <div className="font-semibold text-black text-sm">Save Money</div>
                  <div className="text-xs text-gray-600">Buy quality eco items at discounted prices</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">🌱</span>
                </div>
                <div>
                  <div className="font-semibold text-black text-sm">Support Sustainability</div>
                  <div className="text-xs text-gray-600">Promote circular economy and eco-conscious living</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sell Modal */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-4">
            <h3 className="text-lg font-bold text-black mb-4">Sell Your Eco Items</h3>
            <p className="text-sm text-gray-600 mb-4">
              Feature coming soon! You'll be able to list your eco-friendly items for sale to help reduce waste and
              support the circular economy.
            </p>
            <Button onClick={() => setShowSellModal(false)} className="w-full">
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
