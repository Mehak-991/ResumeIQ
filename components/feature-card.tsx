"use client"

import { memo } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  stats?: string
  index?: number
}

export const FeatureCard = memo(function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  stats,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.article
      className="group relative rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-colors overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Hover glow overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"
      />

      {/* Icon + Text */}
      <div className="flex items-start gap-4 mb-4">
        <motion.div
          className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="size-6 text-primary" aria-hidden />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 leading-snug">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          {stats && (
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground group-hover:text-primary/80 transition-colors">
              {stats}
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      {href && (
        <div className="mt-auto pt-4 border-t border-border/50">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/cta"
            aria-label={`Get started with ${title}`}
          >
            Get Started
            <ArrowRight
              className="size-4 group-hover/cta:translate-x-1 transition-transform"
              aria-hidden
            />
          </Link>
        </div>
      )}
    </motion.article>
  )
})
