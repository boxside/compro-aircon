"use client"
import { useEffect, useState } from "react"
import { useTheme } from "../ThemeProvider"
import Image from "next/image"

const CTA = () => {
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
    // background image (ganti sesuai kebutuhan)
    const bgImage = "/IMG_8906.jpg"

    // gradient sesuai tema
    const lightGradient = "from-background via-background/70 to-transparent"
    const darkGradient = "from-background via-background/70 to-transparent"
    const gradientClass =
        resolvedTheme === "dark" ? darkGradient : lightGradient
    return (
        <div className="relative overflow-hidden ">
            {/* Background image */}
            <Image
                src={bgImage}
                alt="Background"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass}`} />

            {/* Content */}
            <div className="relative px-8 py-50 md:px-12 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Butuh Solusi? Kami Siap Membantu.
                    </h2>
                    <p className="text-foreground mb-6">
                        Tim kami siap memberikan dukungan, menjawab pertanyaan, dan
                        menawarkan solusi terbaik yang sesuai dengan kebutuhan bisnis Anda.
                        Hubungi kami hari ini untuk konsultasi gratis.
                    </p>
                    <a
                        href="/contact-us"
                        className="inline-block bg-card-foreground text-card font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-card hover:text-card-foreground transition-colors duration-200"
                    >
                        Hubungi Kami
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CTA
