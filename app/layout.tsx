import type { Metadata } from "next";
import { Oswald, Roboto_Condensed, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"
import { NavigationMenuDemo } from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const oswald = Oswald({
  weight: "700", // Bold for titles (Oswald supports up to 700)
  variable: "--font-title",
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  weight: "700", // Bold for subtitles
  variable: "--font-subtitle",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400", // Regular for body
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Albatros Logistik Express | Mitra Pengiriman Wingbox Andalan Anda",
  description: "Company Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oswald.variable} ${robotoCondensed.variable} ${roboto.variable}`}>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <NavigationMenuDemo />
          <main className="pt-16 md:pt-[72px]">{children}</main>
        </ThemeProvider>
        <Footer/>
      </body>
    </html>
  );
}
