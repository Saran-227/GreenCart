"use client"

import { useState, useEffect } from "react"
import { Sparkles, X, Loader2, Leaf, Recycle, Star, Settings, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ProductAnalysisModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: any) => void
}

export function ProductAnalysisModal({ product, isOpen, onClose, onAddToCart }: ProductAnalysisModalProps) {
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState<string | null>(null)

  useEffect(() => {
    // Get API key from localStorage when component mounts
    if (typeof window !== "undefined") {
      const storedApiKey = localStorage.getItem("gemini_api_key")
      setApiKey(storedApiKey)
    }
  }, [isOpen])

  const analyzeProduct = async () => {
    if (!apiKey) {
      setError("Please configure your Gemini API key in settings first")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: product.image,
          productName: product.name,
          apiKey: apiKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze product")
      }

      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze product")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const formatAnalysis = (text: string) => {
    console.log("Raw analysis text:", text) // Debug log

    // Clean up the text and split into sections
    const cleanText = text.replace(/\*\*/g, "").trim()

    // Try to split by section headers
    const sectionPatterns = [
      /Components?\s*&?\s*Materials?/i,
      /Eco-Friendly\s*Features?/i,
      /Recycling\s*Instructions?/i,
      /Environmental\s*Impact/i,
      /Sustainability\s*Score/i,
    ]

    const sections = []

    // Split text by major sections
    const remainingText = cleanText
    let componentsContent = ""
    let ecoFeaturesContent = ""
    let recyclingContent = ""
    let impactContent = ""
    let scoreContent = ""

    // Extract Components & Materials section
    const componentsMatch = remainingText.match(
      /(?:Components?\s*&?\s*Materials?)[:\s]*([\s\S]*?)(?=(?:Eco-Friendly|Recycling|Environmental|Sustainability|\n\n\n)|$)/i,
    )
    if (componentsMatch) {
      componentsContent = componentsMatch[1].trim()
    }

    // Extract Eco-Friendly Features section
    const ecoMatch = remainingText.match(
      /(?:Eco-Friendly\s*Features?)[:\s]*([\s\S]*?)(?=(?:Recycling|Environmental|Sustainability|\n\n\n)|$)/i,
    )
    if (ecoMatch) {
      ecoFeaturesContent = ecoMatch[1].trim()
    }

    // Extract Recycling Instructions section
    const recyclingMatch = remainingText.match(
      /(?:Recycling\s*Instructions?)[:\s]*([\s\S]*?)(?=(?:Environmental|Sustainability|\n\n\n)|$)/i,
    )
    if (recyclingMatch) {
      recyclingContent = recyclingMatch[1].trim()
    }

    // Extract Environmental Impact section
    const impactMatch = remainingText.match(
      /(?:Environmental\s*Impact)[:\s]*([\s\S]*?)(?=(?:Sustainability|\n\n\n)|$)/i,
    )
    if (impactMatch) {
      impactContent = impactMatch[1].trim()
    }

    // Extract Sustainability Score section
    const scoreMatch = remainingText.match(/(?:Sustainability\s*Score)[:\s]*([\s\S]*?)$/i)
    if (scoreMatch) {
      scoreContent = scoreMatch[1].trim()
    }

    // If the above parsing didn't work well, try alternative approach
    if (!componentsContent && !ecoFeaturesContent && !recyclingContent) {
      // Split by double line breaks and try to categorize
      const paragraphs = cleanText.split(/\n\s*\n/).filter((p) => p.trim())

      for (const paragraph of paragraphs) {
        const lowerPara = paragraph.toLowerCase()
        if (
          lowerPara.includes("material") ||
          lowerPara.includes("component") ||
          lowerPara.includes("bamboo") ||
          lowerPara.includes("plastic") ||
          lowerPara.includes("metal")
        ) {
          componentsContent += paragraph + "\n\n"
        } else if (
          lowerPara.includes("eco") ||
          lowerPara.includes("sustainable") ||
          lowerPara.includes("renewable") ||
          lowerPara.includes("biodegradable")
        ) {
          ecoFeaturesContent += paragraph + "\n\n"
        } else if (
          lowerPara.includes("recycl") ||
          lowerPara.includes("disposal") ||
          lowerPara.includes("disassembl") ||
          lowerPara.includes("bin")
        ) {
          recyclingContent += paragraph + "\n\n"
        } else if (
          lowerPara.includes("impact") ||
          lowerPara.includes("carbon") ||
          lowerPara.includes("environment") ||
          lowerPara.includes("footprint")
        ) {
          impactContent += paragraph + "\n\n"
        } else if (lowerPara.includes("score") || lowerPara.includes("star") || lowerPara.includes("rating")) {
          scoreContent += paragraph + "\n\n"
        }
      }
    }

    // Create sections with content
    if (componentsContent) {
      sections.push(
        <div key="components" className="mb-4">
          <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-600" />
            Components & Materials
          </h4>
          <div className="text-sm text-gray-700 bg-orange-50 p-3 rounded-md whitespace-pre-line">
            {componentsContent}
          </div>
        </div>,
      )
    }

    if (ecoFeaturesContent) {
      sections.push(
        <div key="eco-features" className="mb-4">
          <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-600" />
            Eco-Friendly Features
          </h4>
          <div className="text-sm text-gray-700 bg-green-50 p-3 rounded-md whitespace-pre-line">
            {ecoFeaturesContent}
          </div>
        </div>,
      )
    }

    if (recyclingContent) {
      sections.push(
        <div key="recycling" className="mb-4">
          <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
            <Recycle className="w-4 h-4 text-blue-600" />
            Recycling Instructions
          </h4>
          <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-md whitespace-pre-line">{recyclingContent}</div>
        </div>,
      )
    }

    if (impactContent) {
      sections.push(
        <div key="impact" className="mb-4">
          <h4 className="font-semibold text-black mb-2">Environmental Impact</h4>
          <div className="text-sm text-gray-700 bg-green-50 p-3 rounded-md whitespace-pre-line">{impactContent}</div>
        </div>,
      )
    }

    if (scoreContent) {
      const scoreMatch = scoreContent.match(/(\d+)/)
      const score = scoreMatch ? Number.parseInt(scoreMatch[1]) : 4
      sections.push(
        <div key="score" className="mb-4">
          <h4 className="font-semibold text-black mb-2">Gemini AI Sustainability Score</h4>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(score)}</div>
            <span className="text-sm text-gray-600">{score}/5 stars</span>
          </div>
          <div className="text-sm text-gray-700 bg-purple-50 p-3 rounded-md whitespace-pre-line">{scoreContent}</div>
        </div>,
      )
    }

    // Fallback: if no sections were parsed, show the raw text in a better format
    if (sections.length === 0) {
      sections.push(
        <div key="fallback" className="mb-4">
          <h4 className="font-semibold text-black mb-2">Complete AI Analysis</h4>
          <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md whitespace-pre-line">
            {cleanText || "No analysis content received. Please try again."}
          </div>
        </div>,
      )
    }

    return sections
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black">Gemini AI Analysis</h2>
            <Button onClick={onClose} variant="ghost" size="sm" className="p-1">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Product Image */}
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          {/* Product Details */}
          <h3 className="font-bold text-black mb-2">{product.name}</h3>
          <p className="text-gray-700 text-sm mb-4">{product.description}</p>

          {/* Manual Eco Features */}
          <div className="mb-4">
            <h4 className="font-semibold text-black mb-2">Product Features:</h4>
            <div className="space-y-1">
              {product.ecoFeatures.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manual Eco Rating */}
          <div className="mb-4">
            <h4 className="font-semibold text-black mb-2">Product Eco Rating:</h4>
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(product.ecoRating)}</div>
              <span className="text-sm text-gray-600">{product.ecoRating}/5 stars</span>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="bg-purple-50 p-3 rounded-md mb-4">
            <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Gemini AI Analysis
            </h4>

            {!apiKey && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-700 mb-3">
                  Configure your Gemini API key to enable AI product analysis
                </p>
                <Link href="/settings">
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure API Key
                  </Button>
                </Link>
              </div>
            )}

            {apiKey && !analysis && !isAnalyzing && !error && (
              <div>
                <p className="text-sm text-gray-700 mb-3">
                  Get detailed component analysis and recycling instructions using Google Gemini AI.
                </p>
                <Button
                  onClick={analyzeProduct}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze with Gemini AI
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                <span className="ml-2 text-sm text-gray-700">Analyzing with Gemini AI...</span>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm">
                <p>Error: {error}</p>
                <div className="flex gap-2 mt-2">
                  <Button onClick={analyzeProduct} variant="outline" size="sm">
                    Try Again
                  </Button>
                  {error.includes("API key") && (
                    <Link href="/settings">
                      <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                        <Settings className="w-4 h-4 mr-1" />
                        Settings
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {analysis && (
              <div className="space-y-3">
                <Badge className="bg-purple-100 text-purple-800 mb-2">Gemini AI Analysis Complete</Badge>
                {formatAnalysis(analysis)}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
            >
              Add to Cart
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
