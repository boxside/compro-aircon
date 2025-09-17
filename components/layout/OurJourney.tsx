// app/components/OurJourney.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import {
  BadgeCheck,
  Calendar,
  Package,
  Truck,
  Route,
  Clock,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react"
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
  items?: JourneyItem[]
  showSummaryCards?: boolean
}

export default function OurJourney({
  title = "Perjalanan Kami di Dunia Logistik",
  subtitle =
  "Dari pengiriman pertama hingga jaringan distribusi nasional, kami terus menyederhanakan rantai pasok agar barang tiba lebih cepat, aman, dan tepat waktu.",
  items = [
    {
      year: 2019,
      title: "Mulai Melayani Pengiriman Kota-Kota Besar",
      description:
        "Memperkenalkan layanan last-mile untuk UMKM dan ritel, fokus pada SLA sederhana namun disiplin: jemput cepat, kirim tepat.",
      icon: <Package className="size-4" />,
    },
    {
      year: 2020,
      title: "Optimasi Rute & Pelacakan Real-time",
      description:
        "Mengintegrasikan perencanaan rute cerdas dan pelacakan 24/7, memangkas waktu tempuh sekaligus meningkatkan visibilitas pelanggan.",
      icon: <Route className="size-4" />,
    },
    {
      year: 2022,
      title: "Ekspansi Jaringan Warehouse",
      description:
        "Membangun hub dan micro-fulfillment untuk mendekatkan stok ke pelanggan—mempercepat proses picking, packing, dan dispatch.",
      icon: <Truck className="size-4" />,
    },
    {
      year: 2024,
      title: "Standar Ketepatan Waktu Ditinggikan",
      description:
        "Menetapkan target on-time lebih ketat dan dashboard SLA terpadu. Kepuasan pelanggan meningkat, komplain turun signifikan.",
      icon: <BadgeCheck className="size-4" />,
    },
    {
      year: 2025,
      title: "Orkestrasi End-to-End",
      description:
        "Menghubungkan WMS, TMS, dan sistem klien. Dari inbound sampai last-mile, satu alur data—satu kualitas layanan.",
      icon: <Calendar className="size-4" />,
    },
  ],
  showSummaryCards = true,
}: OurJourneyProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
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
      {/* Bottom shadow */}
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
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-foreground/20" />
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-16 w-[2px] bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-16 w-[2px] bg-gradient-to-t from-background to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {items.map((it, idx) => {
              const side: "left" | "right" = it.side ?? (idx % 2 === 0 ? "right" : "left")
              const Icon = it.icon ?? <BadgeCheck className="size-4" />
              return (
                <motion.div
                  key={`${it.year}-${idx}`}
                  className="relative grid md:grid-cols-2 gap-6 md:gap-12 py-4 min-h-28"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={idx + 1}
                >
                  {/* Year */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-1 md:top-1/2 md:-translate-y-1/2 z-10">
                    <div className="rounded-full bg-background border px-2.5 py-1 text-xs font-semibold shadow-sm">
                      {it.year}
                    </div>
                  </div>

                  {/* Connector (desktop) */}
                  <div
                    className={`hidden md:block absolute top-1/2 h-[2px] w-10 bg-foreground/20 ${side === "left"
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

      {/* Summary metrics — disamakan dengan card1 */}
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
              Dampak yang Bisa Diukur
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              Angka berikut mencerminkan komitmen kami pada kecepatan, ketepatan, dan pengalaman pelanggan.
            </p>
          </motion.div>

          {/* Grid metrik (mirip card1) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricSummaryCard
              icon={<Users className="size-5 text-blue-500" />}
              value={1000}
              suffix="+"
              title="Pengiriman Terselesaikan"
              desc="Volume pengiriman yang berhasil kami tuntaskan."
              index={0}
            />
            <MetricSummaryCard
              icon={<TrendingUp className="size-5 text-green-500" />}
              value={98.5}
              suffix="%"
              title="Ketepatan Waktu"
              desc="Konsisten menjaga SLA pengantaran."
              index={1}
              decimals={1}
            />
            <MetricSummaryCard
              icon={<Zap className="size-5" />}
              value={97.8}
              suffix="%"
              title="Kepuasan Pelanggan"
              desc="Pengalaman yang cepat dan tanpa ribet."
              index={2}
              decimals={1}
            />
            <MetricSummaryCard
              icon={<Clock className="size-5 text-orange-500" />}
              value={15}
              suffix=" menit"
              title="Rata-rata Waktu Respon"
              desc="Dukungan yang responsif setiap saat."
              index={3}
            />
          </div>
        </div>
      )}
      {/* Our Story Continues */}
      <motion.div
        className="mx-auto max-w-4xl px-6 mt-16"
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="rounded-2xl border bg-gradient-to-b from-card to-background shadow-sm p-8 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Perjalanan Kami Masih Lanjut!
          </h3>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Kami memulai dengan layanan pengiriman antar kota, lalu berkembang menjadi solusi lengkap dari awal hingga akhir. 
            Kini, sistem kami menghubungkan gudang, manajemen pengiriman, hingga kurir terakhir dalam satu alur yang rapi. 
            Perjalanan kami belum berhenti - setiap hari kami terus meningkatkan ketepatan waktu, kemudahan pelacakan, dan efisiensi biaya, supaya proses pengiriman Anda jadi lebih cepat dan lancar.
          </p>


          {/* Optional CTA */}
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-sm hover:opacity-90 transition"
            >
              Gabung di Bab Berikutnya
            </a>
          </div>
        </div>
      </motion.div>

    </section>

  )
}

/* ---------- Local UI helpers (counter + cards) ---------- */
function MetricSummaryCard({
  icon,
  value,
  suffix,
  title,
  desc,
  index,
  decimals = 0,
}: {
  icon: ReactNode
  value: number
  suffix?: string
  title: string
  desc: string
  index: number
  decimals?: number
}) {
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
          <Counter end={value} suffix={suffix ?? ""} decimals={decimals} />
        </div>
        <div className="mt-1 font-semibold">{title}</div>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      </div>
    </motion.div>
  )
}

function Counter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hasAnimated) return
    const observer = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 0.6, rootMargin: "0px 0px -50px 0px" }
    )
    if (counterRef.current) observer.observe(counterRef.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  const formatted = count.toFixed(decimals)
  return <span ref={counterRef}>{prefix}{formatted}{suffix}</span>
}

export type { JourneyItem, OurJourneyProps }
