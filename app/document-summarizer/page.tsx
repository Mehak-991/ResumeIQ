import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  FileSearch,
  ArrowRight,
  Zap,
  Globe,
  BookOpen,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Document Summarizer | ResumeIQ",
  description:
    "Extract key insights from any document, article, or webpage instantly. Save hours of reading time with AI-powered summarization.",
}

const highlights = [
  {
    icon: Zap,
    title: "Instant Summaries",
    description:
      "Paste any URL or upload a PDF and get a concise, accurate summary in under 5 seconds.",
  },
  {
    icon: Globe,
    title: "Any Format",
    description:
      "Supports PDFs, Word docs, plain text, web articles, research papers, and more.",
  },
  {
    icon: BookOpen,
    title: "Key Takeaways",
    description:
      "Automatically extracts bullet-point key insights so you can scan and act faster.",
  },
  {
    icon: BarChart3,
    title: "Smart Highlights",
    description:
      "AI surfaces the most important facts, dates, figures, and action items from any document.",
  },
  {
    icon: Clock,
    title: "Save Hours",
    description:
      "Turn a 30-page report into a 1-minute read. Reclaim your time for what matters most.",
  },
  {
    icon: Shield,
    title: "Secure Processing",
    description:
      "Documents are processed securely and are never stored or shared with third parties.",
  },
]

export default function DocumentSummarizerPage() {
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
              <FileSearch className="size-4" aria-hidden />
              Document Summarizer
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Read Less.{" "}
              <span className="text-primary">Understand More.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              Drop in any document or URL and get a precise, structured summary in seconds.
              No more wading through pages of text to find the key points.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <FileSearch className="size-5" aria-hidden />
                Summarize a Document
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

        {/* ── Stats strip ── */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "10k+", label: "Documents processed" },
                { value: "< 5s", label: "Average summary time" },
                { value: "95%", label: "User accuracy rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-card border border-border p-6 text-center"
                >
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature highlights ── */}
        <section
          className="px-4 py-16"
          aria-label="Document Summarizer feature highlights"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Why Professionals Love It
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
            <FileSearch className="size-12 text-primary mx-auto mb-6" aria-hidden />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Start Summarizing Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of professionals who save hours every week with ResumeIQ Document Summarizer.
            </p>
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Open Summarizer
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
