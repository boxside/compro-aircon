import { MetricsSection } from "@/components/layout/card1";
import HeroCarousel from "@/components/layout/HeroCarousel";
import PelangganKami, { ClientLogo } from "@/components/layout/CustomerCarousel"
import Circle3DServicesSection from "@/components/layout/Circle3DServicesSection";
import CTA from "@/components/layout/cta";
import { OurStory } from "@/components/layout/story";
import ctaimg from "@/public/IMG_8933.webp"
const logos: ClientLogo[] = [
  { src: "./astraoto.png", alt: "Astra Otopart" },
  { src: "./Enkei.png", alt: "Enkei" },
  { src: "./CMWI.png", alt: "CMWI" },
  { src: "./nidec.png", alt: "Nidec" },
  { src: "./gohsyu.png", alt: "Gohsyu" },
  { src: "./enesis.png", alt: "Enesis" },
  { src: "./logo_rayspeed_blue.webp", alt: "Rayspeed" },

]
export default function Home() {
  return (
    <>
      <HeroCarousel
        slides={[
          {
            src: "./IMG_9022.webp",
            caption: "Layanan yang Terpercaya, Andal, dan Selalu Berinovasi.",
          },
          {
            src: "./IMG_9007.webp",
            caption: "Mitra Logistik Terpercaya",
            subcaption: "Pengemudi Bersertifikat, Layanan Profesional, Barang Aman Sampai Tujuan.",
          },
          {
            src: "./image.webp",
            caption: "Selalu Memberikan Pengalaman Terbaik untuk Pelanggan",
          },

        ]}
      />
      <OurStory />
      <MetricsSection />
      <Circle3DServicesSection defaultCategory="wingbox" headerTitle="Layanan Kami" />
      {/* Old zigzag features retained above replaced by services slider */}
      <PelangganKami title="Klien Kami" subtitle="Mitra yang telah mempercayakan logistik mereka kepada kami." logos={logos} />

      <CTA
        title="Butuh Solusi? Kami Siap Membantu."
        caption="Tim kami siap memberikan dukungan, menjawab pertanyaan, dan menawarkan solusi terbaik yang sesuai dengan kebutuhan bisnis Anda. Hubungi kami hari ini untuk konsultasi gratis."
        buttonText="Hubungi Kami"
        buttonHref="https://wa.me/62817731443"
        imageSrc={ctaimg}
      />
    </>
  );
}
