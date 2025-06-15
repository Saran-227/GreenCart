import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    // Get API key from environment variable (server-side only)
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is not set")
      return NextResponse.json({ error: "AI service configuration missing" }, { status: 500 })
    }

    // Initialize the Gemini AI client
    const genAI = new GoogleGenerativeAI(apiKey)

    // Use gemini-1.5-flash model (recommended for most use cases)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt =
      "Hello, this is a test message. Please respond with 'AI service is working correctly with Gemini 1.5 Flash model.'"

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (text) {
      return NextResponse.json({
        success: true,
        message: "AI service is operational",
        response: text,
        model: "gemini-1.5-flash",
      })
    } else {
      return NextResponse.json({ error: "Invalid response from AI service" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Error testing AI service:", error)

    // Handle specific error types without exposing sensitive information
    if (error.message?.includes("API key")) {
      return NextResponse.json({ error: "AI service authentication failed" }, { status: 500 })
    }

    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      return NextResponse.json({ error: "AI service quota exceeded" }, { status: 429 })
    }

    if (error.message?.includes("not found")) {
      return NextResponse.json({ error: "AI model configuration error" }, { status: 500 })
    }

    return NextResponse.json(
      {
        error: "AI service is temporarily unavailable",
      },
      { status: 500 },
    )
  }
}
