"use client"

import { motion } from "framer-motion"

type AboutCompanyProps = {
  title?: string
  subtitle?: string
  missionTitle?: string
  missionText?: string
  visionTitle?: string
  visionText?: string
  valuesTitle?: string
  valuesText?: string
}

export default function AboutCompany({
  title = "Mitra Logistik Tepercaya",
  subtitle =
    "Kami membantu bisnis mengirimkan barang dengan aman, cepat, dan transparan. Dengan jaringan distribusi luas, armada terintegrasi, serta tim berpengalaman, kami memastikan rantai pasok Anda berjalan mulus dari hulu ke hilir.",
  missionTitle = "Misi Kami",
  missionText =
    "Kami ingin meruntuhkan hambatan logistik agar setiap produk dapat bergerak lebih cepat, aman, dan terjangkau ke mana pun tujuannya. Kami menghadirkan layanan end-to-end yang transparan sehingga bisnis dari skala apa pun bisa fokus bertumbuh.",
  visionTitle = "Visi Kami",
  visionText =
    "Kami membangun ekosistem logistik yang cerdas dan berkelanjutan-tempat, di mana setiap pelaku usaha di Indonesia dapat memulai, mengembangkan, dan menjangkau pasar global tanpa batas.",
  valuesTitle = "Nilai-Nilai Kami",
  valuesText =
    "Integritas, ketepatan waktu, keamanan, layanan pelanggan, dan inovasi menjadi fondasi kami dalam melayani setiap pengiriman.",
}: AboutCompanyProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  return (
    <section className="w-full bg-background text-foreground py-20 md:py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-lg">{missionTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {missionText}
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-lg">{visionTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {visionText}
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-lg">{valuesTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {valuesText}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
