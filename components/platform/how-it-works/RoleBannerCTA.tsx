"use client";

import type { RoleFlow } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl bg-brand p-8 text-white sm:p-10 md:p-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10"
        />

        <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/75">
              Next Step
            </p>
            <h3 className="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {banner.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/85 sm:text-base">
              {banner.description}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={banner.ctaHref}
              className="group inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand transition-colors hover:bg-surface sm:text-base"
            >
              <span>{banner.ctaText.replace(" →", "")}</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
