"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
};

export default function FAQ({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to the most common questions about our service",
  items = [
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time. You'll continue to have access to the service until the end of your billing period.",
    },
    {
      question: "How do I access premium features?",
      answer:
        "Premium features are available on paid plans. Upgrade from your account settings and they unlock instantly.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "We offer a 14-day free trial with full access so you can evaluate the product without commitment.",
    },
    {
      question: "How does the team billing work?",
      answer:
        "You are billed per active seat. Add or remove members at any time—billing pro-rates automatically.",
    },
    {
      question: "Is there a discount for annual billing?",
      answer:
        "Yes, annual plans include a discount compared to monthly billing.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards and bank transfers for eligible invoices.",
    },
  ],
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <header className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            {subtitle}
          </p>
        </header>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border bg-card/60 backdrop-blur-sm transition-colors"
              >
                <button
                  className="w-full flex items-center gap-3 md:gap-4 p-5 md:p-6 text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <HelpCircle className="size-5 md:size-6 text-primary" />
                  <span className="flex-1 font-semibold md:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`size-5 md:size-6 transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden px-12 md:px-14 -mt-2"
                    >
                      <div className="pb-6 text-sm md:text-base text-muted-foreground">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 size-4 md:size-5 text-primary" />
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
