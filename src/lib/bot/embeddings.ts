import { GoogleGenAI } from "@google/genai"

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "gemini-embedding-001"
const DIMENSIONS = 768

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
