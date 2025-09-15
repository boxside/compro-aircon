"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export type ClientLogo = {
  src: string
  alt?: string
}

interface PelangganKamiProps {
  title?: string
  logos: ClientLogo[]
  autoplayMs?: number
}

export default function PelangganKami({
  title = "Mereka yang Sudah Percaya dengan Kami",
  logos,
  autoplayMs,
}: PelangganKamiProps) {
  if (!logos?.length) return null

  return (
    <section id="carousel-pelanggan" className="bg-background py-24 px-0 w-full">
      <div className="max-w-none mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="overflow-hidden group relative">
            <div
              className="flex items-center gap-10 md:gap-14 lg:gap-20 py-2 marquee-track"
              style={{ animationDuration: autoplayMs ? `${autoplayMs}ms` : undefined }}
            >
              {logos.concat(logos).map((logo, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 flex items-center h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-48 lg:h-28 lg:w-56 xl:h-32 xl:w-64 2xl:h-36 2xl:w-72"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt ?? "Client logo"}
                    fill
                    sizes="(min-width: 1536px) 288px, (min-width: 1280px) 256px, (min-width: 1024px) 224px, (min-width: 768px) 192px, (min-width: 640px) 160px, 128px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Gradient kiri-kanan */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-32 md:w-36 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-32 md:w-36 bg-gradient-to-l from-background to-transparent" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
