import { ArrowLeft, Camera, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

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
          setError("Please choose a single image file.");
          return;
        }
        const file = acceptedFiles[0];
        if (file) {
          setError("");
          onPhotoChange(file);
        }
      },
    });
  const descriptionId = error
    ? "photo-description photo-error"
    : "photo-description";

  return (
    <>
      <Field>
        <FieldLabel htmlFor="photo">
          Photo <span className="font-normal text-faint">(optional)</span>
        </FieldLabel>
        <div
          {...getRootProps({
            role: "button",
            "aria-label": "Choose a profile photo",
            "aria-describedby": descriptionId,
            className: cn(
              "cursor-pointer rounded-xl border border-dashed border-line bg-surface p-5 text-center transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              (isDragActive || photo) &&
                !isDragReject &&
                "border-brand-deep bg-brand-tint hover:border-brand-deep",
              isDragReject &&
                "border-destructive bg-destructive/5 hover:border-destructive",
            ),
          })}
        >
          <input
            {...getInputProps({
              id: "photo",
              name: "photo",
              "aria-describedby": descriptionId,
            })}
          />
          <Camera
            aria-hidden="true"
            className="mx-auto mb-3 size-7 text-faint"
          />
          <p className="text-sm text-body">
            {isDragReject
              ? "Please drop an image file"
              : isDragActive
                ? "Drop your photo here"
                : "Drag and drop a photo here, or browse files"}
          </p>
        </div>
        {photo && (
          <div
            className="flex items-center gap-2 text-sm text-body"
            role="status"
          >
            <span className="min-w-0 flex-1 truncate">
              Selected: {photo.name}
            </span>
            <button
              type="button"
              aria-label="Remove photo"
              className="rounded p-1 hover:bg-line focus-visible:outline-2 focus-visible:outline-brand"
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
          <p id="photo-error" role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </Field>
      <Field>
        <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-11 rounded-xl sm:w-32"
          >
            <ArrowLeft aria-hidden="true" /> Back
          </Button>
          <Button
            type="submit"
            className="h-11 rounded-xl bg-brand text-white hover:bg-brand/80"
          >
            Finish signup
          </Button>
        </div>
      </Field>
    </>
  );
}

export default ThirdStep;
