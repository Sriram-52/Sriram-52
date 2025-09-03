"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DefaultChatTransport, UIMessage } from "ai"
import { MessageFormatter } from "./message-formatter"

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi 👋 I'm Ram's portfolio assistant. \nI can tell you about his skills, projects, and experience. \nTry asking: “What's your biggest migration project?”",
      },
    ],
  },
]

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasShownInitialPopup, setHasShownInitialPopup] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  // Show subtle hints for each session
  useEffect(() => {
    const hasSeenHintThisSession = sessionStorage.getItem(
      "portfolio-chatbot-hint-shown",
    )
    if (!hasSeenHintThisSession) {
      // Show hints for 8 seconds, then mark as seen for this session
      const timer = setTimeout(() => {
        setHasShownInitialPopup(true)
        sessionStorage.setItem("portfolio-chatbot-hint-shown", "true")
      }, 8000) // Show hints for 8 seconds

      return () => clearTimeout(timer)
    } else {
      setHasShownInitialPopup(true)
    }
  }, [])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
    // Hide hints immediately when user interacts with the chat
    if (!isOpen) {
      setHasShownInitialPopup(true)
      sessionStorage.setItem("portfolio-chatbot-hint-shown", "true")
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const maximizeChat = () => {
    setIsMinimized(false)
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={toggleChat}
            className={cn(
              "h-14 w-14 rounded-full relative",
              "bg-gradient-brand text-white shadow-elegant",
              "transition-all duration-300 hover:scale-110 hover:shadow-glow",
              "glow-on-hover pulse-glow",
              !hasShownInitialPopup && "animate-pulse",
            )}
            aria-label="Open portfolio assistant - Ask me about Ram's skills and experience"
            title="Portfolio Assistant"
          >
            <MessageCircle className="h-6 w-6" />
            {/* Subtle hint indicator for first-time visitors */}
            {!hasShownInitialPopup && !isOpen && (
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full animate-ping" />
            )}
          </Button>
          {/* Optional tooltip hint that appears briefly */}
          {!hasShownInitialPopup && !isOpen && (
            <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap border animate-fade-in pointer-events-none">
              💬 Ask me about Ram&apos;s experience!
              <div className="absolute top-full right-4 border-4 border-transparent border-t-white dark:border-t-gray-900"></div>
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-6 right-6 z-50 shadow-elegant hover:shadow-glow border transition-all duration-300 flex flex-col",
            "backdrop-blur-xl bg-background/95 border-primary/20 animate-slide-up",
            isMinimized
              ? "w-80 h-16"
              : "w-[26rem] h-[32rem] md:w-[32rem] md:h-[40rem]",
          )}
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-brand text-white rounded-t-lg flex-shrink-0 shadow-lg">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4 animate-pulse" />
              Portfolio Assistant
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={isMinimized ? maximizeChat : minimizeChat}
                className="h-8 w-8 p-0 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="h-8 w-8 p-0 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 text-sm",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center animate-pulse">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] px-3 py-2 rounded-lg shadow-sm transition-all duration-200",
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
                            .map((part) =>
                              part.type === "text" ? part.text : "",
                            )
                            .join("")}
                        />
                      )}
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {(status === "submitted" || status === "streaming") &&
                  status === "submitted" && (
                    <div className="flex gap-3 text-sm justify-start animate-slide-up">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-brand shadow-elegant flex items-center justify-center animate-pulse">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted/70 backdrop-blur-sm text-muted-foreground px-3 py-2 rounded-lg shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-primary/10 flex-shrink-0 bg-muted/20 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Ram's experience..."
                    className="flex-1 px-3 py-2 text-sm border border-primary/20 rounded-md bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200 hover:bg-background"
                    disabled={status !== "ready"}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={status !== "ready" || !input.trim()}
                    className="px-3 bg-gradient-brand text-white hover:shadow-glow transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  )
}
