"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { getPaginationRange } from "@/utils/pagination";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  itemLabel?: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  itemLabel,
  className,
}: PaginationProps) {
  const t = useTranslations("common.pagination");

  if (totalPages <= 1) return null;

  const resolvedLabel = itemLabel ?? t("items");
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startItem = (safePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(safePage * itemsPerPage, totalItems);
  const tokens = getPaginationRange(safePage, totalPages);

  return (
    <nav
      aria-label={t("ariaLabel", { label: resolvedLabel })}
      className={cn(
        "mt-10 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-6 sm:flex-row",
        className,
      )}
    >
      <p className="text-xs font-medium text-body sm:text-sm">
        {t("showing", {
          start: startItem,
          end: endItem,
          total: totalItems,
          label: resolvedLabel,
        })}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <motion.button
          type="button"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1}
          whileHover={{ scale: safePage === 1 ? 1 : 1.05 }}
          whileTap={{ scale: safePage === 1 ? 1 : 0.95 }}
          className={`flex cursor-pointer select-none items-center justify-center rounded-full border border-line p-2 text-sm transition-colors ${
            safePage === 1
              ? "cursor-not-allowed bg-surface text-faint opacity-40"
              : "bg-white text-ink hover:border-brand/40 hover:text-brand"
          }`}
          aria-label={t("previousPage")}
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>

        {tokens.map((token, index) => {
          if (token === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="flex h-9 min-w-[28px] select-none items-center justify-center text-xs font-bold text-faint"
              >
                ...
              </span>
            );
          }

          const isActive = token === safePage;

          return (
            <motion.button
              key={token}
              type="button"
              onClick={() => onPageChange(token)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t("pageNumber", { page: token })}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex h-9 min-w-[36px] cursor-pointer select-none items-center justify-center rounded-full px-3 text-xs font-bold transition-all duration-200 ${
                isActive
                  ? "bg-brand text-white shadow-xs"
                  : "border border-line bg-white text-ink hover:border-brand/40 hover:text-brand"
              }`}
            >
              {token}
            </motion.button>
          );
        })}

        <motion.button
          type="button"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
          whileHover={{ scale: safePage === totalPages ? 1 : 1.05 }}
          whileTap={{ scale: safePage === totalPages ? 1 : 0.95 }}
          className={`flex cursor-pointer select-none items-center justify-center rounded-full border border-line p-2 text-sm transition-colors ${
            safePage === totalPages
              ? "cursor-not-allowed bg-surface text-faint opacity-40"
              : "bg-white text-ink hover:border-brand/40 hover:text-brand"
          }`}
          aria-label={t("nextPage")}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </nav>
  );
}
