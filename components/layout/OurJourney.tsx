"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BadgeCheck, Calendar, FolderClosed, UsersRound, Trophy, Users, Globe2 } from "lucide-react"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

type JourneyItem = {
  year: string | number
  title: string
  description: string
  side?: "left" | "right"
  icon?: ReactNode
}

type OurJourneyProps = {
  title?: string
  subtitle?: string
  items: JourneyItem[]
  showSummaryCards?: boolean
}

export default function OurJourney({
  title = "Melangkah Maju dengan Makna dan Tujuan",
  subtitle =
    "Setiap langkah kami adalah komitmen untuk membangun fondasi yang kuat, menciptakan perjalanan penuh prestasi menuju masa depan yang menjanjikan.",
  items,
  showSummaryCards = true,
}: OurJourneyProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  // Track scroll progress through the section (0 -> 1)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  // Bottom shadow opacity: show after ~10% scrolled, hide near the end
  const bottomShadowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0])
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easing: "ease-out", delay: i * 0.08 },
    }),
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-background text-foreground py-16 md:py-24">
      {/* Bottom shadow overlay: appears after 10% scrolled, hides near end */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-16 md:h-24 bg-gradient-to-t from-black/20 dark:from-black/35 to-transparent"
        style={{ opacity: bottomShadowOpacity }}
      />
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Center vertical line */}
        <div className="relative mt-12">
          {/* Main vertical line (thicker + theme-aware) */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-foreground/20" />
          {/* Top/Bottom gradient fade matching theme */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-16 w-[2px] bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-16 w-[2px] bg-gradient-to-t from-background to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {items.map((it, idx) => {
              const side: "left" | "right" = it.side ?? (idx % 2 === 0 ? "right" : "left")
              const Icon = it.icon ?? <BadgeCheck className="size-4" />
              return (
                <motion.div
                  key={idx}
                  className="relative grid md:grid-cols-2 gap-6 md:gap-12 py-4 min-h-28"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={idx + 1}
                >
                  {/* Year badge at center */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-1 md:top-1/2 md:-translate-y-1/2 z-10">
                    <div className="rounded-full bg-background border px-2.5 py-1 text-xs font-semibold shadow-sm">
                      {it.year}
                    </div>
                  </div>

                  {/* Connector from center to card (desktop) */}
                  <div
                    className={`hidden md:block absolute top-1/2 h-[2px] w-10 bg-foreground/20 ${
                      side === "left"
                        ? "left-1/2 -translate-x-[calc(100%+2px)]"
                        : "left-1/2"
                    }`}
                  />

                  {/* Cards */}
                  {side === "left" ? (
                    <div className="md:col-start-1 flex justify-end">
                      <div className="max-w-md w-full rounded-xl border bg-card text-card-foreground shadow-sm p-4 md:p-5">
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="inline-flex items-center justify-center size-6 rounded-full bg-secondary text-secondary-foreground">
                            {Icon}
                          </span>
                          <span>{it.title}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="md:col-start-2 flex justify-start">
                      <div className="max-w-md w-full rounded-xl border bg-card text-card-foreground shadow-sm p-4 md:p-5">
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="inline-flex items-center justify-center size-6 rounded-full bg-secondary text-secondary-foreground">
                            {Icon}
                          </span>
                          <span>{it.title}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Summary cards at the end of the timeline */}
      {showSummaryCards && (
        <div className="mx-auto max-w-6xl px-6 mt-16">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Milestones That Define Our Journey
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              Over the years, we&rsquo;ve achieved remarkable success by focusing on delivering exceptional value to our clients and building lasting relationships.
            </p>
          </motion.div>

          {/* Top metrics grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar/>, value: 15, suffix: "+", title: "Years Experience", desc: "Over a decade of industry leadership." },
              { icon: <FolderClosed/>, value: 2500, suffix: "+", title: "Projects Completed", desc: "Successfully delivered worldwide." },
              { icon: <UsersRound/>, value: 10000, suffix: "+", title: "Happy Clients", desc: "From startups to Fortune 500 companies." },
              { icon: <Trophy/>, value: 150, suffix: "+", title: "Industry Awards", desc: "Recognized for design and innovation excellence." },
            ].map((m, i) => (
              <MetricSummaryCard key={i} {...m} index={i} />
            ))}
          </div>

          {/* Bottom story + small metrics */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              className="lg:col-span-2 rounded-xl border bg-card text-card-foreground shadow-sm p-6"
            >
              <h4 className="font-semibold text-lg">Our Story Continues</h4>
              <div className="mt-3 space-y-4 text-sm text-muted-foreground">
                <p>
                  While we take pride in these achievements, our journey is ongoing. We remain dedicated to innovation, quality, and creating meaningful impact for our clients and communities worldwide.
                </p>
                <p>
                  Every day, we strive to exceed expectations and set new standards of excellence in everything we do.
                </p>
              </div>
            </motion.div>

            <div className="space-y-6">
              <MetricSmallCard
                icon={<Users className="size-5" />}
                title="Growing Team"
                value={250}
                suffix="+"
                desc="Talented professionals across the globe"
                index={2}
              />
              <MetricSmallCard
                icon={<Globe2 className="size-5" />}
                title="Global Reach"
                value={30}
                suffix="+"
                desc="Countries with active client projects"
                index={3}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export type { JourneyItem, OurJourneyProps }

// ---- Local UI helpers (counter + cards) ----
function MetricSummaryCard({ icon, value, suffix, title, desc, index }: { icon: ReactNode; value: number; suffix?: string; title: string; desc: string; index: number }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.06 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-xl border bg-card text-card-foreground shadow-sm p-6"
    >
      <div className="flex items-center justify-center size-10 rounded-full bg-muted mx-auto text-muted-foreground">
        {icon}
      </div>
      <div className="mt-4 text-center">
        <div className="text-3xl font-extrabold">
          <Counter end={value} suffix={suffix ?? ""} />
        </div>
        <div className="mt-1 font-semibold">{title}</div>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      </div>
    </motion.div>
  )
}

function MetricSmallCard({ icon, title, value, suffix, desc, index }: { icon: ReactNode; title: string; value: number; suffix?: string; desc: string; index: number }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.06 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-xl border bg-card text-card-foreground shadow-sm p-6"
    >
      <div className="flex items-center gap-2 font-semibold">
        <span className="inline-flex items-center justify-center size-7 rounded-full bg-muted text-muted-foreground">
          {icon}
        </span>
        <span>{title}</span>
      </div>
      <div className="mt-2 text-2xl font-extrabold">
        <Counter end={value} suffix={suffix ?? ""} />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </motion.div>
  )
}

function Counter({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }: { end: number; duration?: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hasAnimated) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number
          let animationFrame: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const current = easeOutQuart * end
            setCount(current)
            if (progress < 1) animationFrame = requestAnimationFrame(animate)
          }
          animationFrame = requestAnimationFrame(animate)
          return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame)
          }
        }
      })
    }, { threshold: 0.6, rootMargin: "0px 0px -50px 0px" })
    if (counterRef.current) observer.observe(counterRef.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  const formatted = count.toFixed(decimals)
  return <span ref={counterRef}>{prefix}{formatted}{suffix}</span>
}
