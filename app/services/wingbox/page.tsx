import DynamicFeatureSection from "@/components/layout/DynamicFeatureSection"
import { Suspense } from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Ekspedisi Wingbox - PT Albatros Logistik Express",
  description: "",
};
export default function WingboxPage() {
  return (
    <main className="md:pt-1 pb-16">
        <Suspense fallback={<div className="px-6 pt-6 text-muted-foreground">Loading...</div>}>
          <DynamicFeatureSection category="wingbox" />
        </Suspense>
    </main>
  )
}
