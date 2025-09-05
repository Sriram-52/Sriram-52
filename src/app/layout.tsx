import type { Metadata } from "next"
import "./global.css"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"
import { PortfolioChatbot } from "@/components/portfolio-chatbot"
import { resumeInfo } from "@/lib/resume"

export const metadata: Metadata = {
  title: "Sri Ram Mohan Nyshadham (Ram) | Dev Portfolio: Web, Mobile & AI",
  description:
    "Explore my projects in AI, mobile-first apps, and cloud tooling—all built with code and curiosity by Ram.",
  keywords: [
    "Sri Ram Mohan Nyshadham",
    "Ram developer",
    "Full Stack Portfolio",
    "AI Chatbot Developer",
    "React Native",
    "Next.js",
    "NestJS",
    "Cloud Tools",
  ],
  openGraph: {
    title: "Sri Ram Mohan Nyshadham | Full Stack Dev Portfolio",
    description:
      "A showcase of web, mobile, and AI projects built by Ram. Dive into creative code and cloud tools.",
    url: resumeInfo.portfolio,
    siteName: "Ram's Portfolio",
    images: [
      {
        url: "https://sv2ux2zlpqtgqq1k.public.blob.vercel-storage.com/Sriram_OG-min.png",
        width: 1200,
        height: 630,
        alt: "Portfolio preview: Sri Ram Mohan Nyshadham",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Ram Mohan Nyshadham | Web, Mobile & AI",
    description:
      "AI bots • Mobile apps • Cloud tools—all built by Ram. Explore the code and creativity.",
    images: [
      {
        url: "https://sv2ux2zlpqtgqq1k.public.blob.vercel-storage.com/Sriram_OG-min.png",
        width: 1200,
        height: 630,
        alt: "Portfolio preview: Sri Ram Mohan Nyshadham",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          <Toaster />
          {children}
          <PortfolioChatbot />
        </Providers>
      </body>
    </html>
  )
}
