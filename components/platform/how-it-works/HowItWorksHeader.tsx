"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import HeaderSection from "../home/AI-assistant/HeaderSection";

export interface HowItWorksHeaderProps {
  subTitle?: string;
  title?: string;
  description?: string;
}

export default function HowItWorksHeader({
  subTitle,
  title,
  description,
}: HowItWorksHeaderProps) {
  const t = useTranslations("public.howItWorks.header");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-4xl px-6 pt-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <HeaderSection
          subTitle={subTitle ?? t("subTitle")}
          Title={title ?? t("title")}
          classNameTitle="text-3xl text-ink sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            {description ?? t("description")}
          </p>
        </HeaderSection>
      </motion.div>
    </motion.div>
  );
}
