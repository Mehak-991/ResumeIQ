import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Mic2,
  ArrowRight,
  Briefcase,
  MessageSquare,
  BarChart3,
  RefreshCw,
  Star,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "AI Mock Interview | ResumeIQ",
  description:
    "Practice with AI-generated interview questions tailored to your target role and get real-time feedback to ace your next interview.",
}

const highlights = [
  {
    icon: Briefcase,
    title: "Role-Specific Questions",
    description:
      "Interview questions are generated specifically for your target job, industry, and experience level.",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Feedback",
    description:
      "Get instant analysis on your answers — tone, structure, relevance, and areas to improve.",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description:
      "Track your interview confidence scores over time and see how much you've improved.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Practice",
    description:
      "Run as many mock interviews as you want. The AI generates fresh questions every session.",
  },
  {
    icon: Star,
    title: "STAR Method Guidance",
    description:
      "Guided prompts help you structure your answers using the proven Situation-Task-Action-Result method.",
  },
  {
    icon: Zap,
    title: "Fast & Interactive",
    description:
      "Practice at your own pace. Pause, replay, and refine your answers before your real interview.",
  },
]

const steps = [
  { step: "01", title: "Choose Your Role", description: "Enter the job title and company you're interviewing for." },
  { step: "02", title: "Start the Session", description: "The AI generates tailored questions and begins the mock interview." },
  { step: "03", title: "Answer & Review", description: "Respond to each question and receive instant AI feedback on your answer." },
  { step: "04", title: "Improve & Repeat", description: "Study the feedback, refine your answers, and go again until you're confident." },
]

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative px-4 py-20 md:py-32 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[700px] h-[400px] rounded-full bg-primary/10 blur-[120px] opacity-60" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
              <Mic2 className="size-4" aria-hidden />
              AI Mock Interview
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Practice Interviews.{" "}
              <span className="text-primary">Land Offers.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              Stop dreading interviews. Our AI coach generates role-specific questions, listens to
              your answers, and gives you actionable feedback so you walk in confident.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/interview-prep"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <Mic2 className="size-5" aria-hidden />
                Start Mock Interview
                <ArrowRight
                  className="size-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden
                />
              </Link>
              <Link
                href="/"
                className="px-8 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-lg hover:bg-secondary/80 transition-colors border border-border"
              >
                Explore All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="px-4 py-16" aria-label="How mock interview works">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-colors"
                >
                  <p className="text-3xl font-bold text-primary/30 mb-3">{item.step}</p>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature highlights ── */}
        <section
          className="px-4 py-16"
          aria-label="AI Mock Interview feature highlights"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Built to Make You Interview-Ready
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="size-6 text-primary" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl text-center rounded-3xl bg-card border border-border p-12">
            <Mic2 className="size-12 text-primary mx-auto mb-6" aria-hidden />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Next Interview Starts Here
            </h2>
            <p className="text-muted-foreground mb-8">
              The more you practice, the more confident you become. Start your first mock session now.
            </p>
            <Link
              href="/interview-prep"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Launch Interview Prep
              <ArrowRight
                className="size-5 group-hover:translate-x-1 transition-transform"
                aria-hidden
              />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
