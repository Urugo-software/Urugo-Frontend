"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  itemLabel = "items",
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startItem = (safePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(safePage * itemsPerPage, totalItems);
  const tokens = getPaginationRange(safePage, totalPages);

  return (
    <nav
      aria-label={`${itemLabel} pagination`}
      className={cn(
        "mt-10 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4",
        className,
      )}
    >
      {/* Range summary text */}
      <p className="text-xs sm:text-sm text-body font-medium">
        Showing{" "}
        <span className="font-bold text-ink">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-bold text-ink">{totalItems}</span> {itemLabel}
      </p>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {/* Previous Button */}
        <motion.button
          type="button"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1}
          whileHover={{ scale: safePage === 1 ? 1 : 1.05 }}
          whileTap={{ scale: safePage === 1 ? 1 : 0.95 }}
          className={`flex items-center justify-center p-2 rounded-full border border-line text-sm transition-colors cursor-pointer select-none ${
            safePage === 1
              ? "opacity-40 cursor-not-allowed bg-surface text-faint"
              : "bg-white text-ink hover:border-brand/40 hover:text-brand"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page Numbers */}
        {tokens.map((token, index) => {
          if (token === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="flex h-9 min-w-[28px] items-center justify-center text-xs font-bold text-faint select-none"
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
              aria-label={`Page ${token}`}
              aria-current={isActive ? "page" : undefined}
              className={`relative min-w-[36px] h-9 px-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none flex items-center justify-center ${
                isActive
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white border border-line text-ink hover:border-brand/40 hover:text-brand"
              }`}
            >
              {token}
            </motion.button>
          );
        })}

        {/* Next Button */}
        <motion.button
          type="button"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
          whileHover={{ scale: safePage === totalPages ? 1 : 1.05 }}
          whileTap={{ scale: safePage === totalPages ? 1 : 0.95 }}
          className={`flex items-center justify-center p-2 rounded-full border border-line text-sm transition-colors cursor-pointer select-none ${
            safePage === totalPages
              ? "opacity-40 cursor-not-allowed bg-surface text-faint"
              : "bg-white text-ink hover:border-brand/40 hover:text-brand"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </nav>
  );
}
