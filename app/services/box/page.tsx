import DynamicFeatureSection from "@/components/layout/DynamicFeatureSection"
import { Suspense } from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Ekspedisi Box - PT Albatros Logistik Express",
  description: "",
};
export default function boxPage() {
  return (
    <main className=" md:pt-24 pb-16">
      <Suspense fallback={<div className="px-4 sm:px-6 lg:px-8 pt-6">Loading...</div>}>
        <DynamicFeatureSection category="box" />
      </Suspense>
    </main>
  )
}
