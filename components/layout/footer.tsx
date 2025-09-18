"use client"

import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "../ThemeProvider"
import logo from "@/public/Logo.png"
import logo_dark from "@/public/logo-dark.png"

const Footer = () => {
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
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const logo_fix =
    resolvedTheme === "dark" ? logo_dark : logo
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-40 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Image src={logo} alt="Logo" width={120} height={80} className="block dark:hidden" />
                <Image src={logo_dark} alt="Logo Dark" width={120} height={80} className="hidden dark:block" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">PT Albatros Logistik Express</h3>
                <p className="text-sm text-muted-foreground">Professional Logistic Services</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Solusi logistik andal untuk kebutuhan bisnis Anda.
              Cepat, aman, dan terpercaya sejak 2016.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>(+6221) 82697571</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>service@albatroslogistikexpress.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Jl. HM. Joyo Martono No.8, Margahayu, Kec. Bekasi Tim., Kota Bks, Jawa Barat 17113</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services/wingbox/?k=tronton" className="hover:text-foreground transition-colors">
                  Tronton Wingbox
                </Link>
              </li>
              <li>
                <Link href="/services/wingbox/?k=fuso" className="hover:text-foreground transition-colors">
                  Fuso Wingbox
                </Link>
              </li>
              <li>
                <Link href="/services/box/?k=cddlong" className="hover:text-foreground transition-colors">
                  Double Long box
                </Link>
              </li>
              <li>
                <Link href="/services/box/?k=cddstandard" className="hover:text-foreground transition-colors">
                  Double box
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">

              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                href="https://fleetweb-id.cartrack.com/login" 
                className="hover:text-foreground transition-colors"
                target="_blank" 
                rel="noopener noreferrer">
                  Lacak Pengiriman Anda
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 PT Albatros Logistik Express All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;