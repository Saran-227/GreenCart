import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Initialize the Gemini AI client
    const genAI = new GoogleGenerativeAI(apiKey)

    // Use gemini-1.5-flash model (recommended for most use cases)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt =
      "Hello, this is a test message. Please respond with 'API key is working correctly with Gemini 1.5 Flash model.'"

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (text) {
      return NextResponse.json({
        success: true,
        message: "Gemini API key is valid",
        response: text,
        model: "gemini-1.5-flash",
      })
    } else {
      return NextResponse.json({ error: "Invalid response from Gemini" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Error testing Gemini API:", error)

    // Handle specific error types
    if (error.message?.includes("API key")) {
      return NextResponse.json({ error: "Invalid Gemini API key" }, { status: 401 })
    }

    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      return NextResponse.json({ error: "API quota exceeded" }, { status: 429 })
    }

    if (error.message?.includes("not found")) {
      return NextResponse.json({ error: "Model not found. Using gemini-1.5-flash." }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: `Failed to test API key: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
