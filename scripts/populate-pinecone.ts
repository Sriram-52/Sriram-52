import { Pinecone } from "@pinecone-database/pinecone"
import dotenv from "dotenv"
import fs from "fs/promises"
import { generateEmbedding } from "@/lib/bot/embeddings"

// Load environment variables
dotenv.config({ path: ".env.local" })

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!)

async function deleteExistingData() {
  console.log("Deleting existing data from Pinecone...")
  await index.deleteAll()
  console.log("Existing data deleted successfully.")
}

async function populatePinecone() {
  console.log("Starting to populate Pinecone with portfolio content...")

  await deleteExistingData()

  const portfolioContent = await fs.readFile(
    "./scripts/portfolio-content.json",
    "utf-8",
  )
  for (const item of JSON.parse(portfolioContent)) {
    try {
      console.log(`Processing: ${item.id}`)

      const embedding = await generateEmbedding(item.text)

      const metadata = {
        text: item.text,
        ...item.metadata,
      }

      await index.upsert([
        {
          id: item.id,
          values: embedding,
          metadata,
        },
      ])

      console.log(`✅ Uploaded: ${item.id}`)

      // Small delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`❌ Error processing ${item.id}:`, error)
    }
  }

  console.log("✅ Finished populating Pinecone!")
}

// Run the script
populatePinecone().catch(console.error)
