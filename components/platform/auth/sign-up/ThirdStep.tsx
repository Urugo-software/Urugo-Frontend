import { ArrowLeft, Camera, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type ThirdStepProps = {
  photo: File | null;
  onPhotoChange: (photo: File | null) => void;
  onBack: () => void;
};

function ThirdStep({ photo, onPhotoChange, onBack }: ThirdStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  return (
    <>
      <Field>
        <FieldLabel htmlFor="photo">Photo <span className="font-normal text-faint">(optional)</span></FieldLabel>
        <div className="rounded-xl border border-dashed border-line bg-surface p-5 text-center">
          <Camera aria-hidden="true" className="mx-auto mb-3 size-7 text-faint" />
          <Input
            ref={inputRef}
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            aria-describedby={error ? "photo-description photo-error" : "photo-description"}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              if (file && !file.type.startsWith("image/")) {
                setError("Please choose an image file.");
                event.target.value = "";
                onPhotoChange(null);
                return;
              }
              setError("");
              onPhotoChange(file);
            }}
            className="h-auto border-0 p-0 text-sm file:mr-3 file:rounded-lg file:bg-brand file:px-3 file:text-white"
          />
          {photo && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-body">
              <span className="min-w-0 truncate">{photo.name}</span>
              <button
                type="button"
                aria-label="Remove photo"
                className="rounded p-1 hover:bg-line focus-visible:outline-2 focus-visible:outline-brand"
                onClick={() => {
                  onPhotoChange(null);
                  setError("");
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
          )}
        </div>
        <FieldDescription id="photo-description">Choose an image for your profile, or continue without one.</FieldDescription>
        {error && <p id="photo-error" role="alert" className="text-sm text-destructive">{error}</p>}
      </Field>
      <Field>
        <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
          <Button type="button" variant="outline" onClick={onBack} className="h-11 rounded-xl sm:w-32">
            <ArrowLeft aria-hidden="true" /> Back
          </Button>
          <Button type="submit" className="h-11 rounded-xl bg-brand text-white hover:bg-brand/80">
            Finish signup
          </Button>
        </div>
      </Field>
    </>
  );
}

export default ThirdStep;
