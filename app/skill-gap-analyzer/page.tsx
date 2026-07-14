import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import SkillGapAnalyzer from "@/components/skill-gap/SkillGapAnalyzer"
import { ResumeProvider } from "@/context/ResumeContext"

export const metadata: Metadata = {
  title: "Skill Gap Analyzer | ResumeIQ",
  description:
    "Identify the exact skills missing for your dream job and get a personalized roadmap to close those gaps fast.",
}

export default function SkillGapAnalyzerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Page header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <span aria-hidden>📊</span>
              Skill Gap Analyzer
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
              Know Exactly What Skills{" "}
              <span className="text-primary">You Need</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Upload your resume, enter your target role, and let AI pinpoint the exact skills
              gap — then show you how to close it with a personalised learning roadmap.
            </p>
          </div>

          {/* Actual analyzer — wrapped in ResumeProvider context */}
          <ResumeProvider>
            <SkillGapAnalyzer />
          </ResumeProvider>
        </div>
      </main>

      <Footer />
    </div>
  )
}
