"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Eye, EyeOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Settings() {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    // Load saved API key on component mount
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("gemini_api_key")
      if (savedKey) {
        setApiKey(savedKey)
      }
    }
  }, [])

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setSaveStatus("error")
      return
    }

    setIsSaving(true)

    try {
      // Save to localStorage
      localStorage.setItem("gemini_api_key", apiKey)
      setSaveStatus("success")

      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      alert("Please enter an API key first")
      return
    }

    setIsTesting(true)

    try {
      const response = await fetch("/api/test-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(`✅ API key is valid!\n\nModel: ${data.model}\nGemini response: "${data.response}"`)
      } else {
        alert(`❌ API key test failed:\n${data.error}`)
      }
    } catch (error) {
      alert("❌ Failed to test API key")
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-400 to-sky-500 px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-sky-600 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Settings</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* API Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Google Gemini AI Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your API key is stored locally and used for AI product analysis
              </p>
            </div>

            {saveStatus === "success" && (
              <Badge className="bg-green-100 text-green-800">API key saved successfully!</Badge>
            )}

            {saveStatus === "error" && <Badge className="bg-red-100 text-red-800">Please enter a valid API key</Badge>}

            <div className="flex gap-2">
              <Button onClick={handleSaveApiKey} disabled={isSaving} className="bg-sky-500 hover:bg-sky-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save API Key"}
              </Button>

              <Button onClick={handleTestConnection} variant="outline" disabled={!apiKey.trim() || isTesting}>
                <Sparkles className="w-4 h-4 mr-2" />
                {isTesting ? "Testing..." : "Test Connection"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pre-configured API Key Notice */}
        <Card className="mb-6 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">✅ API Key Pre-configured</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 mb-3">
              Great news! A Gemini API key has been pre-configured for you. You can start using AI analysis right away!
            </p>
            <Button
              onClick={() => {
                setApiKey("AIzaSyAGX2bzdzHC5eHPikRXW8u3uptutPYxCmo")
                localStorage.setItem("gemini_api_key", "AIzaSyAGX2bzdzHC5eHPikRXW8u3uptutPYxCmo")
                setSaveStatus("success")
                setTimeout(() => setSaveStatus("idle"), 3000)
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              Use Pre-configured Key
            </Button>
          </CardContent>
        </Card>

        {/* Model Information */}
        <Card className="mb-6 bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">🤖 Model Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-purple-700">
              <p>
                <strong>Current Model:</strong> gemini-1.5-flash
              </p>
              <p>
                <strong>Capabilities:</strong> Text generation, Image analysis, Vision understanding
              </p>
              <p>
                <strong>Rate Limits:</strong> 15 requests per minute (free tier)
              </p>
              <p>
                <strong>Best For:</strong> Product analysis, sustainability assessment, recycling guidance
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to get your own Gemini API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-700">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Go to{" "}
                  <a
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 underline"
                  >
                    Google AI Studio
                  </a>
                </li>
                <li>Sign in with your Google account</li>
                <li>Click "Create API Key"</li>
                <li>Copy the generated key (starts with "AIzaSy")</li>
                <li>Paste it in the field above and save</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Gemini API has a generous free tier with 15 requests per minute. Perfect for
                analyzing eco-friendly products!
              </p>
            </div>

            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Fixed:</strong> Now using the correct gemini-1.5-flash model with proper SDK integration. No
                more "model not found" errors!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
