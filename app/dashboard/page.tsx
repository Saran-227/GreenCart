"use client"

import { useState } from "react"
import { ArrowLeft, Leaf, Trophy, Gift, Coins, TrendingUp, Package, Star, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  joinDate: "March 2024",
  avatar: "/placeholder.svg?height=80&width=80",
  ecoScore: 2850,
  ecoCoins: 450,
  totalSpent: 15750,
  carbonSaved: 12.5, // kg
  plasticSaved: 850, // grams
  treesPlanted: 3,
  level: "Eco Warrior",
  nextLevel: "Green Champion",
  pointsToNextLevel: 150,
}

// Mock purchase history
const purchaseHistory = [
  {
    id: 1,
    date: "2024-12-01",
    items: [
      { name: "Bamboo Toothbrush Set", price: 999, ecoRating: 5, ecoCoins: 50 },
      { name: "Organic Cotton Tote Bag", price: 699, ecoRating: 4, ecoCoins: 35 },
    ],
    total: 1698,
    ecoCoinsEarned: 85,
    status: "Delivered",
  },
  {
    id: 2,
    date: "2024-11-28",
    items: [{ name: "Solar Power Bank", price: 2299, ecoRating: 4, ecoCoins: 90 }],
    total: 2299,
    ecoCoinsEarned: 90,
    status: "Delivered",
  },
  {
    id: 3,
    date: "2024-11-25",
    items: [
      { name: "Stainless Steel Water Bottle", price: 1499, ecoRating: 5, ecoCoins: 75 },
      { name: "Beeswax Food Wraps", price: 1299, ecoRating: 5, ecoCoins: 65 },
    ],
    total: 2798,
    ecoCoinsEarned: 140,
    status: "Delivered",
  },
]

// Achievements data
const achievements = [
  {
    id: 1,
    title: "First Green Purchase",
    description: "Made your first eco-friendly purchase",
    earned: true,
    icon: "🌱",
  },
  { id: 2, title: "Plastic Warrior", description: "Saved 500g of plastic waste", earned: true, icon: "♻️" },
  { id: 3, title: "Carbon Saver", description: "Reduced 10kg of carbon footprint", earned: true, icon: "🌍" },
  { id: 4, title: "Tree Planter", description: "Contributed to planting 3 trees", earned: true, icon: "🌳" },
  { id: 5, title: "Eco Champion", description: "Reach 3000 eco points", earned: false, icon: "🏆" },
  { id: 6, title: "Green Streak", description: "10 consecutive eco purchases", earned: false, icon: "🔥" },
]

