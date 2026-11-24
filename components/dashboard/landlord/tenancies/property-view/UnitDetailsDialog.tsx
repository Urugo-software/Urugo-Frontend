"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ImagePlus, Star, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { PropertyUnit } from "@/types/landlord";
import { readImageFile } from "@/utils/image-file";

interface UnitDetailsDialogProps {
  propertyId: string;
  unit?: PropertyUnit;
  onClose: () => void;
}

export function UnitDetailsDialog({
  propertyId,
  unit,
  onClose,
}: UnitDetailsDialogProps) {
  const { addUnit, updateUnit } = useLandlordProperties();
  const isEditing = Boolean(unit);

  const [unitNumber, setUnitNumber] = useState(unit?.unitNumber ?? "");
  const [floor, setFloor] = useState(unit?.floor ?? "");
  const [bedrooms, setBedrooms] = useState(unit?.bedrooms?.toString() ?? "1");
  const [bathrooms, setBathrooms] = useState(unit?.bathrooms?.toString() ?? "1");
  const [monthlyRent, setMonthlyRent] = useState(unit?.monthlyRentRwf?.toString() ?? "");
  const [images, setImages] = useState<string[]>(unit?.images ?? []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);

  const activePhoto = images[activeIndex] ?? images[0];

  async function handleFileUpload(files: FileList | null) {
    if (!files?.length) return;
    setIsReading(true);
    setError(null);
    try {
      const uploaded = await Promise.all(Array.from(files).map(readImageFile));
      setImages((prev) => {
        const next = [...prev, ...uploaded];
        if (prev.length === 0) setActiveIndex(0);
        return next;
      });
    } catch {
      setError("One or more photos could not be read. Please try again.");
    } finally {
      setIsReading(false);
    }
  }

  function removePhoto(index: number) {
    setImages((prev) => {
      const next = prev.filter((_, idx) => idx !== index);
      setActiveIndex((curr) => Math.max(0, Math.min(curr, next.length - 1)));
      return next;
    });
  }

  function makeCover(index: number) {
    setImages((prev) => {
      const selected = prev[index];
      if (!selected) return prev;
      return [selected, ...prev.filter((_, idx) => idx !== index)];
    });
    setActiveIndex(0);
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    const trimmedUnit = unitNumber.trim();
    const parsedRent = Number(monthlyRent);
    if (!trimmedUnit) {
      setError("Enter a unit number (e.g., A-01 or Studio B).");
      return;
    }
    if (!monthlyRent || !Number.isFinite(parsedRent) || parsedRent < 0) {
      setError("Enter a valid monthly rent amount.");
      return;
    }

    const payload = {
      unitNumber: trimmedUnit,
      floor: floor.trim() || undefined,
      bedrooms: bedrooms ? Math.max(0, Number(bedrooms)) : undefined,
      bathrooms: bathrooms ? Math.max(0, Number(bathrooms)) : undefined,
      monthlyRentRwf: Math.round(parsedRent),
      images,
    };

    if (unit) {
      updateUnit(unit.id, payload);
    } else {
      addUnit({
        ...payload,
        propertyId,
        status: "Vacant",
        renterId: null,
      });
    }
    onClose();
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/45" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-none border border-line bg-white p-5 shadow-lg sm:p-6">
          <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
            <div>
              <Dialog.Title className="text-lg font-bold text-ink">
                {isEditing ? `Unit ${unit?.unitNumber} — Photos & Details` : "Add New Unit"}
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-body">
                Manage photos and residential lease specs for this unit.
              </Dialog.Description>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close dialog"
              className="cursor-pointer rounded-none"
            >
              <X className="size-4" />
            </Button>
          </div>

          <form onSubmit={handleSave} className="mt-5 space-y-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
                  Unit Photos ({images.length})
                </span>
                <label className="inline-flex cursor-pointer items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink hover:bg-surface">
                  <ImagePlus aria-hidden="true" className="size-4 text-brand" />
                  <span>{isReading ? "Loading..." : "Upload Photos"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={isReading}
                    className="sr-only"
                    onChange={(event) => {
                      void handleFileUpload(event.target.files);
                      event.target.value = "";
                    }}
                  />
                </label>
              </div>

              {activePhoto ? (
                <div className="space-y-2.5">
                  <div className="relative h-56 w-full overflow-hidden border border-line bg-surface">
                    <Image
                      src={activePhoto}
                      alt={`Unit ${unitNumber || "preview"} photo ${activeIndex + 1}`}
                      fill
                      unoptimized={!activePhoto.startsWith("/")}
                      className="object-cover"
                    />
                    <div className="absolute right-2 top-2 flex items-center gap-1.5">
                      {activeIndex > 0 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => makeCover(activeIndex)}
                          className="cursor-pointer rounded-none border border-line bg-white/95 text-[12.5px] text-ink"
                        >
                          <Star className="size-3.5" />
                          Set Cover
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="destructive"
                        onClick={() => removePhoto(activeIndex)}
                        aria-label="Remove current photo"
                        className="cursor-pointer rounded-none bg-white/95 text-rose-700 hover:bg-rose-50"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                    {activeIndex === 0 && (
                      <span className="absolute left-2 top-2 border border-line bg-white/95 px-2 py-0.5 text-[12.5px] font-semibold text-ink">
                        Cover Photo
                      </span>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {images.map((src, idx) => (
                        <button
                          key={`${src.slice(0, 32)}-${idx}`}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden border ${
                            idx === activeIndex ? "border-brand ring-1 ring-brand" : "border-line"
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            unoptimized={!src.startsWith("/")}
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-dashed border-line bg-surface/50 px-4 py-8 text-center text-sm text-body">
                  No photos uploaded for this unit yet. Upload photos to showcase this door.
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="unit-number" className="text-sm">
                  Unit / Door Number
                </FieldLabel>
                <Input
                  id="unit-number"
                  placeholder="e.g., A-07 or Studio C"
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  className="h-10 rounded-none text-sm"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="unit-floor" className="text-sm">
                  Floor (optional)
                </FieldLabel>
                <Input
                  id="unit-floor"
                  placeholder="e.g., 1st Floor"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="h-10 rounded-none text-sm"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="unit-bedrooms" className="text-sm">
                  Bedrooms
                </FieldLabel>
                <Input
                  id="unit-bedrooms"
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="h-10 rounded-none text-sm"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="unit-bathrooms" className="text-sm">
                  Bathrooms
                </FieldLabel>
                <Input
                  id="unit-bathrooms"
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="h-10 rounded-none text-sm"
                />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="unit-rent" className="text-sm">
                  Monthly Rent (RWF)
                </FieldLabel>
                <Input
                  id="unit-rent"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="150000"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="h-10 rounded-none text-sm"
                />
              </Field>
            </div>

            {error && <FieldError>{error}</FieldError>}

            <div className="flex justify-end gap-2 border-t border-line pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="cursor-pointer rounded-none"
              >
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer rounded-none">
                {isEditing ? "Save Changes" : "Add Unit"}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
