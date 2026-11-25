"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ImageOff, Images } from "lucide-react";

import type { PropertyImage } from "@/types/properties";
import { getGalleryPreviewMeta } from "@/utils/public-properties";
import { PropertyGalleryLightbox } from "./PropertyGalleryLightbox";

interface PropertyGalleryProps {
  images: PropertyImage[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const t = useTranslations("properties.details.gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const meta = getGalleryPreviewMeta(images.length, 3);

  if (meta.total === 0) {
    return (
      <div className="mb-8 flex h-[240px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-surface text-faint md:h-[360px]">
        <ImageOff aria-hidden="true" className="size-8" />
        <p className="text-sm font-medium">{t("noPhotos")}</p>
      </div>
    );
  }

  const [mainImage, secondImage, thirdImage] = images;
  const activeMobileImage = images[mobileIndex] ?? mainImage;
  const isSingle = meta.total === 1;
  const isDouble = meta.total === 2;

  return (
    <>
      {/* Mobile Interactive Carousel (< md) */}
      <div className="relative mb-6 overflow-hidden rounded-xl border border-line bg-surface md:hidden">
        <button
          type="button"
          onClick={() => setLightboxIndex(mobileIndex)}
          aria-label={t("openPhotoAria", {
            current: mobileIndex + 1,
            total: meta.total,
          })}
          className="relative block h-[270px] w-full cursor-pointer sm:h-[320px]"
        >
          <Image
            src={activeMobileImage.image}
            alt={activeMobileImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </button>

        {meta.total > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setMobileIndex((prev) => (prev - 1 + meta.total) % meta.total)
              }
              aria-label={t("prevPhotoAria")}
              className="absolute left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs hover:bg-black/75"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileIndex((prev) => (prev + 1) % meta.total)}
              aria-label={t("nextPhotoAria")}
              className="absolute right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs hover:bg-black/75"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>

            <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 font-mono text-xs font-semibold text-white backdrop-blur-xs">
              {mobileIndex + 1} / {meta.total}
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(mobileIndex)}
              className="absolute bottom-3 right-3 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm"
            >
              <Images aria-hidden="true" className="size-3.5 text-brand" />
              <span>{t("allPhotos", { total: meta.total })}</span>
            </button>
          </>
        )}
      </div>

      {/* Desktop Grid Gallery (>= md) */}
      <div
        className={`relative mb-8 hidden h-[390px] overflow-hidden rounded-xl md:grid ${
          isSingle
            ? "grid-cols-1"
            : isDouble
              ? "grid-cols-2 gap-3"
              : "grid-cols-[1.6fr_1fr] gap-3"
        }`}
      >
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          aria-label={t("viewPhotoAria", {
            current: 1,
            total: meta.total,
            alt: mainImage.alt,
          })}
          className="group relative h-full w-full cursor-pointer overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
        >
          <Image
            src={mainImage.image}
            alt={mainImage.alt}
            fill
            priority
            sizes={isSingle ? "1200px" : "(max-width: 1280px) 62vw, 760px"}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>

        {isDouble && secondImage && (
          <button
            type="button"
            onClick={() => setLightboxIndex(1)}
            aria-label={t("viewPhotoAria", {
              current: 2,
              total: meta.total,
              alt: secondImage.alt,
            })}
            className="group relative h-full w-full cursor-pointer overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
          >
            <Image
              src={secondImage.image}
              alt={secondImage.alt}
              fill
              sizes="(max-width: 1280px) 50vw, 600px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
        )}

        {!isSingle && !isDouble && (
          <div className="grid h-full grid-rows-2 gap-3">
            {secondImage && (
              <button
                type="button"
                onClick={() => setLightboxIndex(1)}
                aria-label={t("viewPhotoAria", {
                  current: 2,
                  total: meta.total,
                  alt: secondImage.alt,
                })}
                className="group relative h-full w-full cursor-pointer overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
              >
                <Image
                  src={secondImage.image}
                  alt={secondImage.alt}
                  fill
                  sizes="(max-width: 1280px) 38vw, 480px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            )}

            {thirdImage && (
              <button
                type="button"
                onClick={() => setLightboxIndex(2)}
                aria-label={
                  meta.hasExtra
                    ? t("openExtraAria", { count: meta.extraCount })
                    : t("viewPhotoAria", {
                        current: 3,
                        total: meta.total,
                        alt: thirdImage.alt,
                      })
                }
                className="group relative h-full w-full cursor-pointer overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
              >
                <Image
                  src={thirdImage.image}
                  alt={thirdImage.alt}
                  fill
                  sizes="(max-width: 1280px) 38vw, 480px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                {meta.hasExtra && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/55 text-white transition-colors group-hover:bg-ink/65">
                    <span className="font-ibm text-2xl font-extrabold tracking-tight">
                      +{meta.extraCount}
                    </span>
                    <span className="mt-0.5 text-xs font-semibold">
                      {t("morePhotosLabel", { count: meta.extraCount })}
                    </span>
                  </div>
                )}
              </button>
            )}
          </div>
        )}

        {meta.total > 1 && (
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="absolute bottom-3.5 right-3.5 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-white/95 px-3.5 py-2 text-xs font-semibold text-ink shadow-md backdrop-blur-xs transition-colors hover:bg-white hover:text-brand"
          >
            <Images aria-hidden="true" className="size-4 text-brand" />
            <span>{t("viewAllPhotos", { total: meta.total })}</span>
          </button>
        )}
      </div>

      {lightboxIndex !== null && (
        <PropertyGalleryLightbox
          images={images}
          activeIndex={lightboxIndex}
          onSelectIndex={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
