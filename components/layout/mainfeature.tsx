"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface FeatureRowProps {
  title: string
  caption: string
  buttonText: string
  buttonHref: string
  imageSrc: string
  reverse?: boolean
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export function FeatureRow({
  title,
  caption,
  buttonText,
  buttonHref,
  imageSrc,
  reverse = false,
}: FeatureRowProps) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="w-full bg-card rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="grid md:grid-cols-2 h-full gap-8 items-stretch">
        {/* Text */}
        <div
          className={`flex flex-col justify-center space-y-6 p-8 ${
            reverse ? "md:order-2" : "md:order-1"
          } order-2`}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            {title}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {caption}
          </p>
          <Link
            href={buttonHref}
            className="inline-block bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 text-center rounded-lg font-medium text-sm sm:text-base transition-colors hover:bg-primary/90"
          >
            {buttonText}
          </Link>
        </div>

        {/* Image */}
        <div
          className={`relative w-full aspect-[16/9] ${
            reverse ? "md:order-1" : "md:order-2"
          } order-1`}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </motion.section>
  )
}

interface FeaturesSectionProps {
  items: FeatureRowProps[]
  headerTitle?: string
  headerSubtitle?: string
}

export function FeaturesSection({
  items,
  headerTitle,
  headerSubtitle,
}: FeaturesSectionProps) {
  return (
    <section className="bg-background text-foreground py-20 px-6 md:px-12">
      {/* Header di luar card */}
      {(headerTitle || headerSubtitle) && (
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          {headerTitle && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {headerTitle}
            </h2>
          )}
          {headerSubtitle && (
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {headerSubtitle}
            </p>
          )}
        </div>
      )}

      {/* Zigzag cards */}
      <div className="space-y-16">
        {items.map((item, i) => (
          <FeatureRow key={i} {...item} reverse={i % 2 !== 0} />
        ))}
      </div>
    </section>
  )
}
