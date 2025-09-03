import { UIMessage } from "ai"
import { initializeApp, credential, apps, firestore } from "firebase-admin"

if (!apps.length) {
  initializeApp({
    credential: credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!),
    ),
  })
}

export async function saveChatHistoryToDb(messages: UIMessage[], id: string) {
  try {
    console.log("Saving chat history to database:", id)
    const db = firestore()
    const chatRef = db.collection("chats").doc(id)
    await chatRef.set({ messages })
    console.log("Chat history saved to database:", id)
  } catch (error) {
    console.error("Error saving chat history to database:", error)
  }
}
