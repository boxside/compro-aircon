import AboutCompany from "@/components/layout/AboutCompany"
import OurJourney, { type JourneyItem } from "@/components/layout/OurJourney"
import CTA from "@/components/layout/cta"
export default function AboutPage() {
  return (
    <>
      <AboutCompany />
      <OurJourney
        items={[
          {
            year: 2010,
            title: "Company Founded",
            description:
              "Started with a team of 3 in a small office in San Francisco.",
            side: "right",
          },
          {
            year: 2013,
            title: "First Major Product Launch",
            description:
              "Released our flagship product that changed the industry.",
            side: "left",
          },
          {
            year: 2015,
            title: "International Expansion",
            description:
              "Opened our first international offices in London and Tokyo.",
            side: "right",
          },
          {
            year: 2018,
            title: "100,000 Customers",
            description:
              "Reached a milestone of 100,000 active customers worldwide.",
            side: "left",
          },
          {
            year: 2020,
            title: "Major Acquisition",
            description:
              "Acquired our biggest competitor to expand our market reach.",
            side: "right",
          },
          {
            year: 2023,
            title: "Sustainability Initiative",
            description:
              "Launched our commitment to be carbon neutral by 2025.",
            side: "left",
          },
        ] satisfies JourneyItem[]}
      />
      <CTA  />
    </>
  )
}
