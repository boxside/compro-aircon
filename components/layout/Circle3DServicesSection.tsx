"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useCallback, useRef, useState, useLayoutEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn, withBase } from "@/lib/utils"

type FeatureCategory = {
  key?: string
  label: string
  description?: string
  image: { src: string; alt?: string }
}

type FeaturePayload = {
  header?: string
  subheader?: string
  categories: FeatureCategory[]
}

type ServicesJson = {
  categoryServices: Array<{
    category: string
    data: FeaturePayload
  }>
}

type Card = {
  key: string
  title: string
  description?: string
  image: { src: string; alt?: string }
  href?: string
}

type CircleProps = {
  items: Card[]
  radius?: number
  perspective?: number
  cardWidth?: number
  cardHeight?: number
  autoplay?: boolean
  autoplayDegPerSec?: number
  startIndex?: number
  visibleCount?: number
}
function Circle3DCarousel({
  items,
  radius = 460,
  perspective: _perspective = 1200,
  cardWidth = 600,
  cardHeight = 460,
  autoplay = false,
  autoplayDegPerSec = 16,
  startIndex = 1,
  visibleCount = 3,
}: CircleProps) {
  const hasItems = !!items && items.length > 0
  const n = Math.max(1, items.length)
  const step = 360 / n

  const [isMobile, setIsMobile] = useState(false)
  const computedVisible = isMobile ? 1 : visibleCount

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleChange)
      return () => mq.removeEventListener("change", handleChange)
    }
    if (typeof (mq as MediaQueryList).addListener === "function") {
      (mq as MediaQueryList).addListener(handleChange)
      return () => (mq as MediaQueryList).removeListener(handleChange)
    }
    return () => { }
  }, [])

  const [angle, setAngle] = useState(-startIndex * step)
  const [anim, setAnim] = useState(true)

  // ---- MEASURED CONTAINER ----
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [ringW, setRingW] = useState(0)
  useLayoutEffect(() => {
    const el = ringRef.current
    if (!el) return
    setRingW(el.clientWidth)
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0
      setRingW(width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ---- AUTOPLAY ----
  const raf = useRef<number | null>(null)
  const paused = useRef(!autoplay)
  useEffect(() => {
    paused.current = !autoplay
  }, [autoplay])

  useEffect(() => {
    let last = performance.now()
    const tick = (t: number) => {
      const dt = (t - last) / 1000
      last = t
      if (!paused.current) {
        setAnim(false)
        setAngle((a) => a - autoplayDegPerSec * dt)
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [autoplayDegPerSec])

  const handlePrev = () => {
    setAnim(true)
    setAngle((a) => a + step)
  }
  const handleNext = () => {
    setAnim(true)
    setAngle((a) => a - step)
  }

  // ---- SWIPE/DRAG via Pointer Events (mouse & touch) ----
  const drag = useRef({
    active: false,
    startX: 0,
    startAngle: 0,
    lastX: 0,
    lastT: 0,
    vx: 0, // px/s
  })

  // konversi piksel → derajat; disetel lembut agar enak ditarik
  const pxToDeg = useMemo(() => {
    const base = ringW || 1
    return (px: number) => (px / base) * 240 // 240° per lebar container
  }, [ringW])

  const snapToNearest = useCallback((a: number) => {
    const idx = Math.round(-a / step)
    return -idx * step
  }, [step])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now()
    drag.current.active = true
    drag.current.startX = e.clientX
    drag.current.lastX = e.clientX
    drag.current.lastT = now
    drag.current.startAngle = angle
    drag.current.vx = 0
    setAnim(false)
    paused.current = true
      ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const now = performance.now()
    const dx = e.clientX - drag.current.startX
    const deltaDeg = pxToDeg(dx)

    // cegah scroll bila dominan horizontal
    if (Math.abs(dx) > 6) e.preventDefault()

    setAngle(drag.current.startAngle + deltaDeg)

    const ddx = e.clientX - drag.current.lastX
    const dt = Math.max(1, now - drag.current.lastT) // ms
    drag.current.vx = (ddx * 1000) / dt // px/s
    drag.current.lastX = e.clientX
    drag.current.lastT = now
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
      ; (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)

    // inertia ringan → loncat 1 langkah jika lepas dengan kecepatan signifikan
    const vdeg = pxToDeg(drag.current.vx)
    const speedThresh = 90 // deg/s kira2
    setAnim(true)
    if (Math.abs(vdeg) > speedThresh) {
      setAngle((a) => {
        const dir = vdeg > 0 ? 1 : -1
        return snapToNearest(a + dir * step)
      })
    } else {
      setAngle((a) => snapToNearest(a))
    }
    paused.current = !autoplay
  }

  // Window of cards around current index
  const windowed = useMemo(() => {
    const half = Math.floor((computedVisible - 1) / 2)
    const centerFloat = -angle / step
    const centerIdx = Math.round(centerFloat)
    const vis: Array<{ key: number; dataIdx: number; theta: number }> = []
    for (let o = -half; o <= half; o++) {
      const virtIdx = centerIdx + o
      const dataIdx = ((virtIdx % n) + n) % n
      vis.push({ key: virtIdx, dataIdx, theta: virtIdx * step })
    }
    return vis
  }, [angle, step, n, computedVisible])

  const onEnter = () => {
    paused.current = true
  }
  const onLeave = () => {
    if (!drag.current.active) paused.current = !autoplay
  }

  return (
    <div className="relative">
      <button
        aria-label="Prev"
        onClick={handlePrev}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/80 p-2 shadow hover:bg-background"
      >
        <span>&lt;</span>
      </button>
      <button
        aria-label="Next"
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/80 p-2 shadow hover:bg-background"
      >
        <span>&gt;</span>
      </button>

      <div
        ref={ringRef}
        className="mx-auto relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 1200,
          minHeight: 420,
          height: ringW
            ? (() => {
              const cardW = Math.max(
                280,
                Math.min(isMobile ? ringW * 0.92 : ringW * 0.42, cardWidth)
              )
              const imgArea = Math.round(cardW * 0.56)
              const cardH = imgArea + 88
              return cardH * 1.35
            })()
            : 420,
          perspective: ringW
            ? (() => {
              const cardW = Math.max(
                280,
                Math.min(isMobile ? ringW * 0.92 : ringW * 0.42, cardWidth)
              )
              const rad = Math.round(cardW * 1.1)
              const persp = Math.round(rad * 3.2)
              return `${_perspective ?? persp}px`
            })()
            : `${_perspective}px`,
          touchAction: "pan-y",
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${angle}deg)`,
            transition: anim ? "transform 520ms cubic-bezier(.22,.61,.36,1)" : "none",
          }}
          aria-live="polite"
        >

          {hasItems &&
            windowed.map(({ key, dataIdx, theta }, order) => {
              const it = items[dataIdx]

              const sideSpreadFactor = 1.8
              const half = Math.floor((computedVisible - 1) / 2)
              const rel = order - half
              const adjTheta = theta + rel * (step * (sideSpreadFactor - 1))

              const cardCounter = -(adjTheta + angle)
              const zBump = rel === 0 ? 30 : 16
              const rZ = radius + zBump
              const scale = rel === 0 ? 1.12 : 0.8
              const tiltZ = rel === 0 ? 0 : rel < 0 ? -2 : 2
              const tiltY = rel === 0 ? 0 : rel < 0 ? -18 : 18
              const tiltX = rel === 0 ? 0 : 4
              const opacity = rel === 0 ? 1 : 0.40
              const cardWidthCss: string | number = isMobile ? `min(92vw, ${cardWidth}px)` : cardWidth
              const imageArea = cardHeight - 88

              return (
                <div
                  key={key}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: cardWidthCss,            // ✅ no any
                    height: isMobile ? undefined : cardHeight, // ✅ no any
                    transformStyle: "preserve-3d",
                    transform: `translate(-50%, -50%) rotateY(${adjTheta}deg) translateZ(${rZ}px)`,
                    willChange: "transform",
                  }}
                  aria-hidden={order !== half}
                >
                  <article
                    className="overflow-hidden rounded-2xl "
                    style={{
                      width: "100%",
                      height: "100%",
                      transformOrigin: rel === 0 ? "50% 50%" : "50% 60%",
                      transform: `rotateY(${cardCounter}deg) rotateY(${tiltY}deg) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg) scale(${scale})`,
                      backfaceVisibility: "hidden",
                      opacity,
                      filter: rel === 0 ? "saturate(1.4) brightness(1.12)" : "saturate(0.9) brightness(0.9)",
                      transition: anim ? "transform 520ms cubic-bezier(.22,.61,.36,1)" : "none",
                    }}
                  >
                    <div
                      className="relative w-full "
                      style={
                        isMobile
                          ? { aspectRatio: `${cardWidth}/${imageArea}` }
                          : { height: imageArea }
                      }
                    >
                      <Image
                        src={it.image.src}
                        alt={it.image.alt ?? it.title}
                        fill
                        sizes="(max-width: 640px) 95vw, (max-width: 1024px) 60vw, 33vw"
                        className="object-contain object-center"
                        priority={order === half}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onPointerDown={(e) => e.preventDefault()}
                        style={{ pointerEvents: "none", userSelect: "none" }}
                      />
                    </div>

                    <div className="p-4">
                      {it.href && (
                        <div className="mt-3 flex justify-center">
                          {order === half ? (
                            <Button
                              asChild
                              onPointerDown={(e) => e.stopPropagation()} // cegah drag
                              className="
        relative z-20 text-center sm:text-lg font-semibold
        text-foreground px-6 py-2 rounded-lg
        transition-all duration-500 ease-in-out
        bg-gradient-to-r from-foreground-500 to-foreground-500
        hover:text-background
        before:content-[''] before:absolute before:inset-0
        before:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4),_transparent_70%)]
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100 hover:cursor-pointer
      "
                            >
                              <Link href={it.href} aria-label={`Selengkapnya: ${it.title}`}>
                                {it.title}
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              disabled
                              aria-disabled
                              className="text-center sm:text-lg font-semibold bg-background text-foreground opacity-60 cursor-not-allowed"
                            >
                              {it.title}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              )
            })}
        </div>
      </div>

      {/* Edge gradients to suggest half-visible side cards */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

export default function Circle3DServicesSection({
  defaultCategory = "wingbox",
  headerTitle,
  autoplay = false,
}: {
  defaultCategory?: string
  headerTitle?: string
  autoplay?: boolean
}) {
  const [services, setServices] = useState<ServicesJson | null>(null)
  const [active, setActive] = useState<string>(defaultCategory)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(withBase("/data/services.json"), { cache: "no-store" })
        if (!res.ok) return
        const json = (await res.json()) as ServicesJson
        if (!cancelled) setServices(json)
      } catch {
        // ignore
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const payload: FeaturePayload | null = useMemo(() => {
    const list = services?.categoryServices || []
    const found = list.find((c) => c.category === active) || list[0]
    return found?.data ?? null
  }, [services, active])

  const cards = useMemo(() => {
    return (
      payload?.categories?.map((c) => {
        const key = c.key ?? c.label // ✅ no any
        return {
          key,
          title: c.label,
          description: c.description ?? "",
          image: { src: withBase(c.image.src), alt: c.image.alt },
          href: `/services/${active}?k=${encodeURIComponent(key)}`,
        } as Card
      }) || []
    )
  }, [payload, active])

  const duplicated = useMemo(() => {
    if (!cards.length) return [] as typeof cards
    const minItems = 9
    const cap = 24
    const out: typeof cards = []
    while (out.length < minItems && out.length < cap) {
      out.push(...cards)
    }
    return out.length ? out : cards
  }, [cards])

  return (
    <section id="services-3d" className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {headerTitle || payload?.header || "Layanan"}
          </h2>
          {payload?.subheader && (
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              {payload.subheader}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
          {services?.categoryServices ? (
            services.categoryServices.map((c) => {
              const isActive = c.category === active
              return (
                <Button
                  key={c.category}
                  variant={isActive ? "default" : "outline"}
                  className={cn("rounded-full px-4 md:px-5", isActive ? "" : "bg-transparent")}
                  onClick={() => setActive(c.category)}
                >
                  {c.category.charAt(0).toUpperCase() + c.category.slice(1)}
                </Button>
              )
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Loading...
            </div>
          )}
        </div>

        {duplicated.length > 0 ? (
          <Circle3DCarousel
            items={duplicated}
            radius={560}
            perspective={1600}
            cardWidth={520}
            cardHeight={320}
            autoplay={autoplay}
            autoplayDegPerSec={16}
            startIndex={1}
            visibleCount={3}
          />
        ) : (
          <div className="mx-auto w-full text-center text-muted-foreground py-12">
            Data layanan belum tersedia.
          </div>
        )}
      </div>
    </section>
  )
}