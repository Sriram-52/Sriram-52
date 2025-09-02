"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrolled / maxHeight, 1)

      setScrollProgress(progress)

      // Show button when page is scrolled down more than 300px
      if (scrolled > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Throttled scroll handler for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full shadow-elegant hover:shadow-glow bg-gradient-brand text-primary-foreground hover:scale-110 transition-all duration-200 pulse-glow float-gentle group relative overflow-hidden"
        aria-label="Scroll to top"
      >
        {/* Scroll progress indicator */}
        <div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          style={{
            background: `conic-gradient(from 0deg, rgba(255,255,255,0.3) ${scrollProgress * 360}deg, transparent ${scrollProgress * 360}deg)`,
          }}
        />
        <ChevronUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 relative z-10" />
      </Button>
    </div>
  )
}
