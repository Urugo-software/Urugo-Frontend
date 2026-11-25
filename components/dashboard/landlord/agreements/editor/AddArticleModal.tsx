"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";

interface Props {
  isOpen: boolean;
  totalArticles: number;
  onClose: () => void;
  onAdd: (title: string, content: string, insertIndex: number) => void;
}

interface AddArticleFormValues {
  title: string;
  content: string;
  insertPosition: number;
}

export function AddArticleModal({
  isOpen,
  totalArticles,
  onClose,
  onAdd,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddArticleFormValues>({
    defaultValues: {
      title: "",
      content: "",
      insertPosition: totalArticles,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ title: "", content: "", insertPosition: totalArticles });
    }
  }, [isOpen, totalArticles, reset]);

  function onSubmit(values: AddArticleFormValues) {
    onAdd(
      values.title.trim(),
      values.content.trim(),
      Number(values.insertPosition),
    );
    reset({ title: "", content: "", insertPosition: totalArticles + 1 });
    onClose();
  }

  return (
    <ModalDialog
      open={isOpen}
      onClose={onClose}
      title="Add Custom Article"
      description="Insert an additional clause into the lease agreement."
      maxWidthClassName="max-w-lg"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 text-[12.5px]"
      >
        <div>
          <label
            htmlFor="custom-article-title"
            className="mb-1.5 block text-[12.5px] font-semibold text-ink"
          >
            Article Title / Heading
          </label>
          <input
            id="custom-article-title"
            type="text"
            {...register("title", {
              required: "Please enter a clause heading.",
              validate: (v) =>
                v.trim().length > 0 || "Please enter a clause heading.",
            })}
            placeholder="e.g. Parking Rights and Vehicle Registration"
            className="h-10 w-full border border-line bg-white px-3 text-[13px] font-medium text-ink focus:border-ink focus:outline-none sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="custom-article-position"
            className="mb-1.5 block text-[12.5px] font-semibold text-ink"
          >
            Position in Document
          </label>
          <select
            id="custom-article-position"
            {...register("insertPosition", { valueAsNumber: true })}
            className="h-10 w-full border border-line bg-white px-3 text-[13px] text-ink focus:border-ink focus:outline-none sm:text-sm"
          >
            <option value={totalArticles}>
              At the end (Article {totalArticles + 1})
            </option>
            {totalArticles > 0 && (
              <option value={0}>At the beginning (Article 1)</option>
            )}
            {Array.from(
              { length: Math.max(0, totalArticles - 1) },
              (_, i) => (
                <option key={i} value={i + 1}>
                  After Article {i + 1}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="custom-article-content"
            className="mb-1.5 block text-[12.5px] font-semibold text-ink"
          >
            Article Content &amp; Terms
          </label>
          <textarea
            id="custom-article-content"
            rows={5}
            {...register("content", {
              required: "Please enter the clause wording.",
              validate: (v) =>
                v.trim().length > 0 || "Please enter the clause wording.",
            })}
            placeholder="Provide the complete legal provisions for this custom clause..."
            className="w-full border border-line bg-white p-3 font-sans text-[13px] leading-relaxed text-ink focus:border-ink focus:outline-none sm:text-sm"
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-line pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 cursor-pointer rounded-none border-line px-4 text-[12.5px] font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-9 cursor-pointer rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black"
          >
            Add Article
          </Button>
        </div>
      </form>
    </ModalDialog>
  );
}
