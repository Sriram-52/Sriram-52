"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, UIMessage } from "ai"
import { Button } from "@/components/ui/button"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageFormatter } from "./message-formatter"

const SUGGESTIONS = [
  "What's his biggest migration project?",
  "Tell me about his AI work",
  "What's his tech stack?",
  "Why should we hire Sriram?",
]

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi 👋 I'm Sriram's AI assistant. Don't just read the resume — ask me anything about his experience, projects, or how he works.",
      },
    ],
  },
]

export function HeroChat() {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    messages: initialMessages,
  })

  const hasConversation = messages.length > 1

  const submit = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || status !== "ready") return
    sendMessage({ text: trimmed })
    setInput("")
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit(input)
  }

  // Scroll the messages container (not the page) to the latest message
  useEffect(() => {
    if (hasConversation && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, hasConversation])

  return (
    <div className="rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-xl shadow-elegant overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 bg-gradient-brand text-white px-4 py-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        <Bot className="h-4 w-4" />
        <span className="text-sm font-medium">Sriram&apos;s AI Assistant</span>
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-white/80">
          <Sparkles className="h-3.5 w-3.5" /> Ask anything
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "overflow-y-auto px-4 py-4 space-y-3 transition-all duration-300",
          hasConversation ? "h-72 md:h-80" : "h-auto",
        )}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex text-sm gap-3",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center">
                <Bot className="text-white h-4 w-4" />
              </div>
            )}
            <div
              className={cn(
                "px-3 py-2 rounded-2xl shadow-sm max-w-[80%]",
                message.role === "user"
                  ? "bg-gradient-brand text-white ml-auto"
                  : "bg-muted/70 backdrop-blur-sm",
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
        {status === "submitted" && (
          <div className="flex text-sm justify-start gap-3 animate-slide-up">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center">
              <Bot className="text-white h-4 w-4" />
            </div>
            <div className="bg-muted/70 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex text-sm justify-start gap-3 animate-slide-up">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <Bot className="text-destructive h-4 w-4" />
            </div>
            <div className="bg-destructive/10 text-destructive px-3 py-2 rounded-2xl shadow-sm max-w-[80%]">
              Something went wrong reaching the assistant. Please try again in a
              moment.
            </div>
          </div>
        )}
      </div>

      {/* Suggestion chips — only before a conversation starts */}
      {!hasConversation && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              disabled={status !== "ready"}
              className="rounded-full border border-primary/20 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary hover:scale-105 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-primary/10 bg-muted/20 backdrop-blur-sm p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Sriram's experience..."
            className="flex-1 border border-primary/20 rounded-xl bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200 hover:bg-background px-4 py-2.5 text-sm"
            disabled={status !== "ready"}
            aria-label="Ask Sriram's AI assistant a question"
          />
          <Button
            type="submit"
            disabled={status !== "ready" || !input.trim()}
            className="bg-gradient-brand text-white hover:shadow-glow transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 px-4"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
