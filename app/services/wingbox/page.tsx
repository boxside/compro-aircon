import DynamicFeatureSection from "@/components/layout/DynamicFeatureSection"
import { Suspense } from "react"

export default function WingboxPage() {
  return (
    <main className="pt-14 md:pt-24 pb-16">
        <DynamicFeatureSection category="wingbox" />
    </main>
  )
}
