"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, useCallback } from "react"

type Section = {
  id: string
  label: string
}

const DEFAULT_SECTIONS: Section[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

export function SiteNav({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: Section[]
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")

  const updateActiveSection = useCallback(() => {
    const headerOffset = 100 // Account for sticky header height plus some buffer
    const scrollPosition = window.scrollY + headerOffset
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Check if we're at the bottom of the page (within 50px)
    const isAtBottom = scrollPosition + windowHeight >= documentHeight - 50

    // If we're at the bottom, always select the last section (contact)
    if (isAtBottom) {
      setActiveId(sections[sections.length - 1]?.id ?? "")
      return
    }

    // Find the section that's currently in view
    let currentSection = sections[0]?.id ?? ""

    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (!element) continue

      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY

      // Check if the element is in view (considering header offset)
      if (elementTop <= scrollPosition) {
        currentSection = section.id
      } else {
        break
      }
    }

    setActiveId(currentSection)
  }, [sections])

  useEffect(() => {
    // Initial calculation
    updateActiveSection()

    // Throttled scroll handler for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateActiveSection)
    window.addEventListener("hashchange", updateActiveSection)

    // Recompute after layout settles
    const timeouts = [
      setTimeout(updateActiveSection, 100),
      setTimeout(updateActiveSection, 500),
      setTimeout(updateActiveSection, 1000),
    ]

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateActiveSection)
      window.removeEventListener("hashchange", updateActiveSection)
      timeouts.forEach(clearTimeout)
    }
  }, [updateActiveSection])

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Smooth scroll to the element
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    // Update active state immediately for better UX
    setActiveId(sectionId)

    // Update URL hash
    window.history.replaceState(null, "", `#${sectionId}`)
  }

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {sections.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            className={cn(
              "relative transition-colors",
              "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-[width] after:duration-300",
              isActive && "text-primary font-semibold after:w-full",
              !isActive && "text-muted-foreground hover:text-primary",
            )}
          >
            {label}
          </button>
        )
      })}
    </nav>
  )
}

export default SiteNav
