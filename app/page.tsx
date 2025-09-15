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
            src: "./IMG_9007.webp",
            caption: "Your Smart Logistic Partner",
            subcaption: "Trained and Certified Driver",
          },
          {
            src: "./image.webp",
            caption: "Guaranteed Customer Satisfaction Every Time",
          },
          {
            src: "./IMG_9022.webp",
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
              "Kami memahami betapa pentingnya kecepatan dan keamanan dalam pengiriman, Wingbox Truck kami memungkinkan proses loading yang lebih praktis dan barang tetap terlindungi selama perjalanan.",
            buttonText: "Pesan Wingbox Truck",
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
