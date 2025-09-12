"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { useTheme } from "../ThemeProvider"

type Slide = {
  src: string
  alt?: string
  caption?: string
  subcaption?: string
}

type HeroCarouselProps = {
  slides: Slide[]
  intervalMs?: number
  className?: string
}

export default function HeroCarousel({
  slides = [],
  intervalMs = 5000,
  className,
}: HeroCarouselProps) {
  const { theme } = useTheme()
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const timerRef = useRef<number | null>(null)

  // ✅ resolve theme agar "system" ikut OS
  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setResolvedTheme(isDark ? "dark" : "light")
    } else {
      setResolvedTheme(theme as "light" | "dark")
    }
  }, [theme])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!slides.length || slides.length <= 1) return
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [slides, intervalMs])

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length)
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  if (!slides.length) {
    return (
      <div className="w-full h-svh flex items-center justify-center">
        No slides available
      </div>
    )
  }

  return (
    <section
      className={cn(
        "relative w-full min-h-svh overflow-hidden",
        "bg-background",
        className
      )}
      aria-label="Hero"
    >
      {/* Slides */}
      <div
        className="absolute inset-0 flex transition-transform ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transitionDuration: "3000ms",
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative min-w-full h-svh flex-shrink-0"
          >
            <Image
              src={s.src}
              alt={s.alt ?? `slide-${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay & Controls (client only) */}
      {mounted && (
        <>
          {/* Gradient Overlay */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              resolvedTheme === "dark"
                ? "bg-gradient-to-b from-black/70 via-black/40 to-black/70"
                : "bg-gradient-to-b from-white/60 via-white/30 to-white/60"
            )}
          />

          {/* Controls */}
          {slides.length > 1 && (
            <div className="absolute inset-0 z-20 flex items-center justify-between px-4">
              <Button
                aria-label="Previous slide"
                onClick={prev}
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full shadow-md",
                  resolvedTheme === "dark"
                    ? "bg-white/20 hover:bg-white/30 text-white"
                    : "bg-black/20 hover:bg-black/30 text-black"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                aria-label="Next slide"
                onClick={next}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full shadow-md",
                  resolvedTheme === "dark"
                    ? "bg-white/20 hover:bg-white/30 text-white"
                    : "bg-black/20 hover:bg-black/30 text-black"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      i === index
                        ? resolvedTheme === "dark"
                          ? "bg-white w-6"
                          : "bg-black w-6"
                        : resolvedTheme === "dark"
                          ? "bg-white/50 hover:bg-white/80"
                          : "bg-black/50 hover:bg-black/80"
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Caption + Subcaption */}
      <div className="relative z-10 flex h-svh items-center justify-center">
        {(slides[index]?.caption || slides[index]?.subcaption) && (
          <div
            key={index}
            className="absolute bottom-1/4 text-center max-w-3xl px-4 opacity-0 animate-fade-in-up"
          >
            {slides[index]?.caption && (
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
                {slides[index].caption}
              </h1>
            )}
            {slides[index]?.subcaption && (
              <p className="mt-4 text-lg md:text-2xl font-medium opacity-90 drop-shadow-sm">
                {slides[index].subcaption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
