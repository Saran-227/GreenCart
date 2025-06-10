"use client"

import { useState } from "react"
import { Search, ShoppingCart, Star, Leaf, Camera, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock product data
const ecoProducts = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    price: 999,
    originalPrice: 1299,
    image: "/images/bamboo-toothbrush.png",
    ecoRating: 5,
    discount: 19,
    description: "100% biodegradable bamboo toothbrushes",
    ecoFeatures: ["Biodegradable", "Plastic-free", "Sustainable bamboo"],
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag",
    price: 699,
    originalPrice: 999,
    image: "/images/cotton-tote-bag.png",
    ecoRating: 4,
    discount: 31,
    description: "Reusable organic cotton shopping bag",
    ecoFeatures: ["Organic cotton", "Reusable", "Fair trade"],
  },
  {
    id: 3,
    name: "Solar Power Bank",
    price: 2299,
    originalPrice: 2999,
    image: "/images/solar-power-bank.png",
    ecoRating: 4,
    discount: 25,
    description: "Portable solar-powered charging device",
    ecoFeatures: ["Solar powered", "Renewable energy", "Long-lasting"],
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    price: 1499,
    originalPrice: 1999,
    image: "/images/steel-water-bottle.png",
    ecoRating: 5,
    discount: 24,
    description: "Insulated stainless steel bottle",
    ecoFeatures: ["BPA-free", "Reusable", "Durable"],
  },
  {
    id: 5,
    name: "Beeswax Food Wraps",
    price: 1299,
    originalPrice: 1699,
    image: "/images/beeswax-wraps.png",
    ecoRating: 5,
    discount: 23,
    description: "Natural alternative to plastic wrap",
    ecoFeatures: ["Biodegradable", "Reusable", "Natural beeswax"],
  },
  {
    id: 6,
    name: "LED Smart Bulbs",
    price: 1799,
    originalPrice: 2299,
    image: "/images/led-bulbs.png",
    ecoRating: 3,
    discount: 23,
    description: "Energy-efficient smart LED bulbs",
    ecoFeatures: ["Energy efficient", "Long-lasting", "Smart controls"],
  },
]

export default function AmazonGreenCart() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showKnowMore, setShowKnowMore] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const filteredProducts = ecoProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const addToCart = (product) => {
    setCartCount((prev) => prev + 1)
  }

  const openKnowMore = (product) => {
    setSelectedProduct(product)
    setShowKnowMore(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-400 to-sky-500 px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          {/* Amazon Logo */}
          <div className="flex items-center">
            <span className="text-white font-bold text-xl">amazon</span>
            <span className="text-yellow-400 text-sm">.com</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search eco-friendly products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-md border-0 focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>

          {/* User Profile & Cart */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-sky-600 p-2">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <div className="relative">
              <ShoppingCart className="text-white w-6 h-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  {cartCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* GreenCart Banner */}
      <div className="bg-gradient-to-r from-green-50 to-sky-50 px-4 py-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="text-green-600 w-6 h-6" />
          <h1 className="text-xl font-bold text-black">Amazon GreenCart</h1>
        </div>
        <p className="text-gray-700 text-sm">Discover eco-friendly products for a sustainable lifestyle</p>
      </div>

      {/* Product Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border border-gray-200 shadow-sm">
              <CardContent className="p-3">
                {/* Product Image */}
                <div className="relative mb-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">-{product.discount}%</Badge>
                  )}
                </div>

                {/* Product Info */}
                <h3 className="text-sm font-medium text-black mb-2 line-clamp-2">{product.name}</h3>

                {/* Eco Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs text-gray-600">Eco Rating:</span>
                  <div className="flex">{renderStars(product.ecoRating)}</div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-black">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 text-sm"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => openKnowMore(product)}
                    variant="outline"
                    className="w-full border-sky-400 text-sky-600 hover:bg-sky-50 py-2 text-sm"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Know More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Know More Modal */}
      {showKnowMore && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">Product Analysis</h2>
                <Button onClick={() => setShowKnowMore(false)} variant="ghost" size="sm" className="p-1">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Product Image */}
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              {/* Product Details */}
              <h3 className="font-bold text-black mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-700 text-sm mb-4">{selectedProduct.description}</p>

              {/* Eco Features */}
              <div className="mb-4">
                <h4 className="font-semibold text-black mb-2">Eco-Friendly Features:</h4>
                <div className="space-y-1">
                  {selectedProduct.ecoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eco Rating */}
              <div className="mb-4">
                <h4 className="font-semibold text-black mb-2">Eco-Friendliness Rating:</h4>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(selectedProduct.ecoRating)}</div>
                  <span className="text-sm text-gray-600">{selectedProduct.ecoRating}/5 stars</span>
                </div>
              </div>

              {/* AI Analysis Placeholder */}
              <div className="bg-sky-50 p-3 rounded-md mb-4">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  AI Image Analysis
                </h4>
                <p className="text-sm text-gray-700">
                  Connect your OpenAI API key to enable intelligent product component analysis and sustainability
                  insights.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    addToCart(selectedProduct)
                    setShowKnowMore(false)
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                >
                  Add to Cart
                </Button>
                <Button onClick={() => setShowKnowMore(false)} variant="outline" className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
