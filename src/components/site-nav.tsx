"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    function getHeaderOffset(): number {
      const header = document.querySelector("header.sticky")
      return (header as HTMLElement | null)?.offsetHeight ?? 72
    }

    let cachedTops: { id: string; top: number }[] = []

    const computeTops = () => {
      const elements = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[]

      cachedTops = elements.map((el) => {
        const rectTop = el.getBoundingClientRect().top + window.scrollY
        // Account for CSS scroll-margin-top so anchor jumps align correctly
        const smt = parseFloat(
          (getComputedStyle(el).scrollMarginTop || "0").toString()
        )
        return {
          id: el.id,
          top: rectTop - (isNaN(smt) ? 0 : smt),
        }
      })
      // Ensure increasing order just in case DOM order differs
      cachedTops.sort((a, b) => a.top - b.top)
    }

    const onScroll = () => {
      const y = window.scrollY + getHeaderOffset() + 4 // small buffer
      let current = cachedTops[0]?.id ?? sections[0]?.id ?? ""
      for (const s of cachedTops) {
        if (s.top <= y) current = s.id
        else break
      }
      setActiveId(current)
    }

    computeTops()
    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", computeTops)
    window.addEventListener("hashchange", onScroll)
    // Recompute after fonts/layout settle
    const t = window.setTimeout(() => {
      computeTops()
      onScroll()
    }, 300)
    // Also recompute shortly after in case sections mount later
    const t2 = window.setTimeout(() => {
      computeTops()
      onScroll()
    }, 800)

    return () => {
      window.removeEventListener("scroll", onScroll as EventListener)
      window.removeEventListener("resize", computeTops as EventListener)
      window.removeEventListener("hashchange", onScroll as EventListener)
      window.clearTimeout(t)
      window.clearTimeout(t2)
    }
  }, [sections])

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {sections.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "relative transition-colors text-muted-foreground hover:text-primary",
              "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-[width] after:duration-300",
              isActive && "text-primary font-semibold after:w-full"
            )}
            onClick={() => {
              // Allow default anchor navigation, but schedule a read after scroll completes
              // so active state updates immediately on click without waiting for scroll
              window.requestAnimationFrame(() => {
                // Fire a manual hashchange-like update
                const ev = new Event("hashchange")
                window.dispatchEvent(ev)
              })
            }}
          >
            {label}
          </a>
        )
      })}
    </nav>
  )
}

export default SiteNav
