import { MetricsSection } from "@/components/layout/card1";
import HeroCarousel from "@/components/layout/HeroCarousel";
import PelangganKami, { ClientLogo } from "@/components/layout/CustomerCarousel"
import { FeaturesSection } from "@/components/layout/mainfeature";
import CTA from "@/components/layout/cta";
import { OurStory } from "@/components/layout/story";
import ctaimg from "@/public/IMG_8933.webp"
const logos: ClientLogo[] = [
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },
  { src: "./vite.svg", alt: "Astra" },

]

export default function Home() {
  return (
    <>
      <HeroCarousel
        slides={[
          {
            src: "./vite.svg",
            caption: "Your Smart Logistic Partner",
            subcaption: "Trained and Certified Driver",
          },
          {
            src: "./vite.svg",
            caption: "Guaranteed Customer Satisfaction Every Time",
          },
          {
            src: "./vite.svg",
            caption: "Trusted. Reliable. Innovative.",
          },
        ]}
      />
      <OurStory />
      <MetricsSection />

      <FeaturesSection
        headerTitle="Layanan"

        items={[
          {
            title: "Wingbox Trucking",
            caption:
              "AC rusak di saat cuaca terik? Atau listrik melonjak karena mesin tak terawat? Tim kami hadir untuk memastikan sistem pendingin, pemanas, dan ventilasi Anda selalu bekerja optimal. Dari instalasi baru, servis rutin, hingga emergency repair—semua bisa Anda percayakan pada kami.",
            buttonText: "Learn more",
            buttonHref: "/services/wingbox/",
            imageSrc: "./IMG_8933.webp",
          },
        ]}
      />
      <PelangganKami title="Mereka yang Sudah Percaya dengan Kami" logos={logos} />

      <CTA
        title="Butuh Solusi? Kami Siap Membantu."
        caption="Tim kami siap memberikan dukungan, menjawab pertanyaan, dan menawarkan solusi terbaik yang sesuai dengan kebutuhan bisnis Anda. Hubungi kami hari ini untuk konsultasi gratis."
        buttonText="Hubungi Kami"
        buttonHref="/contact"
        imageSrc={ctaimg}
      />
    </>
  );
}
