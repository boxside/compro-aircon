"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, Zap, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import React from "react"

// Counter animation component
interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
}

function Counter({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = React.useRef<HTMLSpanElement>(null)

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

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              const currentCount = easeOutQuart * end

              setCount(currentCount)

              if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
              }
            }

            animationFrame = requestAnimationFrame(animate)

            // Cleanup function for animation frame
            return () => {
              if (animationFrame) {
                cancelAnimationFrame(animationFrame)
              }
            }
          }
        })
      },
      {
        threshold: 0.6, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully in view
      }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [end, duration, hasAnimated])

  const formattedCount = count.toFixed(decimals)

  return (
    <span ref={counterRef}>
      {prefix}{formattedCount}{suffix}
    </span>
  )
}

// Komponen reusable untuk 1 card
interface MetricCardProps {
  icon: React.ReactNode
  value: string | number
  label: string
  change: string
  changeColor: string
  suffix?: string
  prefix?: string
  decimals?: number
}

function MetricCard({
  icon,
  value,
  label,
  change,
  changeColor,
  suffix = "",
  prefix = "",
  decimals = 0,
}: MetricCardProps) {
  // Convert string values to numbers for counter animation
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.]/g, '')) : value

  return (
    <Card className="bg-card text-card-foreground border-0 shadow-md rounded-2xl">
      <CardContent className="flex flex-col gap-2 p-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl">{icon}</div>
          <span className={`text-sm font-medium ${changeColor}`}>
            {change}
          </span>
        </div>
        <div className="text-2xl font-bold">
          <Counter
            end={numericValue}
            suffix={suffix}
            prefix={prefix}
            decimals={decimals}
          />
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
// Data metrics khusus logistik
const metricsData = [
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    value: 1000,
    label: "Pengiriman Terselesaikan",
    change: "",
    changeColor: "text-blue-400",
    suffix: "+",
    prefix: "",
    decimals: 0,
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-green-500" />,
    value: 98.5,
    label: "Ketepatan Waktu",
    change: "",
    changeColor: "text-green-400",
    suffix: "%",
    prefix: "",
    decimals: 1,
  },
  {
    icon: <Zap className="w-6 h-6 text-chart-2" />,
    value: 97.8,
    label: "Kepuasan Pelanggan",
    change: "",
    changeColor: "text-chart-2",
    suffix: "%",
    prefix: "",
    decimals: 1,
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    value: 15,
    label: "Rata-rata Waktu Respon",
    change: "",
    changeColor: "text-orange-400",
    suffix: " menit",
    prefix: "",
    decimals: 0,
  },
]

// Grid metric + hero section untuk logistik
export function MetricsSection() {
  return (
    <section className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card text-card-foreground border-0 rounded-2xl shadow-md">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Hero kiri */}
          <div className="md:w-1/2">

            <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4 leading-tight">
              Optimalkan rantai pasok Anda
              dengan layanan logistik end-to-end
            </h1>
            <p className="text-muted-foreground mb-6 max-w-lg">
              Kami membantu bisnis mengirimkan barang lebih cepat, aman, dan efisien
              melalui jaringan distribusi yang luas, manajemen gudang yang rapi,
              perencanaan rute cerdas, serta pelacakan real-time 24/7.
            </p>

          </div>

          {/* Grid kanan */}
          <div className="md:w-1/2 grid grid-cols-2 gap-6">
            {metricsData.map((metric) => (
              <MetricCard
                key={metric.label}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                change={metric.change}
                changeColor={metric.changeColor}
                suffix={metric.suffix}
                prefix={metric.prefix}
                decimals={metric.decimals}
              />
            ))}
          </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
