"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "../ThemeToggle"
import logo from "@/public/next.svg"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

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

        {/* Desktop */}
        <div className="hidden md:block">
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
                <Link
                  href="/projects"
                  className="px-4 py-2 rounded-md font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  Projects
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="px-4 py-2 rounded-md font-semibold text-foreground text-base leading-6 hover:bg-accent transition-colors bg-transparent data-[state=open]:!bg-transparent focus:outline-none"
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-auto right-0">
                  <ul className="grid w-[200px] gap-4 p-3">
                    <li className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-muted-foreground">ABC</span>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/a"
                          className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          a
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/b"
                          className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          b
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/c"
                          className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          c
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    <li className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-muted-foreground">DEF</span>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/d"
                          className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          d
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/e"
                          className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          e
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/faq"
                  className="px-4 py-2 rounded-md font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  FAQ
                </Link>
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
                <ThemeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="mobile-menu md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg z-[60]"
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

            <div className="space-y-2">
              <Link href="/projects" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">
                Projects
              </Link>
            </div>

            {/* Simple with groups */}
            <div className="space-y-2">
              <div className="font-medium text-foreground">Simple</div>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">ABC</div>
                  <div className="flex flex-col gap-1">
                    <Link href="/a" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                      a
                    </Link>
                    {/* Hindari '#' agar route change memicu penutupan otomatis */}
                    <Link href="/b" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                      b
                    </Link>
                    <Link href="/c" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                      c
                    </Link>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">DEF</div>
                  <div className="flex flex-col gap-1">
                    <Link href="/d" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                      d
                    </Link>
                    <Link href="/e" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                      e
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Link href="/faq" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">
                FAQ
              </Link>
            </div>

            <div className="space-y-2">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
