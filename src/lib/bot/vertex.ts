import { createVertex } from "@ai-sdk/google-vertex"
import { GCP_PROJECT, GCP_LOCATION, googleAuthCredentials } from "./google-cloud"

// Vertex AI provider — bills through the project's Google Cloud (pay-as-you-go)
// billing account rather than Gemini Developer API prepaid credits.
export const vertex = createVertex({
  project: GCP_PROJECT,
  location: GCP_LOCATION,
  googleAuthOptions: {
    credentials: googleAuthCredentials,
  },
})
