import { ArrowLeft, Camera, FileImage, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { formatPhotoFileSize } from "@/utils/auth-helpers";

import {
  AUTH_LABEL_CLASS,
  AUTH_PRIMARY_BUTTON_CLASS,
  AUTH_SECONDARY_BUTTON_CLASS,
} from "../auth-styles";

type ThirdStepProps = {
  photo: File | null;
  onPhotoChange: (photo: File | null) => void;
  onBack: () => void;
};

function ThirdStep({ photo, onPhotoChange, onBack }: ThirdStepProps) {
  const [error, setError] = useState("");
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      onDrop: (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
          setError("Please choose a single image file (JPG, PNG, or WebP).");
          return;
        }
        const file = acceptedFiles[0];
        if (file) {
          setError("");
          onPhotoChange(file);
        }
      },
    });

  const describedBy = error
    ? "photo-description photo-error"
    : "photo-description";

  return (
    <>
      <Field data-invalid={Boolean(error) || undefined}>
        <FieldLabel htmlFor="photo" className={AUTH_LABEL_CLASS}>
          Profile photo{" "}
          <span className="font-normal text-faint">(optional)</span>
        </FieldLabel>
        <div
          {...getRootProps({
            role: "button",
            "aria-label": "Choose a profile photo",
            "aria-describedby": describedBy,
            className: cn(
              "cursor-pointer rounded-xl border border-dashed border-line bg-surface/60 px-5 py-6 text-center transition-colors hover:border-brand/50 hover:bg-brand-tint/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
              (isDragActive || photo) &&
                !isDragReject &&
                "border-brand bg-brand-tint/40 hover:border-brand",
              isDragReject &&
                "border-destructive bg-destructive/5 hover:border-destructive",
            ),
          })}
        >
          <input
            {...getInputProps({
              id: "photo",
              name: "photo",
              "aria-describedby": describedBy,
            })}
          />
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-white text-brand shadow-2xs ring-1 ring-line">
            <Camera aria-hidden="true" className="size-5" />
          </div>
          <p className="text-sm font-medium text-ink">
            {isDragReject
              ? "Unsupported file type"
              : isDragActive
                ? "Drop your photo here"
                : "Upload a profile photo"}
          </p>
          <p className="mt-1 text-xs text-body">
            {isDragReject
              ? "Please drop an image file (JPG, PNG, or WebP)."
              : "Drag and drop here, or click to browse files"}
          </p>
        </div>

        <FieldDescription id="photo-description" className="text-xs text-faint">
          JPG, PNG, or WebP. You can skip this step and add a photo later.
        </FieldDescription>

        {photo && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-xl border border-line bg-surface/60 px-3.5 py-2.5 text-sm text-ink"
          >
            <FileImage
              aria-hidden="true"
              className="size-4 shrink-0 text-brand"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-ink">
                {photo.name}
              </p>
              <p className="text-[11px] text-faint">
                {formatPhotoFileSize(photo.size)}
              </p>
            </div>
            <button
              type="button"
              aria-label="Remove selected photo"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-faint transition-colors hover:bg-line/60 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              onClick={() => {
                onPhotoChange(null);
                setError("");
              }}
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}

        {error && (
          <FieldError id="photo-error" className="text-xs font-medium">
            {error}
          </FieldError>
        )}
      </Field>

      <Field className="pt-1">
        <div className="flex flex-col-reverse gap-2.5 sm:grid sm:grid-cols-[auto_1fr] sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className={`${AUTH_SECONDARY_BUTTON_CLASS} sm:w-28`}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span>Back</span>
          </Button>
          <Button type="submit" className={AUTH_PRIMARY_BUTTON_CLASS}>
            Create account
          </Button>
        </div>
      </Field>
    </>
  );
}

export default ThirdStep;