// Offers data
const offers = [
  {
    id: 1,
    title: "Free Delivery",
    description: "Spend ₹2000 more to unlock free delivery",
    progress: 75,
    target: 2000,
    current: 1500,
    type: "delivery",
  },
  {
    id: 2,
    title: "10% Cashback",
    description: "Earn 500 more eco coins for 10% cashback",
    progress: 60,
    target: 500,
    current: 300,
    type: "cashback",
  },
  {
    id: 3,
    title: "Premium Membership",
    description: "Reach 3000 eco score for premium benefits",
    progress: 95,
    target: 3000,
    current: 2850,
    type: "membership",
  },
]

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-3 h-3 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
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
            <Leaf className="text-white w-6 h-6" />
            <h1 className="text-xl font-bold text-white">Eco Dashboard</h1>
          </div>
        </div>
      </header>

      {/* User Profile Section */}
      <div className="px-4 py-6 bg-white border-b">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={userData.avatar || "/placeholder.svg"}
            alt={userData.name}
            className="w-16 h-16 rounded-full border-4 border-sky-200"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-black">{userData.name}</h2>
            <p className="text-gray-600 text-sm">{userData.email}</p>
            <p className="text-gray-500 text-xs">Member since {userData.joinDate}</p>
          </div>
          <div className="text-right">
            <Badge className="bg-green-100 text-green-800 mb-1">{userData.level}</Badge>
            <p className="text-xs text-gray-500">Next: {userData.nextLevel}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-sky-600">{userData.ecoScore}</div>
            <div className="text-xs text-gray-600">Eco Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">{userData.ecoCoins}</div>
            <div className="text-xs text-gray-600">Eco Coins</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">₹{userData.totalSpent}</div>
            <div className="text-xs text-gray-600">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{userData.carbonSaved}kg</div>
            <div className="text-xs text-gray-600">CO₂ Saved</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
        <TabsList className="grid w-full grid-cols-4 mt-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Level Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-sky-600" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{userData.level}</span>
                  <span>{userData.nextLevel}</span>
                </div>
                <Progress value={(userData.ecoScore / 3000) * 100} className="h-2" />
                <p className="text-xs text-gray-600">
                  {userData.pointsToNextLevel} more points to reach {userData.nextLevel}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Offers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="w-5 h-5 text-yellow-600" />
                Active Offers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-black">{offer.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {offer.progress}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                  <Progress value={offer.progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {offer.current} / {offer.target}{" "}
                    {offer.type === "delivery" ? "₹" : offer.type === "cashback" ? "coins" : "points"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements
                  .filter((a) => a.earned)
                  .slice(0, 3)
                  .map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Earned</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purchases Tab */}
        <TabsContent value="purchases" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-sky-600" />
                Purchase History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-black">Order #{purchase.id}</p>
                      <p className="text-sm text-gray-600">{purchase.date}</p>
                    </div>
                    <Badge
                      className={
                        purchase.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {purchase.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    {purchase.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                          <span className="text-black">{item.name}</span>
                          <div className="flex items-center gap-1 mt-1">
                            {renderStars(item.ecoRating)}
                            <span className="text-xs text-gray-500">({item.ecoRating}/5)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{item.price}</div>
                          <div className="text-xs text-yellow-600">+{item.ecoCoins} coins</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-black">Total: ₹{purchase.total}</span>
                      <span className="text-sm text-yellow-600 flex items-center gap-1">
                        <Coins className="w-4 h-4" />+{purchase.ecoCoinsEarned}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4 mt-4">
          {/* Eco Coins Balance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                Eco Coins Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{userData.ecoCoins}</div>
                <p className="text-gray-600">Available Eco Coins</p>
                <Button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black">Redeem Coins</Button>
              </div>
            </CardContent>
          </Card>

          {/* All Achievements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                All Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${achievement.earned ? "bg-green-50" : "bg-gray-50"}`}
                  >
                    <span className={`text-2xl ${!achievement.earned ? "grayscale" : ""}`}>{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-sm ${achievement.earned ? "text-black" : "text-gray-500"}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                        {achievement.description}
                      </p>
                    </div>
                    <Badge className={achievement.earned ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}>
                      {achievement.earned ? "Earned" : "Locked"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Impact Tab */}
        <TabsContent value="impact" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Carbon Footprint */}
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{userData.carbonSaved} kg</div>
                <p className="text-sm text-gray-700">Carbon Dioxide Saved</p>
                <p className="text-xs text-gray-500 mt-1">Equivalent to driving 50km less</p>
              </div>

              {/* Plastic Saved */}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{userData.plasticSaved}g</div>
                <p className="text-sm text-gray-700">Plastic Waste Prevented</p>
                <p className="text-xs text-gray-500 mt-1">Equivalent to 17 plastic bottles</p>
              </div>

              {/* Trees Planted */}
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{userData.treesPlanted}</div>
                <p className="text-sm text-gray-700">Trees Planted</p>
                <p className="text-xs text-gray-500 mt-1">Through eco-friendly purchases</p>
              </div>

              {/* Monthly Progress */}
              <div className="space-y-3">
                <h4 className="font-semibold text-black">This Month's Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Eco Purchases</span>
                    <span className="font-semibold">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Eco Coins Earned</span>
                    <span className="font-semibold">315/500</span>
                  </div>
                  <Progress value={63} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
