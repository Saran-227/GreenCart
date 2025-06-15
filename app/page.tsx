"use client"

import { useState } from "react"
import { Search, ShoppingCart, Star, Leaf, User, Users, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ProductAnalysisModal } from "@/components/product-analysis-modal"

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
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)
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

  const openAnalysisModal = (product) => {
    setSelectedProduct(product)
    setShowAnalysisModal(true)
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

      {/* Quick Actions */}
      <div className="px-4 py-4 bg-white border-b">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/group-shopping">
            <Card className="border-green-200 hover:bg-green-50 transition-colors">
              <CardContent className="p-3 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-black text-sm">Group Shopping</h3>
                <p className="text-xs text-gray-600">Save money & reduce carbon footprint</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/marketplace">
            <Card className="border-blue-200 hover:bg-blue-50 transition-colors">
              <CardContent className="p-3 text-center">
                <Recycle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-black text-sm">EcoMarketplace</h3>
                <p className="text-xs text-gray-600">Buy & sell pre-loved eco items</p>
              </CardContent>
            </Card>
          </Link>
        </div>
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
                    onClick={() => openAnalysisModal(product)}
                    variant="outline"
                    className="w-full border-purple-400 text-purple-600 hover:bg-purple-50 py-2 text-sm"
                  >
                    <Leaf className="w-4 h-4 mr-1" />
                    Gemini Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Analysis Modal */}
      <ProductAnalysisModal
        product={selectedProduct}
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
        onAddToCart={addToCart}
      />
    </div>
  )
}
