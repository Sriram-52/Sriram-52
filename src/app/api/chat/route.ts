import { convertToModelMessages, streamText, UIMessage } from "ai"
import { NextRequest } from "next/server"
import { SYSTEM_PROMPT } from "@/lib/bot/prompt"
import { findRelevantChunks } from "@/lib/bot/embeddings"
import { google } from "@ai-sdk/google"

const MODEL_NAME = process.env.MODEL_NAME || "gemini-2.0-flash"

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    // Query Pinecone for relevant portfolio information
    let context = ""
    if (messages.at(-1)) {
      const textPart = messages
        .at(-1)
        ?.parts.find((part) => part.type === "text")
      context = await findRelevantChunks(textPart?.text ?? "")
    }

    // Create system prompt with retrieved context
    const systemPrompt = SYSTEM_PROMPT.replace("{{context}}", context).replace(
      "{{time}}",
      new Date().toISOString(),
    )

    // Generate response using Gemini
    const result = streamText({
      model: google(MODEL_NAME),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to process chat message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
