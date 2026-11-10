"use client";

import {
  ArrowUp,
  ArrowDown,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { AgreementArticle } from "@/types/agreement.types";
import { CANONICAL_18_ARTICLES } from "@/data/agreement-templates";

interface Props {
  article: AgreementArticle;
  index: number;
  totalArticles: number;
  onUpdate: (id: string, updates: Partial<AgreementArticle>) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (id: string) => void;
  language: "en" | "rw";
}

export function ArticleEditorCard({
  article,
  index,
  totalArticles,
  onUpdate,
  onMoveUp,
  onMoveDown,
  onDelete,
  language,
}: Props) {
  const isFirst = index === 0;
  const isLast = index === totalArticles - 1;

  // Check if standard article was modified from default
  const standardDef = article.standardNumber
    ? CANONICAL_18_ARTICLES.find((d) => d.standardNumber === article.standardNumber)
    : null;

  const defaultContent = standardDef
    ? language === "rw"
      ? standardDef.contentRw
      : standardDef.contentEn
    : "";

  const isModifiedFromDefault =
    standardDef && article.content.trim() !== defaultContent.trim();

  const handleResetToStandardDefault = () => {
    if (!standardDef) return;
    onUpdate(article.id, {
      title: language === "rw" ? standardDef.titleRw : standardDef.titleEn,
      content: defaultContent,
    });
  };

  return (
    <div className="border border-line bg-white p-5 transition-shadow hover:shadow-xs">
      {/* Top Header of Card */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center bg-ink font-mono text-xs font-bold text-white">
            {article.number}
          </span>
          <span className="text-xs font-bold text-ink">
            Article {article.number}
          </span>

          {article.isStandard ? (
            <span className="border border-line bg-surface px-2 py-0.5 text-[10px] font-semibold text-faint">
              Standard Clause #{article.standardNumber}
            </span>
          ) : (
            <span className="border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-800">
              Custom Clause
            </span>
          )}

          {isModifiedFromDefault && (
            <button
              type="button"
              onClick={handleResetToStandardDefault}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 hover:text-ink cursor-pointer ml-1"
              title="Reset clause text to default Rwandan template"
            >
              <RotateCcw className="size-3" />
              <span>Reset text</span>
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onMoveUp(index)}
            className="p-1.5 text-faint hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed border border-line bg-white hover:bg-surface cursor-pointer"
            title="Move Article Up"
          >
            <ArrowUp className="size-3.5" />
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => onMoveDown(index)}
            className="p-1.5 text-faint hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed border border-line bg-white hover:bg-surface cursor-pointer"
            title="Move Article Down"
          >
            <ArrowDown className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(article.id)}
            className="p-1.5 text-rose-600 hover:text-rose-900 border border-line bg-white hover:bg-rose-50 cursor-pointer ml-1"
            title="Delete Article"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-faint mb-1">
            Article Title / Heading
          </label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => onUpdate(article.id, { title: e.target.value })}
            placeholder="e.g. Monthly Rent and Payment Terms"
            className="w-full border border-line bg-white px-3 py-2 text-xs font-semibold text-ink placeholder:text-faint focus:border-ink focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-faint">
              Article Content & Covenants
            </label>
            <span className="text-[10px] text-faint font-mono">
              {article.content.length} characters
            </span>
          </div>
          <textarea
            rows={4}
            value={article.content}
            onChange={(e) => onUpdate(article.id, { content: e.target.value })}
            placeholder="Enter the complete legal provisions for this clause..."
            className="w-full border border-line bg-white p-3 text-xs leading-relaxed text-ink placeholder:text-faint focus:border-ink focus:outline-none font-sans"
          />
        </div>
      </div>
    </div>
  );
}
