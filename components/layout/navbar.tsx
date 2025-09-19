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
  const [isRendered, setIsRendered] = useState(false)
  const openAnimationRaf = useRef<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Load Services dropdown dari public JSON
  type NavFeatureItem = { key: string; label?: string }
  type NavFeaturePayload = { categories: NavFeatureItem[] }
  type NavServicesGlobal = { categoryServices: { category: string; data: NavFeaturePayload }[] }
  const [servicesData, setServicesData] = useState<NavServicesGlobal | null>(null)
  const { theme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  // Handle tema logo
  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setResolvedTheme(isDark ? "dark" : "light")
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

  const logo_fix = resolvedTheme === "dark" ? logo_dark : logo

  // Load services.json
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
        // ignore error
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // refs
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Lock body scroll saat menu buka
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
    if (isOpen) {
      setIsRendered(true)
      return
    }
    if (openAnimationRaf.current !== null) {
      return
    }
    const timeout = window.setTimeout(() => setIsRendered(false), 300)
    return () => window.clearTimeout(timeout)
  }, [isOpen])

  // Scroll effect untuk shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Click outside menu
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!isOpen) return
      const t = event.target as Node
      const clickedInsideMenu = menuRef.current?.contains(t)
      const clickedToggle = buttonRef.current?.contains(t)
      if (!clickedInsideMenu && !clickedToggle) {
        cancelOpenAnimation()
        setIsOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelOpenAnimation()
        setIsOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

  const cancelOpenAnimation = () => {
    if (openAnimationRaf.current) {
      window.cancelAnimationFrame(openAnimationRaf.current)
      openAnimationRaf.current = null
    }
  }

  const toggleMenu = () => {
    if (!isOpen) {
      setIsRendered(true)
      cancelOpenAnimation()
      openAnimationRaf.current = window.requestAnimationFrame(() => {
        setIsOpen(true)
        openAnimationRaf.current = null
      })
      return
    }
    setIsOpen(false)
  }

  const closeMenu = () => {
    cancelOpenAnimation()
    setIsOpen(false)
  }

  useEffect(() => {
    return () => {
      cancelOpenAnimation()
    }
  }, [])

  // Close menu ketika route berubah
  useEffect(() => {
    if (!isOpen) return
    cancelOpenAnimation()
    setIsOpen(false)
  }, [pathname])

  // handle mounting untuk portal
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const overlayAnimation = isOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none"

  const panelAnimation = isOpen
    ? "translate-x-0 pointer-events-auto"
    : "translate-x-full pointer-events-none"

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                    href="https://fleetweb-id.cartrack.com/login"
                    className="px-4 py-2 rounded-md font-semibold bg-chart-2/80 text-foreground transition-colors duration-500 ease-in-out hover:bg-chart-2/20"
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
              onClick={toggleMenu}
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

      {/* Mobile Menu via Portal */}
      {mounted &&
        isRendered &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex">
            <div
              className={`absolute inset-0 bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${overlayAnimation}`}
              aria-hidden="true"
              onClick={closeMenu}
            ></div>
            <aside
              id="mobile-menu"
              ref={menuRef}
              className={`relative ml-auto h-full w-4/5 max-w-sm bg-background border-l border-border/60 shadow-xl transform transition-transform duration-300 ease-in-out will-change-transform ${panelAnimation} pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]`}
              role="dialog"
              aria-modal="true"
            >
              <div className="px-6 py-6 space-y-4 overflow-y-auto h-full">
                <div className="space-y-2">
                  <Link href="/" onClick={closeMenu} className="font-medium text-foreground block">
                    Home
                  </Link>
                </div>
                <div className="space-y-2">
                  <Link href="/about" onClick={closeMenu} className="font-medium text-foreground block">
                    About
                  </Link>
                </div>

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
                              onClick={closeMenu}
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
                  <Link href="/contact" onClick={closeMenu} className="font-medium text-foreground block">
                    Contact
                  </Link>
                </div>
                <div className="space-y-2">
                  <Link
                    href="https://fleetweb-id.cartrack.com/login"
                    onClick={closeMenu}
                    className="font-semibold block text-black bg-chart-4 hover:bg-chart-4/90 px-4 py-2 rounded-md w-fit"
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
