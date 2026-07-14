import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  BriefcaseBusiness,
  ArrowRight,
  Bell,
  Search,
  MapPin,
  Zap,
  Star,
  Globe,
  Rocket,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Find Your Next Opportunity | ResumeIQ",
  description:
    "Receive real-time job alerts and hackathon opportunities matched to your profile from thousands of companies actively hiring.",
}

const highlights = [
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description:
      "Get notified the moment a new position matching your skills and preferences is posted.",
  },
  {
    icon: Search,
    title: "Smart Matching",
    description:
      "Our AI matches jobs to your resume automatically — no tedious keyword searches required.",
  },
  {
    icon: MapPin,
    title: "Remote & Local",
    description:
      "Filter by location, remote-friendly, hybrid, or full on-site to find exactly what suits you.",
  },
  {
    icon: Rocket,
    title: "Hackathons Too",
    description:
      "Don't just find jobs — discover hackathons and competitions to build your portfolio.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Browse opportunities from thousands of companies worldwide, from startups to Fortune 500s.",
  },
  {
    icon: Star,
    title: "Save & Track",
    description:
      "Bookmark roles you love and track your application status all in one place.",
  },
]

const sampleRoles = [
  { title: "Senior Frontend Engineer", company: "TechCorp", location: "Remote", type: "Full-time" },
  { title: "Machine Learning Engineer", company: "AI Labs", location: "San Francisco, CA", type: "Hybrid" },
  { title: "Product Designer", company: "DesignStudio", location: "Remote", type: "Contract" },
  { title: "Backend Developer (Node.js)", company: "StartupXYZ", location: "New York, NY", type: "Full-time" },
  { title: "Data Analyst", company: "DataCo", location: "Remote", type: "Full-time" },
  { title: "DevOps Engineer", company: "CloudTech", location: "Austin, TX", type: "Hybrid" },
]

export default function OpportunitiesPage() {
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
              <BriefcaseBusiness className="size-4" aria-hidden />
              Find Your Next Opportunity
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Your Dream Job is{" "}
              <span className="text-primary">One Click Away</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              Browse real-time job listings and hackathon opportunities matched to your profile.
              Search by keyword, filter by location, and apply in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/alerts"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <Search className="size-5" aria-hidden />
                Browse Opportunities
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

        {/* ── Sample listings preview ── */}
        <section className="px-4 py-12" aria-label="Sample job listings">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Sample Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleRoles.map((role) => (
                <div
                  key={`${role.title}-${role.company}`}
                  className="rounded-2xl bg-card border border-border p-5 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <BriefcaseBusiness className="size-5 text-primary" aria-hidden />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{role.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{role.company}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" aria-hidden />
                    {role.location}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/alerts"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                See all live listings
                <ArrowRight
                  className="size-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Feature highlights ── */}
        <section
          className="px-4 py-16"
          aria-label="Opportunities feature highlights"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Everything You Need to Land the Role
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
            <BriefcaseBusiness className="size-12 text-primary mx-auto mb-6" aria-hidden />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Don&apos;t Miss Your Next Big Break
            </h2>
            <p className="text-muted-foreground mb-8">
              New jobs and opportunities are posted every day. Start searching now and get there first.
            </p>
            <Link
              href="/alerts"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Find Opportunities Now
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
