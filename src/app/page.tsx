import {
  MapPin,
  Github,
  Linkedin,
  Mail,
  Download,
  // ExternalLink,
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
    "Vue.js",
    "Material-UI",
    "shadcn/ui",
  ],
  Backend: [
    "NestJS",
    "Spring Boot",
    "Node.js",
    "Prisma",
    "REST APIs",
    "GraphQL",
    "Express.js",
  ],
  "Mobile Development": [
    "React Native",
    "Flutter",
    "Android (Java)",
    "Dart",
    "BLE SDKs",
  ],
  Languages: ["TypeScript", "JavaScript", "Java", "Python", "Dart", "C#"],
  "Database & Cloud": [
    "PostgreSQL",
    "Firebase",
    "GCP",
    "MongoDB",
    "Prisma ORM",
    "HIPAA Compliance",
  ],
  "Healthcare & Enterprise": [
    "EMR Systems",
    "HIPAA Compliance",
    "Enterprise RBAC/ABAC",
    "Medical Device Integration",
    "FHIR Standards",
    "Microservices Architecture",
  ],
  "AI & Security": [
    "OpenAI API",
    "LangChain",
    "LangGraph",
    "AI Agents",
    "Computer Vision",
    "RSA Encryption",
    "Machine Learning",
    "RBAC Systems",
  ],
  "DevOps & CI/CD": [
    "GitHub Actions",
    "Docker",
    "Turborepo",
    "Nx Monorepo",
    "React Native CI",
    "Mobile App Deployment",
    "Automated Testing",
  ],
}

