import { GoogleGenAI } from "@google/genai"
import { Pinecone } from "@pinecone-database/pinecone"

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "gemini-embedding-001"
const DIMENSIONS = 768

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!)

export async function findRelevantChunks(text: string): Promise<string> {
  const embedding = await generateEmbedding(text)

  const queryResponse = await index.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  })

  return queryResponse.matches
    .map((match) => match.metadata?.text as string)
    .filter(Boolean)
    .join("\n\n")
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const genai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
    })
    const response = await genai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: [text],
      config: {
        outputDimensionality: DIMENSIONS,
      },
    })
    return response.embeddings?.[0].values ?? new Array(DIMENSIONS).fill(0)
  } catch (error) {
    console.error("Error generating embedding:", error)
    return new Array(DIMENSIONS).fill(0)
  }
}
