"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && !(event.target as Element).closest('.mobile-menu')) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        if (isOpen) setIsOpen(false);
    }, [pathname, isOpen]);

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

                {/* Desktop Navigation menu */}
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
                                    className="px-4 py-2 rounded-md font-semibold text-foreground bg-transparent hover:bg-accent transition-colors data-[state=open]:!bg-transparent focus:outline-none"
                                >
                                    Services
                                </NavigationMenuTrigger>

                                <NavigationMenuContent className="left-auto right-0">
                                    <ul className="grid w-[200px] gap-4 p-3">
                                        {/* Grup ABC */}
                                        <li className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground">ABC</span>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/a"
                                                    className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:!bg-transparent aria-[current=page]:!bg-transparent"
                                                >
                                                    a
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/b"
                                                    className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:!bg-transparent aria-[current=page]:!bg-transparent"
                                                >
                                                    b
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/c"
                                                    className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:!bg-transparent aria-[current=page]:!bg-transparent"
                                                >
                                                    c
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>

                                        {/* Grup DEF */}
                                        <li className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-muted-foreground">DEF</span>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/d"
                                                    className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:!bg-transparent aria-[current=page]:!bg-transparent"
                                                >
                                                    d
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/e"
                                                    className="block px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:!bg-transparent aria-[current=page]:!bg-transparent"
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

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md hover:bg-accent transition-colors"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="mobile-menu md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg">
                    <div className="px-6 py-4 space-y-4">

                        {/* Home */}
                        <div className="space-y-2">
                            <Link href="/" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">Home</Link>
                        </div>

                        {/* About */}
                        <div className="space-y-2">
                            <Link href="/about" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">About</Link>
                        </div>
                        <div className="space-y-2">
                            <Link href="/projects" className="font-medium text-foreground block">Projects</Link>
                        </div>

                        {/* Simple with groups */}
                        <div className="space-y-2">
                            <div className="font-medium text-foreground">Simple</div>
                            <div className="pl-4 space-y-3 text-sm text-muted-foreground">

                                {/* Grup ABC */}
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground mb-1">ABC</div>
                                    <div className="flex flex-col gap-1">
                                        <Link href="/a" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">a</Link>
                                        <Link href="#" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">b</Link>
                                        <Link href="#" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">c</Link>
                                    </div>
                                </div>

                                {/* Grup DEF */}
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground mb-1">DEF</div>
                                    <div className="flex flex-col gap-1">
                                        <Link href="#" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">d</Link>
                                        <Link href="#" onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">e</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Link href="/faq" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">FAQ</Link>
                        </div>
                        <div className="space-y-2">
                            <Link href="/projects" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">Projects</Link>
                        </div>
                        <div className="space-y-2">
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="font-medium text-foreground block">Contact</Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

