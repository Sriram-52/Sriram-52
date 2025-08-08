import {
  MapPin,
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SiteNav } from "@/components/site-nav"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { resumeInfo } from "@/lib/resume"

const skills = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Material-UI",
    "Vite",
  ],
  Backend: ["NestJS", "Prisma", "ZenStack", "Node.js", "REST APIs", "GraphQL"],
  "Mobile Development": ["React Native", "Flutter", "BLE SDKs"],
  "DevOps & Cloud": [
    "GCP (Cloud Run, Cloud Storage)",
    "GitHub Actions",
    "CI/CD",
    "Docker",
  ],
  "Other Tools": [
    "Twilio",
    "Slack APIs",
    "Firebase",
    "Orval",
    "OpenAPI",
    "Recharts",
  ],
}

const projects = [
  {
    title: "Healthcare Automation Platform",
    blurb:
      "Workflow automation with secure data flows; integrations for messaging and scheduling.",
    stack: ["React", "NestJS", "Prisma", "GCP"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "RAG-based Physician Documentation",
    blurb:
      "Retrieval-augmented generation for clinical notes; improves accuracy and reduces time.",
    stack: ["OpenAI", "LangChain", "LangGraph"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "Internal iHealth SDK",
    blurb:
      "BLE device integrations and data synchronization across mobile and backend.",
    stack: ["React Native", "BLE", "iHealth"],
    links: { demo: "#", code: "#" },
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#top" className="font-display text-xl font-bold story-link">
            Sri Ram Mohan Nyshadham
          </a>
          <SiteNav />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="hero" size="sm" className="hover-scale">
              <a
                href={process.env.NEXT_PUBLIC_RESUME_URL}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2" /> Resume
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20">
          {/* Full-bleed background gradient */}
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-20 h-64 w-screen bg-gradient-brand opacity-30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative container mx-auto px-4 grid gap-6 md:grid-cols-[1.5fr_1fr] items-start animate-enter">
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Sri Ram Mohan Nyshadham —
              </h1>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Senior Full Stack Developer
              </h1>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                (Web & Mobile)
              </h1>
              <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
                React, Next.js, React Native, Flutter, Node.js, NestJS, GCP
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Marietta, GA
                </span>
                <a href="#contact" className="inline-flex items-center gap-1">
                  <Mail className="h-4 w-4" />{" "}
                  <span className="story-link">Contact below</span>
                </a>
                <a href="#contact" className="story-link">
                  Available for opportunities
                </a>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Button asChild variant="hero" className="hover-scale">
                  <a href="#contact">Get in touch</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#projects">View projects</a>
                </Button>
                <a
                  aria-label="GitHub"
                  href={resumeInfo.github}
                  className="p-2 rounded-md border hover:bg-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  aria-label="LinkedIn"
                  href={resumeInfo.linkedIn}
                  className="p-2 rounded-md border hover:bg-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Card id="about" className="shadow-elegant scroll-mt-24">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>
                  Impact-driven engineer focused on clarity, performance, and
                  security.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed space-y-3">
                <p>
                  Senior Full Stack Developer (Web & Mobile) with 5+ years of
                  experience delivering scalable, secure, and high-performance
                  applications across web and mobile. Deep expertise in React,
                  React Native, Next.js, NestJS, Prisma, ZenStack, and GCP
                  serverless architecture.
                </p>
                <p>
                  I bring proactive learning, attention to detail, and a strong
                  product mindset-consistently shipping cost-optimized
                  solutions. Experienced in healthcare technology, AI
                  integration, and HIPAA-compliant systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Skills */}
        <section
          id="skills"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Skills
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([group, items]) => (
              <Card key={group} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{group}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {items.map((sk) => (
                    <Badge key={sk} variant="secondary">
                      {sk}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Experience */}
        <section
          id="experience"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Experience
          </h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Atelia Software Inc.{" "}
                  <span className="text-muted-foreground font-normal">
                    — Jun 2021 - Present
                  </span>
                </CardTitle>
                <CardDescription>
                  Senior Developer driving platform architecture, performance,
                  and reliability.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Nest.js monorepo with Prisma & ZenStack RBAC/ABAC.</li>
                  <li>Orval + OpenAPI for auto-generated React Query hooks.</li>
                  <li>Twilio concurrency control + real-time conversations.</li>
                  <li>Slack webhooks integration.</li>
                  <li>
                    SEO-optimized Next.js landing pages (+15% performance).
                  </li>
                  <li>Migration from Flutter to React Native + BLE SDK.</li>
                  <li>Cloud Run migration reducing infra cost by 50%.</li>
                  <li>CI/CD optimizations with GitHub Actions.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Eficens Systems LLC{" "}
                  <span className="text-muted-foreground font-normal">
                    — Mar 2020 - May 2021
                  </span>
                </CardTitle>
                <CardDescription>
                  Full-stack development for a responsive web platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Firebase serverless backend with scalable data model.</li>
                  <li>Responsive React application with Firebase Auth.</li>
                  <li>Deployment and performance optimizations.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Projects */}
        <section
          id="projects"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Card key={p.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {p.title}
                    <span className="sr-only">project links</span>
                  </CardTitle>
                  <CardDescription>{p.blurb}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={p.links.demo} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Demo
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <a href={p.links.code} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </a>
                    </Button>
                  </div> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Education */}
        <section
          id="education"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Education
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Kennesaw State University</CardTitle>
                <CardDescription>
                  MS in Computer Science — GPA: 3.83/4
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  Sasi Institute of Technology and Engineering
                </CardTitle>
                <CardDescription>
                  BTech in Computer Science — GPA: 9.59/10
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Certifications & Awards */}
        <section
          id="certifications"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Certifications & Awards
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>HackerRank Certificates</CardTitle>
                <CardDescription>Node.js, React, SQL, REST API</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>IEEE Xtreme Competition</CardTitle>
                <CardDescription>All India Rank 62</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Contact */}
        <section
          id="contact"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Contact
          </h2>
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Get in touch</CardTitle>
                <CardDescription>
                  Send a quick message and I&apos;ll get back soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick links</CardTitle>
                <CardDescription>
                  Connect on professional networks.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <a
                  href={resumeInfo.github}
                  className="inline-flex items-center gap-2 p-3 rounded-md border hover:bg-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href={resumeInfo.linkedIn}
                  className="inline-flex items-center gap-2 p-3 rounded-md border hover:bg-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <div className="text-sm text-muted-foreground mt-2">
                  <p className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Marietta, GA
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
