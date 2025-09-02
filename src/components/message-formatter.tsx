import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import { Hash, ChevronRight } from "lucide-react"

interface MessageFormatterProps {
  text: string
  className?: string
}

export function MessageFormatter({ text, className }: MessageFormatterProps) {
  // Preprocess text to convert bullet characters to proper markdown
  const preprocessMarkdown = (content: string) => {
    return (
      content
        // Convert bullet character lists to proper markdown (both at start of line and inline)
        .replace(/^•\s+/gm, "- ")
        .replace(/\s•\s+/g, "\n- ")
        // Handle the specific pattern where bullet points are separated by • characters
        .replace(/\s+•\s+/g, "\n- ")
        // Clean up multiple spaces but preserve line structure
        .replace(/[ \t]+/g, " ")
        // Ensure lists have proper line breaks (but don't add to already properly formatted ones)
        .replace(/([^\n])\n- /g, "$1\n\n- ")
        // Clean up excessive newlines but keep proper paragraph breaks
        .replace(/\n{3,}/g, "\n\n")
        // Trim the result
        .trim()
    )
  }

  // Custom component for highlighting metrics (percentages, multipliers, etc.)
  const highlightMetrics = (text: string) => {
    // Split by various patterns to preserve formatting
    const parts = text.split(
      /(\b\d+%\b|\b\d+x\b|\b\d+\+\b|💰|⚡|🚀|🎯|📱|🛡️|🤖|⭐)/g,
    )

    return parts.map((part, index) => {
      // Highlight percentages and important numbers
      if (/\b\d+%\b|\b\d+x\b|\b\d+\+\b/.test(part)) {
        return (
          <span
            key={index}
            className="font-semibold text-primary bg-gradient-to-r from-violet-100 to-cyan-100 dark:from-violet-900/30 dark:to-cyan-900/30 px-1.5 py-0.5 rounded text-xs shadow-sm border border-primary/20"
          >
            {part}
          </span>
        )
      }

      // Emojis - give them a bit more space
      if (/^(💰|⚡|🚀|🎯|📱|🛡️|🤖|⭐)$/.test(part)) {
        return (
          <span key={index} className="ml-1">
            {part}
          </span>
        )
      }

      return <span key={index}>{part}</span>
    })
  }

  // Enhanced text processor for nested content
  const processTextWithMetrics = (text: string) => {
    return highlightMetrics(text)
  }

  return (
    <div className={cn("text-muted-foreground", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom paragraph component with metric highlighting
          p: ({ children, ...props }) => (
            <p className="text-sm leading-relaxed mb-3" {...props}>
              {typeof children === "string"
                ? processTextWithMetrics(children)
                : children}
            </p>
          ),

          // Custom heading components
          h1: ({ children, ...props }) => (
            <h2
              className="font-bold text-base text-foreground mb-3 mt-4 first:mt-0"
              {...props}
            >
              {children}
            </h2>
          ),

          h2: ({ children, ...props }) => (
            <div
              className="flex items-center gap-2 mb-3 mt-4 first:mt-0"
              {...props}
            >
              <Hash className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm text-foreground">
                {children}
              </h3>
            </div>
          ),

          h3: ({ children, ...props }) => (
            <div
              className="flex items-center gap-2 mb-3 mt-4 first:mt-0"
              {...props}
            >
              <Hash className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm text-foreground">
                {children}
              </h4>
            </div>
          ),

          // Custom list components
          ul: ({ children, ...props }) => {
            const { ref: _ref, ...divProps } =
              props as React.HTMLAttributes<HTMLDivElement> & { ref?: unknown }
            void _ref
            return (
              <div className="space-y-2 mb-3" {...divProps}>
                {children}
              </div>
            )
          },

          li: ({ children, ...props }) => {
            const {
              ref: _ref,
              value: _value,
              ...divProps
            } = props as React.HTMLAttributes<HTMLDivElement> & {
              ref?: unknown
              value?: unknown
            }
            void _ref
            void _value
            return (
              <div className="flex gap-2" {...divProps}>
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm leading-relaxed flex-1">
                  {typeof children === "string"
                    ? processTextWithMetrics(children)
                    : children}
                </div>
              </div>
            )
          },

          // Custom code components
          code: ({ children, className, ...props }) => {
            const isInline = !className
            if (isInline) {
              return (
                <span
                  className="bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-900/20 dark:to-cyan-900/20 text-foreground/90 px-1.5 py-0.5 rounded text-xs font-medium border border-primary/20 shadow-sm"
                  {...props}
                >
                  {children}
                </span>
              )
            }
            return (
              <code
                className="block bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-900/20 dark:to-cyan-900/20 text-foreground/90 px-3 py-2 rounded text-xs font-medium overflow-x-auto border border-primary/20 shadow-sm"
                {...props}
              >
                {children}
              </code>
            )
          },

          // Custom strong/bold component
          strong: ({ children, ...props }) => (
            <span className="font-semibold text-foreground" {...props}>
              {children}
            </span>
          ),

          // Custom blockquote component
          blockquote: ({ children, ...props }) => {
            const {
              ref: _ref,
              cite: _cite,
              ...divProps
            } = props as React.HTMLAttributes<HTMLDivElement> & {
              ref?: unknown
              cite?: unknown
            }
            void _ref
            void _cite
            return (
              <div
                className="border-l-2 border-primary/30 pl-3 italic text-muted-foreground/80 mb-3"
                {...divProps}
              >
                {children}
              </div>
            )
          },
        }}
      >
        {preprocessMarkdown(text)}
      </ReactMarkdown>
    </div>
  )
}
