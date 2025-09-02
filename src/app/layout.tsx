import type { Metadata } from "next"
import "./global.css"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"
import { PortfolioChatbot } from "@/components/portfolio-chatbot"
import { resumeInfo } from "@/lib/resume"

export const metadata: Metadata = {
  title: "Sri Ram Mohan Nyshadham | Senior Full Stack Developer (Web & Mobile)",
  description:
    "Senior Full-Stack Developer with 5+ years of experience building scalable, high-performance web and mobile applications using React, Next.js, React Native, NestJS, Prisma, and GCP serverless solutions. Expert in delivering cost-optimized, secure, and user-focused products.",
  keywords: [
    "Sri Ram Mohan Nyshadham",
    "Full Stack Developer",
    "Mobile App Developer",
    "React Developer",
    "Next.js Developer",
    "NestJS Developer",
    "React Native Developer",
    "TypeScript Developer",
    "GCP Developer",
    "Web and Mobile Developer",
    "Senior Software Engineer",
    "Portfolio",
  ],
  openGraph: {
    title:
      "Sri Ram Mohan Nyshadham | Senior Full Stack Developer (Web & Mobile)",
    description:
      "Building scalable, secure, and high-performance web & mobile applications using React, Next.js, NestJS, Prisma, and GCP.",
    url: resumeInfo.portfolio,
    siteName: "Sri Ram Mohan Nyshadham Portfolio",
    images: [
      {
        url: "https://sv2ux2zlpqtgqq1k.public.blob.vercel-storage.com/Sriram_OG-min.png",
        width: 1200,
        height: 630,
        alt: "Sri Ram Mohan Nyshadham Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sri Ram Mohan Nyshadham | Senior Full Stack Developer (Web & Mobile)",
    description:
      "Scalable web & mobile apps with React, Next.js, NestJS, Prisma, and GCP. 5+ years experience delivering secure, cost-optimized solutions.",
    images: [
      {
        url: "https://sv2ux2zlpqtgqq1k.public.blob.vercel-storage.com/Sriram_OG-min.png",
        width: 1200,
        height: 630,
        alt: "Sri Ram Mohan Nyshadham Portfolio Preview",
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
