import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"
import { NavigationMenuDemo } from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Albatros Logistik Express",
  description: "Company Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <NavigationMenuDemo />
          <main className="pt-16 md:pt-[72px]">{children}</main>
        </ThemeProvider>
        <Footer/>
      </body>
    </html>
  );
}
