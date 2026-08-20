"use client";

import { Step } from "@/types";
import { motion } from "framer-motion";

interface StepCardProps {
  step: Step;
  index: number;
  totalSteps: number;
}

export default function StepCard({ step, index }: StepCardProps) {
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
      className="group relative z-10 flex flex-col p-6 rounded-2xl bg-white border border-line hover:border-brand/30 hover:shadow-lg transition-all duration-300 h-full"
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top Header Row with Animated Step Number Badge and Step Icon */}
      <div className="flex items-center justify-between mb-5">
        <div className="relative">
          {/* Pulsing ring on hover */}
          <div className="absolute -inset-1 rounded-full bg-brand/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 blur-xs" />

          {/* Number Circle */}
          <div className="relative w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
            {step.stepNumber}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-extrabold text-ink group-hover:text-brand transition-colors duration-200 mb-2 tracking-tight">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-body leading-relaxed flex-grow font-normal">
        {step.description}
      </p>

      {/* Step Indicator footer accent */}
      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-body/60 font-medium">
        <span>Step 0{step.stepNumber}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-brand/40 group-hover:bg-brand group-hover:scale-125 transition-all" />
      </div>
    </motion.div>
  );
}
