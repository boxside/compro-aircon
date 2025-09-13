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
    <section id="carousel-pelanggan" className="bg-background py-24 px-2 w-full">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="overflow-hidden group relative">
            <div
              className="flex items-center gap-12 py-2 marquee-track"
              style={{ animationDuration: autoplayMs ? `${autoplayMs}ms` : undefined }}
            >
              {logos.concat(logos).map((logo, i) => (
                <div
                  key={i}
                  className="h-20 w-40 relative flex-shrink-0 flex items-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt ?? "Client logo"}
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Gradient kiri-kanan */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
