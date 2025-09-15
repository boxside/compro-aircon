"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// merged content uses a single wrapper box instead of Card components
import { cn, withBase } from "@/lib/utils"

type FeatureCategory = {
  key: string
  label: string
  description?: string
  features: string[]
  image: {
    src: string
    alt?: string
  }
}

type FeaturePayload = {
  header: string
  subheader?: string
  categories: FeatureCategory[]
}

type ServicesGlobal = {
  categoryServices: Array<{
    category: string
    data: FeaturePayload
  }>
}

export function DynamicFeatureSection({
  dataUrl,
  category,
}: {
  dataUrl?: string
  category: string
}) {
  const [payload, setPayload] = useState<FeaturePayload | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const searchK = searchParams?.get("k") || undefined

  // default file JSON di public/data/services.json
  const defaultUrl = withBase("/data/services.json")
  const configured = dataUrl ? withBase(dataUrl) : defaultUrl

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setError(null)
        const res = await fetch(configured, { cache: "no-store" })

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${configured} (${res.status})`)
        }

        const raw = await res.json()
        let selected: FeaturePayload | null = null

        if (raw && typeof raw === "object" && "categoryServices" in raw) {
          const global = raw as ServicesGlobal
          const found = global.categoryServices.find((s) => s.category === category)
          if (!found) throw new Error(`Category not found: ${category}`)
          selected = found.data
        } else {
          selected = raw as FeaturePayload
        }

        if (!cancelled && selected) {
          setPayload(selected)
          const urlKey = searchK
          const valid = urlKey && selected.categories.some((c) => c.key === urlKey)
          setActive((valid && urlKey) || selected.categories?.[0]?.key || null)
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load data"
        if (!cancelled) setError(message)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [configured, category, searchK])

  // React to URL query changes after payload is loaded (client-side navigation)
  useEffect(() => {
    if (!payload) return
    const urlKey = searchK
    const valid = urlKey && payload.categories.some((c) => c.key === urlKey)
    const next = (valid && urlKey) || payload.categories?.[0]?.key || null
    setActive(next)
  }, [searchK, payload])

  const activeCategory = useMemo(() => {
    if (!payload || !active) return null
    return payload.categories.find((c) => c.key === active) || null
  }, [payload, active])

  /** ERROR STATE */
  if (error) {
    return (
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 pt-6">
        <p className="text-destructive">{error}</p>
        <p className="text-xs text-muted-foreground mt-1 break-all">
          Tried: <code>{configured}</code>
        </p>
      </div>
    )
  }

  /** LOADING STATE */
  if (!payload) {
    return (
      <div className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 pt-6 animate-pulse text-muted-foreground">
        Loading...
      </div>
    )
  }

  /** MAIN CONTENT */
  return (
    <section className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-10">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {payload.header}
        </h1>
        {payload.subheader && (
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            {payload.subheader}
          </p>
        )}
      </div>

      {/* OPTIONS BUTTON */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
        {payload.categories.map((c) => {
          const isActive = c.key === active
          return (
            <Button
              key={c.key}
              variant={isActive ? "outline" : "ghost"}
              className={cn("rounded-full px-4 md:px-5 py-2", isActive && "bg-accent/60")}
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </Button>
          )
        })}
      </div>

      {/* MERGED CONTENT BOX: text and image in one wrapper */}
      {activeCategory && (
        <div key={active || "_"} className="rounded-xl overflow-hidden animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            {/* Text side */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {activeCategory.label}
              </h2>
              {activeCategory.description && (
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  {activeCategory.description}
                </p>
              )}
              <ul className="mt-5 space-y-3 text-base md:text-lg">
                {activeCategory.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-foreground inline-block" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {(() => {
                  const cat = category.charAt(0).toUpperCase() + category.slice(1)
                  const msg = `Halo, Saya mau Mengirim Barang dengan Armada ${cat} ${activeCategory.label}`
                  const waHref = `https://api.whatsapp.com/send/?phone=628111731443&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`
                  return (
                    <Link href={waHref} target="_blank" rel="noopener noreferrer">
                      <Button size="lg">
                        {`Pesan ${cat} ${activeCategory.label}`}
                      </Button>
                    </Link>
                  )
                })()}
              </div>
            </div>

            {/* Image side */}
            <div className="relative w-full h-72 md:min-h-[420px] bg-background/50">
              <Image
                src={withBase(activeCategory.image.src)}
                alt={activeCategory.image.alt || activeCategory.label}
                fill
                className="object-contain object-center"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default DynamicFeatureSection
