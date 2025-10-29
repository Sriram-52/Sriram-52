import { Pinecone } from "@pinecone-database/pinecone"
import fs from "fs/promises"
import * as cheerio from "cheerio"
import axios from "axios"
import { generateEmbedding } from "@/lib/bot/embeddings"

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!)

interface Chunk {
  id: string
  text: string
  metadata: {
    section: string
    [key: string]: string | string[] | boolean | undefined
  }
}

interface JSONChunk {
  id: string
  text: string
  metadata: {
    section?: string
    [key: string]: string | string[] | boolean | undefined
  }
}

async function deleteExistingData() {
  console.log("Deleting existing data from Pinecone...")
  await index.deleteAll()
  console.log("Existing data deleted successfully.")
}

async function loadFromJSON(): Promise<Chunk[]> {
  console.log("Loading content from JSON file...")
  const portfolioContent = await fs.readFile(
    "./scripts/portfolio-content.json",
    "utf-8",
  )
  const data: JSONChunk[] = JSON.parse(portfolioContent)
  const chunks: Chunk[] = data.map((item) => ({
    id: item.id,
    text: item.text,
    metadata: {
      section: item.metadata?.section || "general",
      ...item.metadata,
    },
  }))
  console.log(`✅ Loaded ${chunks.length} chunks from JSON file`)
  return chunks
}

async function scrapeWebsite(url: string): Promise<Chunk[]> {
  console.log(`Fetching website content from: ${url}`)
  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const chunks: Chunk[] = []
  let chunkId = 1

  // Helper function to extract text and create chunks
  const addChunk = (
    text: string,
    section: string,
    metadata: Record<string, string | string[] | boolean> = {},
  ) => {
    if (text && text.trim().length > 20) {
      // Only add meaningful text chunks
      chunks.push({
        id: `${section}-${chunkId++}`,
        text: text.trim(),
        metadata: { section, ...metadata },
      })
    }
  }

  // Scrape Hero Section
  const heroTitle = $("h1").first().text().trim()
  if (heroTitle) addChunk(heroTitle, "hero", { title: "Hero" })

  const heroDescription = $("main p").first().text().trim()
  if (heroDescription) addChunk(heroDescription, "hero", { description: true })

  // Scrape About Section
  $("#about, [id='about']").each((_, el) => {
    const aboutText = $(el).find("p").text().trim()
    if (aboutText) {
      addChunk(aboutText, "about", { title: "About Me" })
    }
  })

  // Scrape Skills Section
  $("section#skills").each((_, el) => {
    $(el)
      .find("Card, .card")
      .each((_, card) => {
        const skillGroup = $(card).find("h2, h3").text().trim()
        const skills = $(card)
          .find("Badge, .badge, span")
          .map((_, badge) => $(badge).text().trim())
          .get()
          .filter(Boolean)
          .join(", ")

        if (skillGroup && skills) {
          addChunk(`${skillGroup}: ${skills}`, "skills", {
            category: skillGroup,
            items: skills,
          })
        }
      })

    // Also extract individual skill items
    $(el)
      .find("Badge, .badge")
      .each((_, badge) => {
        const skill = $(badge).text().trim()
        if (skill && skill.length > 2) {
          addChunk(skill, "skills-item", { skill })
        }
      })
  })

  // Scrape Experience Section
  $("section#experience").each((_, el) => {
    $(el)
      .find("Card, .card")
      .each((_, card) => {
        const company = $(card).find("h2, h3").first().text().trim()
        const description = $(card).find("p").first().text().trim()
        const items = $(card)
          .find("li")
          .map((_, li) => $(li).text().trim())
          .get()

        if (company) {
          const fullText = [company, description, ...items]
            .filter(Boolean)
            .join(". ")
          if (fullText) {
            addChunk(fullText, "experience", { company })
          }
        }

        // Add individual list items
        items.forEach((item) => {
          if (item && item.length > 20) {
            addChunk(item, "experience-item", { company })
          }
        })
      })
  })

  // Scrape Projects Section
  $("section#projects").each((_, el) => {
    $(el)
      .find("Card, .card")
      .each((_, card) => {
        const title = $(card).find("h2, h3").first().text().trim()
        const description = $(card).find("p").first().text().trim()
        const stack = $(card)
          .find("Badge, .badge")
          .map((_, badge) => $(badge).text().trim())
          .get()
          .filter(Boolean)

        if (title && description) {
          const fullText = `${title}: ${description}. Stack: ${stack.join(", ")}`
          addChunk(fullText, "projects", {
            title,
            stack,
          })
        }
      })
  })

  // Scrape Education Section
  $("section#education").each((_, el) => {
    $(el)
      .find("Card, .card")
      .each((_, card) => {
        const school = $(card).find("h2, h3").first().text().trim()
        const degree = $(card).find("p").first().text().trim()
        const details = $(card)
          .find("p")
          .slice(1)
          .map((_, p) => $(p).text().trim())
          .get()
          .join(" ")

        if (school && degree) {
          const fullText = `${school}. ${degree}. ${details}`.trim()
          addChunk(fullText, "education", {
            school,
            degree,
          })
        }
      })
  })

  // Scrape Certifications Section
  $("section#certifications").each((_, el) => {
    $(el)
      .find("Card, .card")
      .each((_, card) => {
        const title = $(card).find("h2, h3").first().text().trim()
        const description = $(card).find("p").first().text().trim()
        const details = $(card)
          .find("p")
          .slice(1)
          .map((_, p) => $(p).text().trim())
          .get()
          .join(" ")

        if (title && description) {
          const fullText = `${title}: ${description}. ${details}`.trim()
          addChunk(fullText, "certifications", { title })
        }
      })
  })

  // Scrape Contact Section
  $("section#contact").each((_, el) => {
    const links = $(el)
      .find("a[href]")
      .map((_, a) => $(a).text().trim())
      .get()
      .filter(Boolean)
      .join(", ")

    if (links) {
      addChunk(`Contact links: ${links}`, "contact", {})
    }
  })

  console.log(`✅ Scraped ${chunks.length} chunks from the website`)
  return chunks
}

async function uploadChunksToPinecone(chunks: Chunk[]) {
  console.log(`\nUploading ${chunks.length} chunks to Pinecone...\n`)

  for (const item of chunks) {
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
}

async function populatePinecone() {
  // Get the source: "json" or "website"
  const source = process.env.DATA_SOURCE || "json"
  const deleteExisting = process.env.DELETE_EXISTING === "true"

  console.log(`Starting to populate Pinecone with ${source} data...\n`)

  try {
    // Delete existing data
    if (deleteExisting) {
      await deleteExistingData()
    }

    let chunks: Chunk[]

    if (source === "website") {
      // Scrape the website
      const websiteUrl =
        process.env.WEBSITE_URL ||
        "http://localhost:3000" ||
        "https://sriram-52.vercel.app"
      chunks = await scrapeWebsite(websiteUrl)
      console.log(`\nExtracted ${chunks.length} content chunks from website\n`)
    } else {
      // Load from JSON file
      chunks = await loadFromJSON()
      console.log(`\nLoaded ${chunks.length} content chunks from JSON\n`)
    }

    // Upload chunks to Pinecone
    await uploadChunksToPinecone(chunks)

    console.log("\n✅ Finished populating Pinecone!")
  } catch (error) {
    console.error("❌ Error populating Pinecone:", error)
    throw error
  }
}

// Run the script
populatePinecone().catch(console.error)
