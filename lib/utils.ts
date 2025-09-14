import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAbsoluteUrl(u: string) {
  return /^(https?:)?\/\//i.test(u) || /^data:/i.test(u)
}

export function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const clean = path.startsWith("./") ? path.slice(2) : path
  if (isAbsoluteUrl(clean)) return clean
  const p = clean.startsWith("/") ? clean : `/${clean}`
  if (!base) return p
  if (p.startsWith(base + "/") || p === base) return p
  return `${base}${p}`.replace(/\/{2,}/g, "/")
}