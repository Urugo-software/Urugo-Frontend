"use client";

import { AnimatePresence, motion } from "framer-motion";
import StepCard from "./StepCard";
import { Step } from "@/types";

interface StepFlowGridProps {
  steps: Step[];
  roleId: string;
}

export default function StepFlowGrid({ steps, roleId }: StepFlowGridProps) {
  return (
    <div className="relative mt-22 pb-16">
      {/* Animated Desktop Connector Line */}
      <div className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-[2px] z-0 pointer-events-none overflow-hidden">
        {/* Static track */}
        <div className="w-full h-full bg-brand/15 border-t-2 border-dashed border-brand/30" />

        {/* Moving glow beam overlay */}
        <motion.div
          key={roleId}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-brand to-transparent opacity-60 h-full"
        />
      </div>

      {/* Grid of Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={roleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.stepNumber}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
