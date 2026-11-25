"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface AssistantLauncherProps {
  onOpen: () => void;
  visual: React.ReactNode;
}

export function AssistantLauncher({ onOpen, visual }: AssistantLauncherProps) {
  const t = useTranslations("public.zoe");

  return (
    <motion.button
      type="button"
      aria-label={t("openAria")}
      title={t("askTitle")}
      className="fixed bottom-4 right-4 z-40 size-16 cursor-pointer overflow-hidden rounded-full border border-brand/25 bg-white shadow-xl transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:size-20"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpen}
    >
      {visual}
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 right-1.5 size-3 rounded-full border-2 border-white bg-success"
      />
    </motion.button>
  );
}
