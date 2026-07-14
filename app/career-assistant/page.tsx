import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Bot,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Clock,
  Star,
  Shield,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "AI Career Assistant | ResumeIQ",
  description:
    "Get personalized career advice, resume tips, and job-hunting strategies from your 24/7 AI-powered career coach.",
}

const highlights = [
  {
    icon: Sparkles,
    title: "Instant Advice",
    description:
      "Receive tailored career guidance in seconds — resume reviews, cover letter help, salary negotiation tips, and more.",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    description:
      "Your AI career coach never sleeps. Get help at any time, from anywhere, whenever inspiration or doubt strikes.",
  },
  {
    icon: Star,
    title: "Expert-Level Insights",
    description:
      "Powered by millions of career success patterns across industries, delivering advice you can actually act on.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description:
      "Your conversations stay encrypted and private. We never share your data with third parties.",
  },
  {
    icon: Zap,
    title: "Context-Aware",
    description:
      "The assistant learns from your resume and goals to give progressively better, more personalised responses.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversation",
    description:
      "Chat just like you would with a real mentor — ask follow-up questions, explore ideas, and iterate freely.",
  },
]

export default function CareerAssistantPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative px-4 py-20 md:py-32 overflow-hidden">
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[700px] h-[400px] rounded-full bg-primary/10 blur-[120px] opacity-60" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
              <Bot className="size-4" aria-hidden />
              AI Career Assistant
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Your Personal{" "}
              <span className="text-primary">Career Coach</span>{" "}
              is Ready
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              Skip the guesswork. Get instant, AI-powered career advice tailored to your goals —
              from resume reviews to salary negotiation strategies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/chatbot"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <MessageSquare className="size-5" aria-hidden />
                Start Chatting Now
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

        {/* ── Feature highlights ── */}
        <section
          className="px-4 py-16"
          aria-label="AI Career Assistant feature highlights"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              What Your AI Coach Can Do
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl text-center rounded-3xl bg-card border border-border p-12">
            <Bot className="size-12 text-primary mx-auto mb-6" aria-hidden />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Supercharge Your Career?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of professionals already using ResumeIQ to land their dream jobs.
            </p>
            <Link
              href="/chatbot"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Launch AI Assistant
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
