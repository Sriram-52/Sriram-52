import type { Metadata } from "next"
import "./global.css"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"
import { PortfolioChatbot } from "@/components/portfolio-chatbot"
import { resumeInfo } from "@/lib/resume"

export const metadata: Metadata = {
  metadataBase: new URL(resumeInfo.portfolio),
  alternates: {
    canonical: "/",
  },
  title:
    "Sriram Nyshadham | Full Stack Developer — Web, Mobile & AI Portfolio",
  description:
    "Sriram Nyshadham (Sri Ram Mohan Nyshadham) is a Full Stack Developer building scalable web, mobile, and AI applications. Explore his projects in AI, mobile-first apps, and cloud tooling.",
  keywords: [
    "Sriram Nyshadham",
    "Sriram Nyshadham portfolio",
    "Sriram Nyshadham Full Stack Developer",
    "Sri Ram Mohan Nyshadham",
    "Sriram Mohan Nyshadham",
    "Sriram Nyshadham developer",
    "Sriram developer",
    "Full Stack Portfolio",
    "Full Stack Developer",
    "React Native",
    "Next.js",
    "NestJS",
    "Cloud Tools",
  ],
  openGraph: {
    title: "Sriram Nyshadham | Full Stack Developer Portfolio",
    description:
      "A showcase of web, mobile, and AI projects built by Sriram. Dive into creative code and cloud tools.",
    url: resumeInfo.portfolio,
    siteName: "Sriram's Portfolio",
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
    title: "Sriram Nyshadham | Web, Mobile & AI",
    description:
      "AI bots • Mobile apps • Cloud tools—all built by Sriram. Explore the code and creativity.",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sriram Nyshadham",
  alternateName: ["Sri Ram Mohan Nyshadham", "Sriram Mohan Nyshadham"],
  url: resumeInfo.portfolio,
  image:
    "https://sv2ux2zlpqtgqq1k.public.blob.vercel-storage.com/Sriram_OG-min.png",
  jobTitle: "Full Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marietta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  sameAs: [resumeInfo.linkedIn, resumeInfo.github],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <Toaster />
          {children}
          <PortfolioChatbot />
        </Providers>
      </body>
    </html>
  )
}
