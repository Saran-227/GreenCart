"use client"

import { useState } from "react"
import { ArrowLeft, Users, MapPin, Clock, Leaf, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Mock group shopping data
const activeGroups = [
  {
    id: 1,
    productName: "Bamboo Toothbrush Set (Pack of 4)",
    image: "/images/bamboo-toothbrush.png",
    targetQuantity: 20,
    currentQuantity: 15,
    pricePerUnit: 999,
    groupPrice: 799,
    savings: 200,
    location: "Koramangala, Bangalore",
    timeLeft: "2 days",
    organizer: "Priya S.",
    members: ["Rahul K.", "Anita M.", "Suresh P.", "Maya R."],
    carbonSaving: "2.5kg CO₂",
    deliveryDate: "Dec 20, 2024",
  },
  {
    id: 2,
    productName: "Organic Cotton Tote Bags (Set of 3)",
    image: "/images/cotton-tote-bag.png",
    targetQuantity: 15,
    currentQuantity: 12,
    pricePerUnit: 699,
    groupPrice: 549,
    savings: 150,
    location: "HSR Layout, Bangalore",
    timeLeft: "1 day",
    organizer: "Amit T.",
    members: ["Kavya L.", "Ravi N.", "Deepa S."],
    carbonSaving: "1.8kg CO₂",
    deliveryDate: "Dec 19, 2024",
  },
  {
    id: 3,
    productName: "Solar Power Bank (10000mAh)",
    image: "/images/solar-power-bank.png",
    targetQuantity: 10,
    currentQuantity: 7,
    pricePerUnit: 2299,
    groupPrice: 1999,
    savings: 300,
    location: "Indiranagar, Bangalore",
    timeLeft: "3 days",
    organizer: "Neha K.",
    members: ["Vikram A.", "Pooja M.", "Arjun R."],
    carbonSaving: "3.2kg CO₂",
    deliveryDate: "Dec 21, 2024",
  },
]

const myGroups = [
  {
    id: 4,
    productName: "Stainless Steel Water Bottles",
    image: "/images/steel-water-bottle.png",
    targetQuantity: 12,
    currentQuantity: 8,
    pricePerUnit: 1499,
    groupPrice: 1299,
    savings: 200,
    location: "Whitefield, Bangalore",
    timeLeft: "4 days",
    organizer: "You",
    members: ["Sanjay P.", "Meera K.", "Rohit S."],
    carbonSaving: "2.1kg CO₂",
    deliveryDate: "Dec 22, 2024",
  },
]

export default function GroupShopping() {
  const [selectedLocation, setSelectedLocation] = useState("Koramangala, Bangalore")
  const [showCreateGroup, setShowCreateGroup] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-3 h-3 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const joinGroup = (groupId: number) => {
    alert(`Joined group ${groupId}! You'll receive updates about the group order.`)
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
          <div className="flex items-center gap-2">
            <Users className="text-white w-6 h-6" />
            <h1 className="text-xl font-bold text-white">Group Shopping</h1>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="text-green-600 w-5 h-5" />
          <h2 className="text-lg font-bold text-black">Eco-Friendly Group Orders</h2>
        </div>
        <p className="text-gray-700 text-sm">
          Join group orders to reduce packaging waste, delivery trips, and carbon footprint while saving money!
        </p>
      </div>

      <div className="px-4 py-4">
        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="pl-10"
              placeholder="Enter your location"
            />
          </div>
        </div>

        {/* Create Group Button */}
        <Button
          onClick={() => setShowCreateGroup(true)}
          className="w-full mb-4 bg-green-500 hover:bg-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Group Order
        </Button>

        {/* My Groups Section */}
        {myGroups.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-black mb-3">My Group Orders</h3>
            {myGroups.map((group) => (
              <Card key={group.id} className="mb-4 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={group.image || "/placeholder.svg"}
                      alt={group.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-black text-sm mb-1">{group.productName}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{group.location}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                        <span>
                          {group.currentQuantity}/{group.targetQuantity} joined
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {group.timeLeft} left
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-bold text-green-600">₹{group.groupPrice}</span>
                          <span className="text-xs text-gray-500 line-through ml-1">₹{group.pricePerUnit}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">Organizer</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Active Groups Section */}
        <h3 className="text-lg font-bold text-black mb-3">Active Group Orders Near You</h3>
        {activeGroups.map((group) => (
          <Card key={group.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex gap-3 mb-3">
                <img
                  src={group.image || "/placeholder.svg"}
                  alt={group.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-black text-sm mb-1">{group.productName}</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{group.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-gray-600">Organized by {group.organizer}</span>
                    <div className="flex">{renderStars(5)}</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>
                    {group.currentQuantity}/{group.targetQuantity} people joined
                  </span>
                  <span>{Math.round((group.currentQuantity / group.targetQuantity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(group.currentQuantity / group.targetQuantity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Group Details */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="font-semibold text-blue-800">Group Price</div>
                  <div className="text-blue-600">₹{group.groupPrice}</div>
                  <div className="text-gray-500 line-through">₹{group.pricePerUnit}</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="font-semibold text-green-800">Carbon Saved</div>
                  <div className="text-green-600">{group.carbonSaving}</div>
                  <div className="text-gray-500">per person</div>
                </div>
              </div>

              {/* Time and Delivery */}
              <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {group.timeLeft} left
                </span>
                <span>Delivery: {group.deliveryDate}</span>
              </div>

              {/* Members */}
              <div className="mb-3">
                <div className="text-xs text-gray-600 mb-1">Members:</div>
                <div className="flex flex-wrap gap-1">
                  {group.members.slice(0, 3).map((member, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                  {group.members.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{group.members.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Join Button */}
              <Button
                onClick={() => joinGroup(group.id)}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                size="sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Group (Save ₹{group.savings})
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Benefits Section */}
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Group Shopping Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">💰</span>
              </div>
              <div>
                <div className="font-semibold text-black text-sm">Save Money</div>
                <div className="text-xs text-gray-600">Bulk pricing reduces cost per item</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">🌍</span>
              </div>
              <div>
                <div className="font-semibold text-black text-sm">Reduce Carbon Footprint</div>
                <div className="text-xs text-gray-600">Fewer delivery trips and less packaging</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">👥</span>
              </div>
              <div>
                <div className="font-semibold text-black text-sm">Build Community</div>
                <div className="text-xs text-gray-600">Connect with eco-conscious neighbors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-4">
            <h3 className="text-lg font-bold text-black mb-4">Create Group Order</h3>
            <p className="text-sm text-gray-600 mb-4">
              Feature coming soon! You'll be able to create group orders for any eco-friendly product.
            </p>
            <Button onClick={() => setShowCreateGroup(false)} className="w-full">
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
