import DynamicFeatureSection from "@/components/layout/DynamicFeatureSection"
import { Suspense } from "react"

export default function WingboxPage() {
  return (
    <main className="pt-14 md:pt-24 pb-16">
      <Suspense fallback={<div className="px-4 sm:px-6 lg:px-8 pt-6">Loading...</div>}>
        <DynamicFeatureSection category="wingbox" />
      </Suspense>
    </main>
  )
}
