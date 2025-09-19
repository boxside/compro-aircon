"use client"

import { useTheme } from "../ThemeProvider"
import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "../ThemeToggle"
import logo from "@/public/Logo.png"
import logo_dark from "@/public/logo-dark.png"

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
  const [isClosing, setIsClosing] = useState(false) // keep mounted while animating out
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // ----- Data Services (dropdown) -----
  type NavFeatureItem = { key: string; label?: string }
  type NavFeaturePayload = { categories: NavFeatureItem[] }
  type NavServicesGlobal = { categoryServices: { category: string; data: NavFeaturePayload }[] }
  const [servicesData, setServicesData] = useState<NavServicesGlobal | null>(null)

  // ----- Tema untuk logo -----
  const { theme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setResolvedTheme(isDark ? "dark" : "light")
      const media = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = (e: MediaQueryListEvent) => setResolvedTheme(e.matches ? "dark" : "light")
      media.addEventListener("change", handler)
      return () => media.removeEventListener("change", handler)
    } else {
      setResolvedTheme(theme as "light" | "dark")
    }
  }, [theme])
  const logo_fix = resolvedTheme === "dark" ? logo_dark : logo

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const url = withBase("/data/services.json")
        const res = await fetch(url, { cache: "no-store" })
        if (!res.ok) return
        const json = (await res.json()) as NavServicesGlobal
        if (!cancelled) setServicesData(json)
      } catch {}
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // ----- Refs & effects umum -----
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // 🔧 Anti-flicker: jaga padding-right body & navbar ketika lock scroll
  const [scrollbarPad, setScrollbarPad] = useState(0)
  const navbarPadRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // enable stable gutter bila didukung
    try {
      (document.documentElement.style as any).scrollbarGutter = "stable both-edges"
    } catch {}
  }, [])

  useEffect(() => {
    const lock = isOpen || isClosing
    const docEl = document.documentElement
    const currentScrollbar =
      window.innerWidth - docEl.clientWidth // lebar scrollbar (0 di mobile, >0 di desktop)
    if (lock) {
      // set body overflow & padding-right agar layout tak geser
      document.body.style.overflow = "hidden"
      if (currentScrollbar > 0) {
        document.body.style.paddingRight = `${currentScrollbar}px`
        setScrollbarPad(currentScrollbar)
      } else {
        setScrollbarPad(0)
      }
    } else {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      setScrollbarPad(0)
    }

    // sinkronkan padding-right navbar (kalau ada scrollbar di desktop)
    if (navbarPadRef.current) {
      navbarPadRef.current.style.paddingRight = lock && currentScrollbar > 0 ? `${currentScrollbar}px` : ""
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      if (navbarPadRef.current) navbarPadRef.current.style.paddingRight = ""
    }
  }, [isOpen, isClosing])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWithAnimation()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) closeWithAnimation()
  }, [pathname]) // route change → smooth close

  // ----- Portal mount -----
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // ----- Peek logic saat sentuh overlay -----
  const [isPeeking, setIsPeeking] = useState(false)
  const [lastOverlayTap, setLastOverlayTap] = useState<number>(0)
  const peekTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerPeek = () => {
    if (peekTimeoutRef.current) clearTimeout(peekTimeoutRef.current)
    setIsPeeking(true)
    peekTimeoutRef.current = setTimeout(() => setIsPeeking(false), 200)
  }

  const handleOverlayPointerDown = () => {
    const now = Date.now()
    if (now - lastOverlayTap <= 350) {
      closeWithAnimation()
      return
    }
    setLastOverlayTap(now)
    triggerPeek()
  }

  // ----- Close dengan animasi (delay unmount) -----
  const closeWithAnimation = () => {
    if (!isOpen || isClosing) return
    setIsClosing(true)
    window.setTimeout(() => {
      setIsClosing(false)
      setIsOpen(false)
    }, 320) // sinkron dengan duration-300 + buffer
  }

  const onNavClick = () => closeWithAnimation()

  return (
    <>
      {/* NAVBAR */}
      <div
        ref={navbarPadRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu will-change-transform ${
          isScrolled
            ? "bg-background/20 backdrop-blur-sm shadow-md border-b border-border/50"
            : "bg-background"
        }`}
      >
        <div className="w-full px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Go to Homepage" className="inline-block">
              <Image
                src={logo_fix}
                alt="Logo"
                width={120}
                height={80}
                className="cursor-pointer"
                priority
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:block">
            <NavigationMenu viewport={false} className="justify-end">
              <NavigationMenuList className="justify-end ml-auto">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="px-4 py-2 rounded-md font-semibold text-foreground transition-colors 
                               hover:bg-accent text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className="px-4 py-2 rounded-md font-semibold text-foreground transition-colors 
                               hover:bg-accent text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]"
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="px-4 py-2 rounded-md font-semibold text-foreground text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]
                               leading-6 hover:bg-accent transition-colors bg-transparent 
                               data-[state=open]:!bg-transparent focus:outline-none"
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
                                className="block px-2 py-1 rounded-md transition-colors 
                                           hover:bg-accent hover:text-accent-foreground
                                           text-[clamp(0.875rem,0.9vw+0.5rem,1rem)]"
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
                    className="px-4 py-2 rounded-md font-semibold text-foreground transition-colors hover:bg-accent
                               text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="https://fleetweb-id.cartrack.com/login"
                    className="px-4 py-2 rounded-md font-semibold bg-chart-2/80 text-foreground transition-colors duration-500 ease-in-out hover:bg-chart-2/20
                               text-[clamp(0.875rem,1vw+0.5rem,1.125rem)]"
                    target="_blank"
                    rel="noopener noreferrer"
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

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={buttonRef}
              onClick={() => {
                setIsClosing(false)
                setIsOpen((v) => !v)
              }}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu via Portal — tetap mounted saat closing */}
      {mounted && (isOpen || isClosing) &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex">
            {/* Overlay: fade in/out + peek/close */}
            <div
              className={[
                "absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300",
                isClosing ? "opacity-0" : "opacity-100",
                "bg-foreground/20",
              ].join(" ")}
              aria-hidden="true"
              onPointerDown={handleOverlayPointerDown}
              onClick={handleOverlayPointerDown}
            />

            <aside
              id="mobile-menu"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              className={[
                "relative ml-auto h-full w-4/5 max-w-sm bg-background border-l border-border/60 shadow-xl",
                isClosing
                  ? "animate-out slide-out-to-right duration-300"
                  : "animate-in slide-in-from-right duration-300",
                "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
                "transition-transform duration-200 will-change-transform",
                isPeeking ? "-translate-x-3" : "translate-x-0",
              ].join(" ")}
            >
              <div className="px-6 py-6 space-y-4 overflow-y-auto h-full">
                <div className="space-y-2">
                  <Link
                    href="/"
                    onClick={onNavClick}
                    className="font-medium text-foreground block text-[clamp(0.875rem,0.9vw+0.5rem,1rem)]"
                  >
                    Home
                  </Link>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/about"
                    onClick={onNavClick}
                    className="font-medium text-foreground block text-[clamp(0.875rem,0.9vw+0.5rem,1rem)]"
                  >
                    About
                  </Link>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-foreground text-[clamp(0.875rem,0.9vw+0.5rem,1rem)]">Services</div>
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
                              onClick={onNavClick}
                              className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground
                                         text-[clamp(0.875rem,0.9vw+0.5rem,1rem)]"
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
                  <Link
                    href="/contact"
                    onClick={onNavClick}
                    className="font-medium text-foreground block text-[clamp(0.875rem,0.9vw+0.5rem,1rem)]"
                  >
                    Contact
                  </Link>
                </div>
                <div className="space-y-2">
                  <Link
                    href="https://fleetweb-id.cartrack.com/login"
                    onClick={onNavClick}
                    className="font-semibold block text-black bg-chart-4 hover:bg-chart-4/90 px-4 py-2 rounded-md w-fit 
                               text-[clamp(0.875rem,0.9vw+0.5rem,1rem)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lacak pengiriman anda
                  </Link>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  )
}
