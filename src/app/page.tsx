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
import { BackToTop } from "@/components/back-to-top"
import { resumeInfo } from "@/lib/resume"

const skills = {
  "Frontend & Mobile": [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "TailwindCSS",
    "Material-UI",
  ],
  "Backend & Cloud": [
    "NestJS",
    "Node.js",
    "Prisma",
    "PostgreSQL",
    "Firebase",
    "GCP",
    "Cloud Run",
  ],
  "AI & Security": [
    "OpenAI API",
    "LangGraph",
    "AI Agents",
    "RSA Encryption",
    "HIPAA Compliance",
  ],
  DevOps: ["GitHub Actions", "Docker", "Turborepo", "Nx Monorepo", "CI/CD"],
}

const projects = [
  {
    title: "Secure Chat Application",
    blurb:
      "Real-time messaging app implementing RSA encryption for secure communication. Built with React and TypeScript to explore cryptography concepts and learn about secure messaging protocols.",
    stack: ["React", "TypeScript", "RSA Encryption", "Real-time"],
    links: {
      code: "https://github.com/Sriram-52/secure-chat",
    },
  },
  {
    title: "RBAC Learning Project",
    blurb:
      "Role-based access control system built with NestJS and React. A learning project exploring authentication, authorization patterns, and API security concepts.",
    stack: ["NestJS", "React", "TypeScript"],
    links: {
      code: "https://github.com/Sriram-52/nest-react-rbac",
    },
  },
  {
    title: "Quiz Application",
    blurb:
      "Educational quiz platform built with Spring Boot and PostgreSQL. Containerized with Docker to learn about deployment and backend development with Java.",
    stack: ["Spring Boot", "Java", "PostgreSQL", "Docker"],
    links: {
      code: "https://github.com/Sriram-52/quiz-app-spring-boot",
    },
  },
  {
    title: "OpenAI Starter Template",
    blurb:
      "TypeScript starter project for OpenAI API integration. Basic template with examples for learning how to work with AI APIs and building simple AI-powered applications.",
    stack: ["TypeScript", "OpenAI API", "Node.js", "AI"],
    links: {
      code: "https://github.com/Sriram-52/openai-starter",
    },
  },
  {
    title: "Flutter Todo App",
    blurb:
      "Mobile todo application built with Flutter and Dart. A learning project to explore mobile development, state management patterns, and cross-platform app development.",
    stack: ["Flutter", "Dart", "Redux", "Mobile"],
    links: {
      code: "https://github.com/Sriram-52/Flutter_todo_list",
    },
  },
  {
    title: "Cotton Disease Detection",
    blurb:
      "Machine learning project for identifying cotton leaf diseases using computer vision. Built with Python and Jupyter notebooks to learn about image classification and ML workflows.",
    stack: ["Python", "Jupyter", "Computer Vision", "ML"],
    links: {
      code: "https://github.com/Sriram-52/cotton-leaf-disease-detection",
    },
  },
  {
    title: "Social Connect App",
    blurb:
      "Mobile networking application built with TypeScript. A project exploring real-time communication features and mobile app development concepts.",
    stack: ["TypeScript", "Mobile", "Real-time", "Networking"],
    links: {
      code: "https://github.com/Sriram-52/instant-connect",
    },
  },
  {
    title: "SMS Listener App",
    blurb:
      "Android application for SMS processing and automation. Built with Java to learn about Android development, SMS APIs, and mobile background services.",
    stack: ["Java", "Android", "SMS API", "Mobile"],
    links: {
      code: "https://github.com/Sriram-52/sms-listener",
    },
  },
  {
    title: "Portfolio Website",
    blurb:
      "This responsive portfolio built with Next.js 15 and TypeScript. Includes features like dark mode, animations, and an AI chatbot to showcase modern web development skills.",
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
          <div className="relative container mx-auto px-4 grid gap-6 md:grid-cols-[1.5fr_1fr] items-start animate-slide-up">
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight animate-slide-up stagger-1">
                <span className="gradient-text">Hi, I&apos;m Ram!</span>
              </h1>
              <div className="mt-2 space-y-1">
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight leading-tight animate-slide-up stagger-2">
                  Senior Full Stack Developer
                </h2>
                <h3 className="font-display text-lg md:text-xl font-medium tracking-tight leading-tight text-muted-foreground animate-slide-up stagger-3">
                  Web & Mobile Specialist
                </h3>
              </div>
              <p className="mt-4 text-muted-foreground text-lg max-w-2xl animate-slide-up stagger-4">
                Building scalable web and mobile applications with React,
                TypeScript, and modern cloud architecture. Passionate about
                creating efficient, secure, and user-focused solutions.
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
              <div className="mt-6 flex items-center gap-3 animate-slide-up stagger-5">
                <Button
                  asChild
                  variant="hero"
                  className="hover-scale pulse-glow"
                >
                  <a href="#contact">Get in touch</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#projects">View projects</a>
                </Button>
                <a
                  aria-label="GitHub"
                  href={resumeInfo.github}
                  className="p-2 rounded-md border hover:bg-muted min-h-[44px] min-w-[44px] flex items-center justify-center glow-on-hover transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 icon-bounce" />
                </a>
                <a
                  aria-label="LinkedIn"
                  href={resumeInfo.linkedIn}
                  className="p-2 rounded-md border hover:bg-muted min-h-[44px] min-w-[44px] flex items-center justify-center glow-on-hover transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5 icon-bounce" />
                </a>
              </div>
            </div>

            <Card
              id="about"
              className="shadow-elegant scroll-mt-24 animate-slide-up stagger-6 float"
            >
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
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 animate-slide-up">
            Skills
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([group, items], index) => (
              <Card
                key={group}
                className={`h-full animate-slide-up hover-scale stagger-${index + 1} shimmer`}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{group}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {items.map((sk) => (
                    <Badge
                      key={sk}
                      variant="secondary"
                      className="hover:scale-110 transition-all duration-200 glow-on-hover"
                    >
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
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 animate-slide-up">
            Experience
          </h2>
          <div className="grid gap-6">
            <Card className="animate-slide-up stagger-1 project-card">
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
                    <strong>Cost Optimization:</strong> Migrated GKE → Cloud Run
                    microservices; reduced infra costs by 50%.
                  </li>
                  <li>
                    <strong>Mobile Stack Leadership:</strong> Led Flutter →
                    React Native migration; built iHealth BLE SDK.
                  </li>
                  <li>
                    <strong>Monorepo & Type Safety:</strong> Introduced
                    Turborepo, migrated JS → TS, used OpenAPI + Orval.
                  </li>
                  <li>
                    <strong>AI-Powered Experiences:</strong> Built
                    LangGraph-based healthcare chatbots and Twilio integrations.
                  </li>
                  <li>
                    <strong>DevOps Excellence:</strong> Automated CI/CD with
                    GitHub Actions; ~30% faster releases.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-slide-up stagger-2 project-card">
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
                    <strong>CRM Platform:</strong> Built comprehensive
                    timesheet, payroll, and employee management system serving
                    100+ consultants.
                  </li>
                  <li>
                    <strong>Firebase Migration:</strong> Migrated legacy systems
                    to Firebase backend with real-time data synchronization.
                  </li>
                  <li>
                    <strong>RBAC Dashboards:</strong> Implemented role-based
                    access control with AG Grid data visualization and Chart.js
                    analytics.
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
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 animate-slide-up">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, index) => (
              <Card
                key={p.title}
                className={`flex flex-col project-card animate-slide-up stagger-${(index % 6) + 1}`}
              >
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
                        <a
                          href={p.links.code}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${p.title} code on GitHub`}
                          className="glow-on-hover"
                        >
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
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 animate-slide-up">
            Education
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="animate-slide-up stagger-1 project-card shimmer education-card achievement-highlight">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎓 Kennesaw State University
                </CardTitle>
                <CardDescription>
                  MS in Computer Science —{" "}
                  <span className="font-semibold text-primary">
                    GPA: 3.83/4
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Advanced coursework in software engineering, algorithms, and
                  data structures. Focus on modern web technologies and cloud
                  computing.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-slide-up stagger-2 project-card shimmer education-card achievement-highlight">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎓 Sasi Institute of Technology and Engineering
                </CardTitle>
                <CardDescription>
                  BTech in Computer Science —{" "}
                  <span className="font-semibold text-primary">
                    GPA: 9.59/10
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-primary">
                    Top 1% of graduating class.
                  </span>{" "}
                  Strong foundation in computer science fundamentals,
                  programming languages, and software development.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Certifications & Awards */}
        <section
          id="certifications"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 animate-slide-up">
            Certifications & Awards
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="animate-slide-up stagger-1 project-card shimmer glow-on-hover certificate-badge achievement-highlight">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🏆 HackerRank Certificates
                </CardTitle>
                <CardDescription>
                  <span className="font-medium text-primary">
                    Node.js, React, SQL, REST API
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Certified in multiple programming domains with{" "}
                  <span className="font-medium text-primary">
                    strong problem-solving scores
                  </span>
                  .
                </p>
              </CardContent>
            </Card>
            <Card className="animate-slide-up stagger-2 project-card shimmer glow-on-hover certificate-badge achievement-highlight">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🥈 IEEE Xtreme Competition
                </CardTitle>
                <CardDescription>
                  <span className="font-semibold text-primary">
                    All India Rank 62
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-primary">
                    Top 100 nationally
                  </span>{" "}
                  in prestigious 24-hour programming competition among{" "}
                  <span className="font-medium">4000+ participants</span>.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-slide-up stagger-3 project-card shimmer glow-on-hover certificate-badge achievement-highlight">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💻 Open Source Contributions
                </CardTitle>
                <CardDescription>
                  <span className="font-medium text-primary">
                    50+ GitHub repositories
                  </span>
                  , TypeScript & Java expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Active contributor to open source projects with focus on{" "}
                  <span className="font-medium text-primary">
                    modern web technologies
                  </span>{" "}
                  and developer tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Contact */}
        <section
          id="contact"
          className="container mx-auto px-4 py-12 md:py-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 animate-slide-up">
            Contact
          </h2>
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <Card className="animate-slide-up stagger-1 project-card">
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

            <Card className="animate-slide-up stagger-2 project-card">
              <CardHeader>
                <CardTitle>Quick links</CardTitle>
                <CardDescription>
                  Connect on professional networks.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <a
                  href={resumeInfo.github}
                  className="inline-flex items-center gap-2 p-3 rounded-md border hover:bg-muted glow-on-hover transition-all duration-300 hover:scale-105 hover:border-primary/50"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile"
                >
                  <Github className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />{" "}
                  GitHub
                </a>
                <a
                  href={resumeInfo.linkedIn}
                  className="inline-flex items-center gap-2 p-3 rounded-md border hover:bg-muted glow-on-hover transition-all duration-300 hover:scale-105 hover:border-primary/50"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />{" "}
                  LinkedIn
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
      <BackToTop />
    </div>
  )
}
