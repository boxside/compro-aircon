import { MetricsSection } from "@/components/layout/card1";
import HeroCarousel from "@/components/layout/HeroCarousel";
import PelangganKami, { ClientLogo } from "@/components/layout/CustomerCarousel"
import Circle3DServicesSection from "@/components/layout/Circle3DServicesSection";
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
            src: "./IMG_9022.webp",
            caption: "Trusted. Reliable. Innovative.",
          },
          {
            src: "./IMG_9007.webp",
            caption: "Your Smart Logistic Partner",
            subcaption: "Pengemudi Bersertifikat, Layanan Profesional, Barang Aman Sampai Tujuan.",
          },
          {
            src: "./image.webp",
            caption: "Guaranteed Customer Satisfaction Every Time",
          },

        ]}
      />
      <OurStory />
      <MetricsSection />
      <Circle3DServicesSection defaultCategory="wingbox" headerTitle="Layanan Kami" />
      {/* Old zigzag features retained above replaced by services slider */}
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
