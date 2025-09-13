import { MetricsSection } from "@/components/layout/card1";
import HeroCarousel from "@/components/layout/HeroCarousel";
import PelangganKami, { ClientLogo } from "@/components/layout/CustomerCarousel"
import { FeaturesSection } from "@/components/layout/mainfeature";
import CTA from "@/components/layout/cta";
import { OurStory } from "@/components/layout/story";

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
            title: "Layanan Rumah Tangga",
            caption:
              "AC rusak di saat cuaca terik? Atau listrik melonjak karena mesin tak terawat? Tim kami hadir untuk memastikan sistem pendingin, pemanas, dan ventilasi Anda selalu bekerja optimal. Dari instalasi baru, servis rutin, hingga emergency repair—semua bisa Anda percayakan pada kami.",
            buttonText: "Learn more",
            buttonHref: "/workflow",
            imageSrc: "./IMG_8933.webp",
          },
          {
            title: "Layanan Bisnis",
            caption:
              "Lingkungan kerja yang nyaman meningkatkan produktivitas maupun kepuasan pelanggan. Layanan kami mencakup Instalasi skala besar maupun pemeliharaan preventif untuk kantor, restoran, toko, dan pabrik.",
            buttonText: "Learn more",
            buttonHref: "/collaboration",
            imageSrc: "./vite.svg",
          },
        ]}
      />
      <PelangganKami   title = "Mereka yang Sudah Percaya dengan Kami"  logos={logos} />

      <CTA />

    </>
  );
}
