// Shared Google Cloud config — reuses the Firebase service account so chat
// (Vertex AI) and chat-history (Firestore) authenticate with the same credentials.

type ServiceAccount = {
  client_email: string
  private_key: string
  project_id: string
}

export const serviceAccount: ServiceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY!,
)

export const GCP_PROJECT = serviceAccount.project_id

export const GCP_LOCATION = process.env.GOOGLE_VERTEX_LOCATION || "us-central1"

// google-auth-library expects snake_case credential fields.
export const googleAuthCredentials = {
  client_email: serviceAccount.client_email,
  private_key: serviceAccount.private_key,
}
