import { UIMessage } from "ai"
import * as admin from "firebase-admin"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!),
    ),
  })
  admin.firestore().settings({ ignoreUndefinedProperties: true })
}

export async function saveChatHistoryToDb(messages: UIMessage[], id: string) {
  try {
    console.log("Saving chat history to database:", id)
    const chatRef = admin.firestore().collection("chats").doc(id)
    await chatRef.set({ messages, timestamp: new Date().toISOString() })
    console.log("Chat history saved to database:", id)
  } catch (error) {
    console.error("Error saving chat history to database:", error)
  }
}
