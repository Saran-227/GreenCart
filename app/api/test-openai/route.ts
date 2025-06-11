import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Use fetch directly instead of OpenAI SDK
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Hello, this is a test message.",
          },
        ],
        max_tokens: 10,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenAI API Error:", errorData)

      if (response.status === 401) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
      }

      return NextResponse.json(
        {
          error: errorData.error?.message || "API key test failed",
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (data.choices[0]?.message?.content) {
      return NextResponse.json({ success: true, message: "API key is valid" })
    } else {
      return NextResponse.json({ error: "Invalid response from OpenAI" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Error testing OpenAI API:", error)
    return NextResponse.json({ error: "Failed to test API key" }, { status: 500 })
  }
}
