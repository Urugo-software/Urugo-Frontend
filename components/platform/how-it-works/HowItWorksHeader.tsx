"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HeaderSection from "../home/AI-assistant/HeaderSection";

interface HowItWorksHeaderProps {
  subTitle?: string;
  title?: string;
  description?: string;
}

export default function HowItWorksHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-4xl mx-auto pt-16  px-6"
    >
      {/* Animated Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <HeaderSection
          subTitle="How it works"
          Title="Explore roles."
          classNameTitle="text-3xl text-ink sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          <p className="text-body text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed text-gray-600">
            Whether you own a property, rent one, or you're just looking, here's
            exactly what happens on Urugo, step by step.
          </p>
        </HeaderSection>
      </motion.div>
    </motion.div>
  );
}
