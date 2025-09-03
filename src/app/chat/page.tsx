"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { DefaultChatTransport, UIMessage } from "ai"
import { MessageFormatter } from "@/components/message-formatter"
import { useRouter } from "next/navigation"

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi 👋 I'm Ram's portfolio assistant. \nI can tell you about his skills, projects, and experience. \nTry asking: \"What's your biggest migration project?\"",
      },
    ],
  },
]

export default function ChatPage() {
  const router = useRouter()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    messages: initialMessages,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input.trim() })
      setInput("")
    }
  }

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-focus input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 500)
  }, [])

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      style={{
        paddingTop: `max(0px, env(safe-area-inset-top))`,
        paddingLeft: `max(0px, env(safe-area-inset-left))`,
        paddingRight: `max(0px, env(safe-area-inset-right))`,
        paddingBottom: `max(0px, env(safe-area-inset-bottom))`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-brand text-white shadow-lg border-b border-primary/20">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 animate-pulse" />
            <h1 className="font-medium text-lg">Portfolio Assistant</h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex text-sm gap-3",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center animate-pulse">
                <Bot className="text-white h-4 w-4" />
              </div>
            )}
            <div
              className={cn(
                "px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 max-w-[85%]",
                message.role === "user"
                  ? "bg-gradient-brand text-white ml-auto hover:shadow-glow"
                  : "bg-muted/70 backdrop-blur-sm hover:bg-muted",
              )}
            >
              {message.role === "user" ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-white">
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <span key={index}>{part.text}</span>
                    ) : null,
                  )}
                </p>
              ) : (
                <MessageFormatter
                  text={message.parts
                    .map((part) => (part.type === "text" ? part.text : ""))
                    .join("")}
                />
              )}
            </div>
            {message.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center">
                <User className="text-white h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {(status === "submitted" || status === "streaming") &&
          status === "submitted" && (
            <div className="flex text-sm justify-start animate-slide-up gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center animate-pulse">
                <Bot className="text-white h-4 w-4" />
              </div>
              <div className="bg-muted/70 backdrop-blur-sm text-muted-foreground px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-primary/10 bg-background/80 backdrop-blur-sm p-4 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Ram..."
            className="flex-1 border border-primary/20 rounded-xl bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200 hover:bg-background px-4 py-3 text-base no-zoom-mobile"
            disabled={status !== "ready"}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <Button
            type="submit"
            size="sm"
            disabled={status !== "ready" || !input.trim()}
            className="bg-gradient-brand text-white hover:shadow-glow transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 px-4 py-3 min-h-[52px] min-w-[52px] rounded-xl"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
