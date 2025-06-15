"use client"

import { useState } from "react"
import { ArrowLeft, Sparkles, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Settings() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)

  const handleTestConnection = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setTestResult(`✅ AI service is working perfectly!\n\nModel: ${data.model}\nStatus: ${data.message}`)
      } else {
        setTestResult(`❌ AI service test failed:\n${data.error}`)
      }
    } catch (error) {
      setTestResult("❌ Failed to test AI service connection")
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
        {/* AI Service Status */}
        <Card className="mb-6 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              AI Analysis Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 mb-3">
              ✅ Gemini AI analysis is fully configured and ready to use! No setup required.
            </p>
            <div className="bg-green-100 p-3 rounded-md mb-3">
              <p className="text-xs text-green-800">
                <strong>Status:</strong> Active and secure
              </p>
              <p className="text-xs text-green-800">
                <strong>Model:</strong> gemini-1.5-flash (Vision + Text)
              </p>
              <p className="text-xs text-green-800">
                <strong>Security:</strong> Server-side authentication
              </p>
            </div>
            <Button onClick={handleTestConnection} disabled={isTesting} variant="outline" className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              {isTesting ? "Testing AI Service..." : "Test AI Service"}
            </Button>
            {testResult && (
              <div className="mt-3 p-3 bg-white rounded-md border">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap">{testResult}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Information */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-blue-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">🔒</span>
                </div>
                <div>
                  <div className="font-semibold">Secure API Management</div>
                  <div className="text-xs text-blue-600">
                    All API keys are stored securely on the server and never exposed to users
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">🛡️</span>
                </div>
                <div>
                  <div className="font-semibold">Privacy Protection</div>
                  <div className="text-xs text-blue-600">
                    Product analysis is processed securely without storing personal data
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">⚡</span>
                </div>
                <div>
                  <div className="font-semibold">Optimized Performance</div>
                  <div className="text-xs text-blue-600">
                    Server-side processing ensures fast and reliable AI analysis
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Information */}
        <Card className="mb-6 bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">🤖 AI Model Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-purple-700">
              <p>
                <strong>Current Model:</strong> Google Gemini 1.5 Flash
              </p>
              <p>
                <strong>Capabilities:</strong> Advanced text generation, image analysis, vision understanding
              </p>
              <p>
                <strong>Specialization:</strong> Product sustainability analysis, component identification, recycling
                guidance
              </p>
              <p>
                <strong>Performance:</strong> Fast response times with detailed analysis
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Use AI Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-700">
              <ol className="list-decimal list-inside space-y-2">
                <li>Browse eco-friendly products in the main catalog</li>
                <li>Click "Gemini Analysis" button on any product</li>
                <li>Get instant detailed analysis including:</li>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Components & Materials breakdown</li>
                  <li>Eco-friendly features identification</li>
                  <li>Step-by-step recycling instructions</li>
                  <li>Environmental impact assessment</li>
                  <li>AI-generated sustainability score</li>
                </ul>
                <li>Use the information to make informed eco-conscious purchases</li>
              </ol>
            </div>

            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Tip:</strong> The AI analysis works best with actual product images and provides more detailed
                insights for well-known eco-friendly products.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
