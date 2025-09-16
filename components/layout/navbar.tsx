"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "../ThemeToggle"
import logo from "@/public/Logo.png"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { withBase } from "@/lib/utils"

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Load Services dropdown from public JSON
  type NavFeatureItem = { key: string; label?: string }
  type NavFeaturePayload = { categories: NavFeatureItem[] }
  type NavServicesGlobal = { categoryServices: { category: string; data: NavFeaturePayload }[] }
  const [servicesData, setServicesData] = useState<NavServicesGlobal | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const url = withBase("/data/services.json")
        const res = await fetch(url, { cache: "no-store" })
        if (!res.ok) return
        const json = (await res.json()) as NavServicesGlobal
        if (!cancelled) setServicesData(json)
      } catch {
        // ignore; keep static links if desired
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Refs penting untuk click-outside yg akurat
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Toggle body scroll saat menu buka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Click/tap di luar menu & tombol => close (pakai pointerdown biar stabil di mobile)
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!isOpen) return
      const t = event.target as Node
      const clickedInsideMenu = menuRef.current?.contains(t)
      const clickedToggle = buttonRef.current?.contains(t)
      if (!clickedInsideMenu && !clickedToggle) {
        setIsOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

  // Tutup saat pindah route
  useEffect(() => {
    setIsOpen(false)
  }, [pathname]) // cukup depend ke pathname

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/20 backdrop-blur-sm shadow-md border-b border-border/50"
          : "bg-background"
        }`}
    >
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} />
        </div>

        {/* Desktop (show from lg and up to avoid cramped 760–1023px) */}
        <div className="hidden lg:block">
          <NavigationMenu viewport={false} className="justify-end">
            <NavigationMenuList className="justify-end ml-auto">
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-md font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="px-4 py-2 rounded-md font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="px-4 py-2 rounded-md font-semibold text-foreground text-base leading-6 hover:bg-accent transition-colors bg-transparent data-[state=open]:!bg-transparent focus:outline-none"
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-auto right-0">
                  <ul className="grid w-[240px] gap-4 p-3">
                    {servicesData?.categoryServices?.map((svc) => (
                      <li key={svc.category} className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-muted-foreground">
                          {svc.category.charAt(0).toUpperCase() + svc.category.slice(1)}
                        </span>
                        {svc.data.categories?.map((item) => (
                          <NavigationMenuLink asChild key={`${svc.category}-${item.key}`}>
                            <Link
                              href={`/services/${svc.category}?k=${encodeURIComponent(item.key)}`}
                              className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              {item.label || item.key}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-md font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/lacak"
                  className="px-4 py-2 rounded-md font-semibold bg-chart-2/80 text-black transition-colors hover:bg-chart-2/20"
                >
                  Lacak pengiriman anda
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ThemeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile/Tablet Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="mobile-menu lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg z-[60]"
        >
          <div className="px-6 py-4 space-y-4">
            <div className="space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">
                Home
              </Link>
            </div>

            <div className="space-y-2">
              <Link href="/about" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">
                About
              </Link>
            </div>


            {/* Services from JSON with groups */}
            <div className="space-y-2">
              <div className="font-medium text-foreground">Services</div>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground">
                {servicesData?.categoryServices?.map((svc) => (
                  <div key={`mobile-${svc.category}`}>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">
                      {svc.category.charAt(0).toUpperCase() + svc.category.slice(1)}
                    </div>
                    <div className="flex flex-col gap-1">
                      {svc.data.categories?.map((item) => (
                        <Link
                          key={`mobile-${svc.category}-${item.key}`}
                          href={`/services/${svc.category}?k=${encodeURIComponent(item.key)}`}
                          onClick={() => setIsOpen(false)}
                          className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.label || item.key}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">
                Contact
              </Link>
            </div>
            <div className="space-y-2">
              <Link
                href="/lacak"
                onClick={() => setIsOpen(false)}
                className="font-semibold block text-black bg-chart-4 hover:bg-chart-4/90 px-4 py-2 rounded-md w-fit"
              >
                Lacak pengiriman anda
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
