"use client";

import Image from "next/image";
import { ImagePlus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { readImageFile } from "@/utils/image-file";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_PHOTOS = 6;

interface PropertyGalleryFieldProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function PropertyGalleryField({
  images,
  onChange,
}: PropertyGalleryFieldProps) {
  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setError(null);
    const remaining = MAX_PHOTOS - images.length;
    if (remaining <= 0) {
      setError(`You can upload up to ${MAX_PHOTOS} photos per property.`);
      return;
    }

    const files = Array.from(fileList).slice(0, remaining);
    setIsReading(true);
    try {
      const added: string[] = [];
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          setError("Only image files (JPG, PNG, WEBP) are allowed.");
          continue;
        }
        if (file.size > MAX_IMAGE_BYTES) {
          setError("Each image must be smaller than 5 MB.");
          continue;
        }
        added.push(await readImageFile(file));
      }
      if (added.length > 0) onChange([...images, ...added]);
    } catch {
      setError("Could not read one of the selected images.");
    } finally {
      setIsReading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-faint">
          Property Photos ({images.length}/{MAX_PHOTOS})
        </span>
        <label className="inline-flex cursor-pointer items-center gap-2 border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface focus-within:ring-2 focus-within:ring-brand-blue">
          <ImagePlus aria-hidden="true" className="size-4" />
          <span>{isReading ? "Uploading..." : "Add Photos"}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={isReading || images.length >= MAX_PHOTOS}
            className="sr-only"
            onChange={(event) => {
              void handleFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={`${src.slice(0, 32)}-${index}`}
              className="group relative overflow-hidden border border-line bg-surface"
            >
              <div className="relative h-28 w-full">
                <Image
                  src={src}
                  alt={`Property photo ${index + 1}`}
                  fill
                  unoptimized={!src.startsWith("/")}
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-1 border-t border-line bg-white px-2 py-1.5">
                {index === 0 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-blue">
                    <Star aria-hidden="true" className="size-3 fill-current" />
                    Cover
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const next = [src, ...images.filter((_, i) => i !== index)];
                      onChange(next);
                    }}
                    className="cursor-pointer text-[11px] font-semibold text-body hover:text-ink"
                  >
                    Set cover
                  </button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Remove photo ${index + 1}`}
                  onClick={() => onChange(images.filter((_, i) => i !== index))}
                  className="cursor-pointer text-faint hover:text-rose-600"
                >
                  <Trash2 aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="border border-dashed border-line bg-surface/40 p-4 text-xs text-body">
          Upload clear photos of the exterior and rooms. The first photo is used
          as the listing cover.
        </p>
      )}

      {error && (
        <p role="alert" className="text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
