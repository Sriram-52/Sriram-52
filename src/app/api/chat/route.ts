import { convertToModelMessages, streamText, UIMessage } from "ai"
import { NextRequest } from "next/server"
import { SYSTEM_PROMPT } from "@/lib/bot/prompt"
import { findRelevantChunks } from "@/lib/bot/embeddings"
import { vertex } from "@/lib/bot/vertex"
import { saveChatHistoryToDb } from "@/lib/bot/messages"
import { after } from "next/server"
import { checkRatelimit } from "@/lib/rate-limit"

export const maxDuration = 30

const MODEL_NAME = process.env.MODEL_NAME || "gemini-2.5-flash"

export async function POST(req: NextRequest) {
  try {
    const ratelimitResult = await checkRatelimit()

    if (!ratelimitResult) {
      return Response.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const { messages, id }: { messages: UIMessage[]; id: string } =
      await req.json()

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

    // Generate response using Gemini on Vertex AI.
    // Disable "thinking" — Gemini 2.5 models reason before responding by
    // default, which adds several seconds of latency. For this RAG Q&A the
    // answer comes straight from retrieved context, so thinking isn't needed.
    const result = streamText({
      model: vertex(MODEL_NAME),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      },
    })

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onFinish({ messages }) {
        after(saveChatHistoryToDb(messages, id))
      },
    })
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