const projects = [
  {
    title: "Secure Chat Application",
    blurb:
      "React application with RSA encryption for secure real-time messaging. User-friendly interface with strong security features to protect user communications.",
    stack: ["React", "TypeScript", "RSA Encryption", "Real-time"],
    links: {
      code: "https://github.com/Sriram-52/secure-chat",
    },
  },
  {
    title: "NestJS React RBAC System",
    blurb:
      "Enterprise RBAC system built with NestJS backend and React frontend. Features microservices architecture, and scalable deployment.",
    stack: ["NestJS", "React", "TypeScript"],
    links: {
      code: "https://github.com/Sriram-52/nest-react-rbac",
    },
  },
  {
    title: "Spring Boot Quiz Platform",
    blurb:
      "Educational quiz platform with microservices architecture. Features containerized deployment, and scalable backend services.",
    stack: ["Spring Boot", "Java", "PostgreSQL", "Docker"],
    links: {
      code: "https://github.com/Sriram-52/quiz-app-spring-boot",
    },
  },
  {
    title: "OpenAI Integration Starter",
    blurb:
      "TypeScript application showcasing OpenAI API integration. Features modular architecture for AI-powered applications.",
    stack: ["TypeScript", "OpenAI API", "Node.js", "AI"],
    links: {
      code: "https://github.com/Sriram-52/openai-starter",
    },
  },
  {
    title: "Flutter Redux Todo App",
    blurb:
      "Cross-platform mobile todo application built with Flutter and Redux. Demonstrates state management and mobile UI/UX best practices.",
    stack: ["Flutter", "Dart", "Redux", "Mobile"],
    links: {
      code: "https://github.com/Sriram-52/Flutter_todo_list",
    },
  },
  {
    title: "Cotton Disease Detection ML",
    blurb:
      "Machine learning model for cotton leaf disease detection using computer vision. Implements image classification with high accuracy for agricultural applications.",
    stack: ["Python", "Jupyter", "Computer Vision", "ML"],
    links: {
      code: "https://github.com/Sriram-52/cotton-leaf-disease-detection",
    },
  },
  {
    title: "Instant Connect Mobile",
    blurb:
      "Mobile application that helps people connect with other users instantly. Built with TypeScript for cross-platform compatibility and real-time features.",
    stack: ["TypeScript", "Mobile", "Real-time", "Networking"],
    links: {
      code: "https://github.com/Sriram-52/instant-connect",
    },
  },
  {
    title: "SMS Listener Android",
    blurb:
      "Android application for SMS message handling and processing. Demonstrates mobile development with Java and Android SDK integration.",
    stack: ["Java", "Android", "SMS API", "Mobile"],
    links: {
      code: "https://github.com/Sriram-52/sms-listener",
    },
  },
  {
    title: "Portfolio Website",
    blurb:
      "Modern portfolio built with Next.js 15 and TypeScript. Features automated deployment with dark mode, animations, and optimized performance.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    links: {
      code: "https://github.com/Sriram-52/Sriram-52",
    },
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
                TypeScript • React • Next.js • React Native • NestJS • Node.js •
                AI Integration • CI/CD • GCP
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
                  Senior Full Stack Developer with 5+ years of experience
                  building scalable web and mobile applications. Expert in
                  modern TypeScript ecosystems including React, Next.js, NestJS,
                  and Spring Boot. Proven track record in healthcare technology,
                  AI integration, and enterprise security systems.
                </p>
                <p>
                  Passionate about clean architecture, performance optimization,
                  and security-first development. Successfully delivered 50+
                  projects ranging from ML-powered applications to real-time
                  chat systems with RSA encryption. Strong expertise in cloud
                  platforms, mobile development (React Native, Flutter,
                  Android), and modern DevOps practices.
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
                  Senior Full Stack Developer - Healthcare Technology Platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Technical Leadership & Migration:</strong> Led
                    critical Flutter to React Native migration team, overseeing
                    mobile architecture redesign for patient and provider
                    applications across healthcare platform.
                  </li>
                  <li>
                    <strong>Microservices Architecture:</strong> Built and
                    maintained 20+ TypeScript microservices including EMR
                    integration, patient flow management, claims processing, and
                    IVR systems.
                  </li>
                  <li>
                    <strong>CI/CD & DevOps Excellence:</strong> Architected
                    comprehensive GitHub Actions workflows, Docker
                    containerization, release automation, and monitoring systems
                    reducing deployment time by 60%.
                  </li>
                  <li>
                    <strong>AI Agent Development:</strong> Built intelligent
                    healthcare chatbots using LangGraph for clinical
                    documentation, patient interaction, and administrative
                    workflows.
                  </li>
                  <li>
                    <strong>Enterprise Security & Compliance:</strong>{" "}
                    Implemented CASL for RBAC/ABAC authorization, ZenStack for
                    multi-tenancy, Temporal workflow orchestration, and
                    HIPAA-compliant data processing across healthcare platform.
                  </li>
                  <li>
                    <strong>Performance Optimization:</strong> Orchestrated
                    Cloud Run migration, dependency management (TypeScript, pnpm
                    and turborepo), reducing infrastructure costs by 50%.
                  </li>
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
                <CardDescription>Full Stack Developer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Internal Management Platform:</strong> Built
                    comprehensive system for timesheet tracking, payroll
                    processing, and employee management serving 100+ consultants
                    across multiple client projects.
                  </li>
                  <li>
                    <strong>Project & Resource Management:</strong> Developed
                    allocation system with placement tracking, automated
                    workflow processes, and real-time project status monitoring.
                  </li>
                  <li>
                    <strong>Enterprise Dashboard & Analytics:</strong>{" "}
                    Implemented role-based access control, reporting dashboard
                    with AG Grid data visualization, and Chart.js/ApexCharts
                    analytics for HR operations.
                  </li>
                  <li>
                    <strong>Automated Payroll Processing:</strong> Created
                    calculation system with integration to timesheet data,
                    approval workflows, and PDF generation for payroll reports.
                  </li>
                  <li>
                    <strong>Full-Stack Architecture:</strong> Built with React,
                    Redux, Firebase backend, Material-UI components, and
                    comprehensive data management with export capabilities.
                  </li>
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
                  <div className="flex items-center gap-2">
                    {/* {p.links.demo && (
                      <Button asChild variant="outline" size="sm">
                        <a href={p.links.demo} target="_blank" rel="noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Demo
                        </a>
                      </Button>
                    )} */}
                    {p.links.code && (
                      <Button asChild variant="ghost" size="sm">
                        <a href={p.links.code} target="_blank" rel="noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <Card>
              <CardHeader>
                <CardTitle>Open Source Contributions</CardTitle>
                <CardDescription>
                  50+ GitHub repositories, TypeScript & Java expertise
                </CardDescription>
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
