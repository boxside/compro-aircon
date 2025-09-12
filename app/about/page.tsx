import { MetricsSection } from "@/components/layout/card1";
import PelangganKamiCarousel from "@/components/layout/CustomerCarousel";
export default function Home() {
  return (
    <>


      <MetricsSection />
      <PelangganKamiCarousel
        title="Pelanggan Kami"
        logos={[
          { src: "/vite.svg", alt: "Pertamina" },
          { src: "/vite.svg", alt: "Kemensos" },
          { src: "/vite.svg", alt: "Unilever" },
          { src: "/vite.svg", alt: "Kemenkop" },
          { src: "/vite.svg", alt: "PLN" },
          { src: "/vite.svg", alt: "WIKA" },
          { src: "/vite.svg", alt: "WIKA" },
          { src: "/vite.svg", alt: "WIKA" },
          { src: "/vite.svg", alt: "WIKA" },
          { src: "/vite.svg", alt: "WIKA" },
          { src: "/vite.svg", alt: "WIKA" },
          { src: "/vite.svg", alt: "WIKA" },
          { src: "/vite.svg", alt: "WIKA" },

        ]}
        autoplayMs={2500}
      />

    </>
  );
}
