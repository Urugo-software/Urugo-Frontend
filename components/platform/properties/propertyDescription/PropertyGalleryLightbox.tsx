"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";

import type { PropertyImage } from "@/types/properties";

interface PropertyGalleryLightboxProps {
  images: PropertyImage[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onClose: () => void;
}

export function PropertyGalleryLightbox({
  images,
  activeIndex,
  onSelectIndex,
  onClose,
}: PropertyGalleryLightboxProps) {
  const t = useTranslations("properties.details.lightbox");
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});
  const total = images.length;
  const safeIndex = Math.min(Math.max(0, activeIndex), Math.max(0, total - 1));
  const current = images[safeIndex];

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && total > 1) {
        onSelectIndex((safeIndex - 1 + total) % total);
      } else if (e.key === "ArrowRight" && total > 1) {
        onSelectIndex((safeIndex + 1) % total);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onSelectIndex, safeIndex, total]);

  if (!current) return null;

  const goPrev = () => onSelectIndex((safeIndex - 1 + total) % total);
  const goNext = () => onSelectIndex((safeIndex + 1) % total);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("dialogAria")}
      className="fixed inset-0 z-50 flex flex-col bg-ink/92 text-white backdrop-blur-xs"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="font-mono text-xs font-semibold text-white/80">
            {t("photoCounter", { current: safeIndex + 1, total })}
          </p>
          <p className="truncate text-sm font-medium text-white">
            {current.alt}
          </p>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("closeAria")}
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      {/* Main Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6 sm:px-14">
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label={t("prevAria")}
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
        )}

        <div className="relative h-full max-h-[70dvh] w-full max-w-5xl overflow-hidden rounded-lg bg-black/40">
          {failedIds[current.id] ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 text-white/70">
              <ImageOff aria-hidden="true" className="size-8" />
              <p className="text-sm">{t("imageUnavailable")}</p>
            </div>
          ) : (
            <Image
              src={current.image}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              onError={() =>
                setFailedIds((prev) => ({ ...prev, [current.id]: true }))
              }
            />
          )}
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label={t("nextAria")}
            className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>

      {/* Thumbnail Strip */}
      {total > 1 && (
        <div className="border-t border-white/10 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => {
              const active = idx === safeIndex;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  aria-label={t("thumbAria", { index: idx + 1, alt: img.alt })}
                  aria-current={active ? "true" : undefined}
                  className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all ${
                    active
                      ? "border-white opacity-100"
                      : "border-transparent opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={img.image}
                    alt={img.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
