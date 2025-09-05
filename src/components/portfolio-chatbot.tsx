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
import { useRouter, usePathname } from "next/navigation"

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
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasShownInitialPopup, setHasShownInitialPopup] = useState(false)
  const [input, setInput] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

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

      // Keep focus on input for better mobile UX
      if (isMobile) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }
    }
  }

  // Mobile detection and viewport handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Prefetch /chat route for better performance
  useEffect(() => {
    router.prefetch("/chat")
  }, [router])

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
    // Hide hints immediately when user interacts with the chat
    setHasShownInitialPopup(true)
    sessionStorage.setItem("portfolio-chatbot-hint-shown", "true")

    // On mobile, route to dedicated chat page
    if (isMobile) {
      router.push("/chat")
      return
    }

    // On desktop, use dialog
    setIsOpen(!isOpen)
    setIsMinimized(false)

    if (!isOpen) {
      // Auto-focus input on desktop when opening chat
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300) // Wait for animation to complete
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const maximizeChat = () => {
    setIsMinimized(false)
  }

  // Don't show chatbot on chat page
  if (pathname === "/chat") {
    return null
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div
          className={cn(
            "fixed z-50",
            isMobile ? "bottom-6 right-4" : "bottom-6 right-6",
          )}
          style={
            isMobile
              ? {
                  bottom: `max(24px, calc(24px + env(safe-area-inset-bottom)))`,
                  right: `max(16px, calc(16px + env(safe-area-inset-right)))`,
                }
              : undefined
          }
        >
          <Button
            onClick={toggleChat}
            onMouseEnter={() => router.prefetch("/chat")}
            className={cn(
              "rounded-full relative",
              "bg-gradient-brand text-white shadow-elegant",
              "transition-all duration-300 hover:scale-110 hover:shadow-glow",
              "glow-on-hover pulse-glow",
              "touch-manipulation select-none-mobile",
              !hasShownInitialPopup && "animate-pulse",
              isMobile ? "h-16 w-16" : "h-14 w-14",
            )}
            aria-label="Open portfolio assistant - Ask me about Ram's skills and experience"
            title="Portfolio Assistant"
          >
            <MessageCircle className={cn(isMobile ? "h-7 w-7" : "h-6 w-6")} />
            {/* Subtle hint indicator for first-time visitors */}
            {!hasShownInitialPopup && !isOpen && (
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full animate-ping" />
            )}
          </Button>
          {/* Optional tooltip hint that appears briefly */}
          {!hasShownInitialPopup && !isOpen && (
            <div
              className={cn(
                "absolute bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm border animate-fade-in pointer-events-none",
                isMobile
                  ? "bottom-20 right-0 max-w-[200px] text-center"
                  : "bottom-16 right-0 whitespace-nowrap",
              )}
            >
              💬 Ask me about Ram&apos;s experience!
              <div
                className={cn(
                  "absolute border-4 border-transparent border-t-white dark:border-t-gray-900",
                  isMobile
                    ? "top-full right-1/2 transform -translate-x-1/2"
                    : "top-full right-4",
                )}
              ></div>
            </div>
          )}
        </div>
      )}

      {/* Chat Window - Desktop Only */}
      {isOpen && !isMobile && (
        <Card
          ref={chatWindowRef}
          className={cn(
            "fixed z-50 shadow-elegant hover:shadow-glow border transition-all duration-300 flex flex-col",
            "backdrop-blur-xl bg-background/95 border-primary/20 animate-slide-up rounded-lg",
            isMinimized
              ? "bottom-6 right-6 w-80 h-16"
              : "bottom-6 right-6 w-[26rem] h-[32rem] md:w-[32rem] md:h-[40rem]",
          )}
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-brand text-white flex-shrink-0 shadow-lg pb-3 rounded-t-lg">
            <CardTitle className="font-medium flex items-center gap-2 text-sm">
              <Bot className="animate-pulse h-4 w-4" />
              Portfolio Assistant
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={isMinimized ? maximizeChat : minimizeChat}
                className="p-0 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 h-8 w-8"
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
                className="p-0 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 h-8 w-8"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              {/* Messages */}
              <CardContent className="p-4 flex-1 min-h-0 overflow-y-auto space-y-3">
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
                        "px-3 py-2 rounded-lg shadow-sm transition-all duration-200 max-w-[75%]",
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
              <div className="border-t border-primary/10 bg-muted/20 backdrop-blur-sm flex-shrink-0 p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Ram's experience..."
                    className="flex-1 border border-primary/20 rounded-lg bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200 hover:bg-background px-3 py-2 text-sm"
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
                    className="bg-gradient-brand text-white hover:shadow-glow transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 px-3"
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
