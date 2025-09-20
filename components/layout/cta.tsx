"use client"
import { useEffect, useState } from "react"
import { useTheme } from "../ThemeProvider"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import bg from "@/public/IMG_8933.webp"

type CTAProps = {
    title?: string
    caption?: string
    buttonText?: string
    buttonHref?: string
    imageSrc?: StaticImageData | string
}

const CTA = ({
    title = "Butuh Solusi? Kami Siap Membantu.",
    caption = "Tim kami siap memberikan dukungan, menjawab pertanyaan, dan menawarkan solusi terbaik yang sesuai dengan kebutuhan bisnis Anda. Hubungi kami hari ini untuk konsultasi gratis.",
    buttonText = "Hubungi Kami",
    buttonHref = "wa.me/0817731443",
    imageSrc = bg,
}: CTAProps) => {
    const { theme } = useTheme()
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setResolvedTheme(isDark ? "dark" : "light")

            // 🔄 Listen kalau user ganti system theme real-time
            const media = window.matchMedia("(prefers-color-scheme: dark)")
            const handler = (e: MediaQueryListEvent) => {
                setResolvedTheme(e.matches ? "dark" : "light")
            }
            media.addEventListener("change", handler)

            return () => media.removeEventListener("change", handler)
        } else {
            setResolvedTheme(theme as "light" | "dark")
        }
    }, [theme])

    // gradient sesuai tema
    const lightGradient = "from-background via-background/70 to-transparent"
    const darkGradient = "from-background via-background/70 to-transparent"
    const gradientClass =
        resolvedTheme === "dark" ? darkGradient : lightGradient
    return (
        <div className="relative h-[50vh] overflow-hidden bg-background">
            {/* Background image */}
            <Image
                src={imageSrc}
                alt="Background"
                fill
                priority
                className="object-cover object-center"
                style={{ objectPosition: "center 65%" }}
            />

            {/* Overlay gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass}`} />

            {/* Content */}
            <div className="relative px-8 md:px-12 h-full flex flex-col md:flex-row items-center justify-center md:justify-start">
                <div className="text-left max-w-xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {title}
                    </h2>
                    {caption && (
                        <p className="text-foreground mb-6">
                            {caption}
                        </p>
                    )}
                    {buttonHref && buttonText && (
                        <Link
                            href={buttonHref}
                            className="inline-block bg-foreground text-background font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-card hover:text-card-foreground transition-colors duration-200"
                        >
                            {buttonText}
                        </Link>
                    )}
                </div>
            </div>
        </div>


    )
}

export default CTA
