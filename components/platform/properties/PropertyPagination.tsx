"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function PropertyPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PropertyPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Range summary text */}
      <p className="text-xs sm:text-sm text-body font-medium">
        Showing <span className="font-bold text-ink">{startItem}–{endItem}</span> of{" "}
        <span className="font-bold text-ink">{totalItems}</span> properties
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <motion.button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          className={`flex items-center justify-center p-2 rounded-full border border-line text-sm transition-colors cursor-pointer select-none ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed bg-surface text-faint"
              : "bg-white text-ink hover:border-brand/40 hover:text-brand"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page Numbers */}
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <motion.button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative min-w-[36px] h-9 px-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none flex items-center justify-center ${
                isActive
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white border border-line text-ink hover:border-brand/40 hover:text-brand"
              }`}
            >
              {page}
            </motion.button>
          );
        })}

        {/* Next Button */}
        <motion.button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          className={`flex items-center justify-center p-2 rounded-full border border-line text-sm transition-colors cursor-pointer select-none ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed bg-surface text-faint"
              : "bg-white text-ink hover:border-brand/40 hover:text-brand"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
