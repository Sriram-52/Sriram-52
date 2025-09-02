import { Pinecone } from "@pinecone-database/pinecone"
import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText, UIMessage } from "ai"
import { NextRequest } from "next/server"
import { SYSTEM_PROMPT } from "@/lib/bot/prompt"
import { generateEmbedding } from "@/lib/bot/embeddings"

const MODEL_NAME = process.env.MODEL_NAME || "gemini-1.5-flash"

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!)

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const modelMessages = convertToModelMessages(messages)
    const lastMessage = modelMessages.at(-1)

    let context = ""
    console.log("Last message:", lastMessage)

    if (lastMessage && lastMessage.content) {
      // Query Pinecone for relevant portfolio information
      const queryResponse = await index.query({
        // @ts-expect-error - lastMessage.content is an array of text parts
        vector: await generateEmbedding(lastMessage.content.at(0)?.text ?? ""),
        topK: 5,
        includeMetadata: true,
      })

      // Extract context from Pinecone results
      context = queryResponse.matches
        .map((match) => match.metadata?.text)
        .filter(Boolean)
        .join("\n\n")

      console.log("Context:", context)
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
      messages: modelMessages,
      temperature: 0.7,
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
