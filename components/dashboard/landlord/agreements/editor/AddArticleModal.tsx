"use client";

import { useState } from "react";
import { X, Plus, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  totalArticles: number;
  onClose: () => void;
  onAdd: (title: string, content: string, insertIndex: number) => void;
}

export function AddArticleModal({
  isOpen,
  totalArticles,
  onClose,
  onAdd,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [insertPosition, setInsertPosition] = useState<number>(totalArticles);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAdd(title.trim(), content.trim(), insertPosition);
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg border border-line bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 bg-surface/50">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center bg-ink text-white">
              <FilePlus className="size-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Add Custom Article</h3>
              <p className="text-[11px] text-faint">
                Insert an additional clause into the lease agreement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-faint hover:text-ink cursor-pointer p-1"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Article Title / Heading
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Parking Rights and Vehicle Registration"
              className="w-full border border-line bg-white p-2.5 text-xs font-semibold text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Position in Document
            </label>
            <select
              value={insertPosition}
              onChange={(e) => setInsertPosition(Number(e.target.value))}
              className="w-full border border-line bg-white p-2 text-xs text-ink focus:border-ink focus:outline-none"
            >
              <option value={totalArticles}>At the end (Article {totalArticles + 1})</option>
              <option value={0}>At the beginning (Article 1)</option>
              {Array.from({ length: totalArticles }, (_, i) => (
                <option key={i} value={i + 1}>
                  After Article {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Article Content & Terms
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide the complete legal provisions for this custom clause..."
              className="w-full border border-line bg-white p-3 text-xs leading-relaxed text-ink focus:border-ink focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-line">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-none border-line text-xs font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-none bg-ink text-white hover:bg-black text-xs font-semibold"
            >
              Add Article
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
