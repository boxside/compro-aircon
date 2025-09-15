import DynamicFeatureSection from "@/components/layout/DynamicFeatureSection"
import { Suspense } from "react"

export default function WingboxPage() {
  return (
    <main className="pt-14 md:pt-24 pb-16">
        <Suspense fallback={<div className="px-6 pt-6 text-muted-foreground">Loading...</div>}>
          <DynamicFeatureSection category="wingbox" />
        </Suspense>
    </main>
  )
}
