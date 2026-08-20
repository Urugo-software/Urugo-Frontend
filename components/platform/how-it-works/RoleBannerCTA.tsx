"use client";

import { RoleFlow } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface RoleBannerCTAProps {
  banner: RoleFlow["banner"];
  roleId: string;
}

export default function RoleBannerCTA({ banner, roleId }: RoleBannerCTAProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={roleId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand to-blue-700 text-white p-8 sm:p-10 md:p-12 shadow-xl"
      >
        {/* Background Decorative Circles */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold mb-3 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Step</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {banner.title}
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {banner.description}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0"
          >
            <Link
              href={banner.ctaHref}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white text-brand font-bold text-sm sm:text-base shadow-lg hover:bg-surface transition-colors group cursor-pointer"
            >
              <span>{banner.ctaText.replace(" →", "")}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
