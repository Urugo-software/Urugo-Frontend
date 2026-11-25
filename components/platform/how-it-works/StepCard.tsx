"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Step } from "@/types";

interface StepCardProps {
  step: Step;
  index: number;
  totalSteps: number;
}

export default function StepCard({ step, index }: StepCardProps) {
  const t = useTranslations("public.howItWorks");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative z-10 flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-lg"
    >
      {/* Subtle background glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top Header Row with Animated Step Number Badge */}
      <div className="mb-5 flex items-center justify-between">
        <div className="relative">
          {/* Pulsing ring on hover */}
          <div className="absolute -inset-1 rounded-full bg-brand/20 opacity-0 blur-xs transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />

          {/* Number Circle */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-brand/15 bg-white text-xl font-black text-brand shadow-sm transition-transform duration-300 group-hover:scale-105">
            {step.stepNumber}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-extrabold tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
        {step.title}
      </h3>

      {/* Description */}
      <p className="flex-grow text-sm font-normal leading-relaxed text-body">
        {step.description}
      </p>

      {/* Step Indicator footer accent */}
      <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs font-medium text-body/60">
        <span>
          {t("stepLabel", {
            number: String(step.stepNumber).padStart(2, "0"),
          })}
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-brand/40 transition-all group-hover:scale-125 group-hover:bg-brand" />
      </div>
    </motion.div>
  );
}
