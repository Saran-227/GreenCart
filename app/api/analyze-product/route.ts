import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, productName, apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not provided" }, { status: 400 })
    }

    // Initialize the Gemini AI client
    const genAI = new GoogleGenerativeAI(apiKey)

    // Use gemini-1.5-flash for vision capabilities (supports both text and images)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    let result

    if (imageUrl && imageUrl !== "/placeholder.svg") {
      // If we have a real image, use vision analysis
      try {
        // Fetch and convert image to base64
        const imageResponse = await fetch(imageUrl)
        const imageBuffer = await imageResponse.arrayBuffer()
        const base64Image = Buffer.from(imageBuffer).toString("base64")

        const imagePart = {
          inlineData: {
            data: base64Image,
            mimeType: "image/png",
          },
        }

        const prompt = `Analyze this eco-friendly product "${productName}" and provide a detailed analysis. Format your response with clear sections:

Components & Materials:
Provide detailed information about the materials used in this product. Include primary materials, secondary components, manufacturing materials, and any visible certifications or labels.

Eco-Friendly Features:
List and explain the sustainable aspects of this product including renewable materials, biodegradable components, recyclable parts, energy efficiency features, and sustainable manufacturing indicators.

Recycling Instructions:
Provide step-by-step instructions for recycling and disposal:
1. How to disassemble the product if needed
2. Which parts go in which recycling bins
3. Special disposal requirements for any components
4. Local recycling center recommendations
5. Reuse possibilities before disposal

Environmental Impact:
Explain the environmental benefits including carbon footprint reduction, resource conservation, waste reduction impact, and long-term environmental benefits compared to conventional alternatives.

Sustainability Score:
Rate this product from 1-5 stars based on overall eco-friendliness. Explain your rating considering materials, manufacturing, and end-of-life disposal.

Please provide detailed, specific information for each section.`

        result = await model.generateContent([prompt, imagePart])
      } catch (imageError) {
        console.log("Image analysis failed, falling back to text-only analysis:", imageError)
        // Fall back to text-only analysis if image processing fails
        result = await generateTextOnlyAnalysis(model, productName)
      }
    } else {
      // Use text-only analysis for placeholder images
      result = await generateTextOnlyAnalysis(model, productName)
    }

    const response = await result.response
    const analysis = response.text()

    if (!analysis) {
      return NextResponse.json({ error: "No analysis received from Gemini" }, { status: 500 })
    }

    return NextResponse.json({ analysis })
  } catch (error: any) {
    console.error("Error analyzing product:", error)

    // Handle specific Gemini API errors
    if (error.message?.includes("API key")) {
      return NextResponse.json({ error: "Invalid Gemini API key" }, { status: 401 })
    }

    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      return NextResponse.json({ error: "API quota exceeded. Please try again later." }, { status: 429 })
    }

    return NextResponse.json(
      {
        error: "Failed to analyze product. Please check your API key and try again.",
      },
      { status: 500 },
    )
  }
}

async function generateTextOnlyAnalysis(model: any, productName: string) {
  const prompt = `Analyze the eco-friendly product "${productName}" and provide detailed information. Format your response with clear sections:

Components & Materials:
Based on the product name, provide detailed information about the likely materials and components used in this type of product. Include primary materials, secondary components, typical manufacturing materials, and common certifications.

Eco-Friendly Features:
List and explain the sustainable aspects typically found in this product type including renewable materials, biodegradable components, recyclable parts, energy efficiency features, and sustainable manufacturing practices.

Recycling Instructions:
Provide specific step-by-step instructions for recycling and disposal of this product type:
1. How to disassemble the product if needed
2. Which components go in which recycling streams
3. Special disposal requirements for any materials
4. Local recycling options and recommendations
5. Reuse and upcycling possibilities

Environmental Impact:
Explain the environmental benefits of this product type including carbon footprint reduction, resource conservation benefits, waste reduction impact, and long-term environmental advantages compared to conventional alternatives.

Sustainability Score:
Rate this product type from 1-5 stars based on typical eco-friendliness. Explain your rating considering common materials, manufacturing processes, and end-of-life disposal options.

Please provide detailed, specific information for each section based on common characteristics of this product type.`

  return await model.generateContent(prompt)
}
