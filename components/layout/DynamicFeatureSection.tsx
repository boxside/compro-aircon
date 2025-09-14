"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

/** Helper untuk prefix basePath (GitHub Pages / production) */
function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  if (!path.startsWith("/")) {
    path = "/" + path
  }
  return `${base}${path}`
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
  const params = useSearchParams()

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
          const urlKey = params.get("k") || undefined
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
  }, [configured, category, params])

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

      {/* CONTENT CARD */}
      {activeCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                {activeCategory.label}
              </CardTitle>
              {activeCategory.description && (
                <CardDescription>{activeCategory.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm md:text-base">
                {activeCategory.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-foreground inline-block" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* IMAGE WITH BASE PATH */}
          <div className="relative w-full h-64 md:h-auto md:min-h-[320px] rounded-xl overflow-hidden border">
            <Image
              src={withBase(activeCategory.image.src)}
              alt={activeCategory.image.alt || activeCategory.label}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default DynamicFeatureSection
