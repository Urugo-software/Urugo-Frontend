"use client";

import {
  ArrowUp,
  ArrowDown,
  Trash2,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { AgreementArticle } from "@/types/agreement.types";
import { CANONICAL_18_ARTICLES } from "@/data/agreement-templates";

interface Props {
  article: AgreementArticle;
  index: number;
  totalArticles: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
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
  isExpanded,
  onToggleExpand,
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
    ? CANONICAL_18_ARTICLES.find(
        (d) => d.standardNumber === article.standardNumber,
      )
    : null;

  const defaultContent = standardDef
    ? language === "rw"
      ? standardDef.contentRw
      : standardDef.contentEn
    : "";

  const isModifiedFromDefault =
    standardDef && article.content.trim() !== defaultContent.trim();

  const handleResetToStandardDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!standardDef) return;
    onUpdate(article.id, {
      title: language === "rw" ? standardDef.titleRw : standardDef.titleEn,
      content: defaultContent,
    });
  };

  return (
    <div className="border border-line bg-white transition-colors">
      {/* Collapsed Header / Accordion Trigger */}
      <div
        onClick={onToggleExpand}
        className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer select-none hover:bg-surface/50 transition-colors"
      >
        {/* Left: Number and Heading */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-[13px] font-semibold text-faint w-6 shrink-0">
            {article.number}.
          </span>

          <span className="text-[13px] sm:text-sm font-medium text-ink truncate">
            {article.title || `Article ${article.number}`}
          </span>

          {/* Subtle Custom Indicator */}
          {article.isCustom && (
            <span className="text-[12.5px] text-faint lowercase font-normal shrink-0">
              (custom)
            </span>
          )}

          {/* Subtle Modified Indicator */}
          {isModifiedFromDefault && (
            <span className="text-[12.5px] text-amber-700 font-normal shrink-0">
              (edited)
            </span>
          )}
        </div>

        {/* Right: Controls & Chevron */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Reordering Controls */}
          <button
            type="button"
            disabled={isFirst}
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp(index);
            }}
            className="p-1.5 text-faint hover:text-ink disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
            title="Move up"
          >
            <ArrowUp className="size-3.5" />
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown(index);
            }}
            className="p-1.5 text-faint hover:text-ink disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
            title="Move down"
          >
            <ArrowDown className="size-3.5" />
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(article.id);
            }}
            className="p-1.5 text-faint hover:text-red-600 cursor-pointer ml-0.5"
            title="Delete article"
          >
            <Trash2 className="size-3.5" />
          </button>

          {/* Expand / Collapse Chevron */}
          <div className="p-1 text-faint ml-1">
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180 text-ink" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* Expanded Editor Body */}
      {isExpanded && (
        <div className="border-t border-line p-4 sm:p-5 bg-surface/10 space-y-4">
          {/* Editable Title */}
          <div>
            <label className="block text-[12.5px] font-medium text-faint mb-1.5">
              Heading
            </label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => onUpdate(article.id, { title: e.target.value })}
              placeholder="Article heading..."
              className="w-full border border-line bg-white px-3 py-2 text-[13px] sm:text-sm font-medium text-ink placeholder:text-faint focus:border-ink focus:outline-none"
            />
          </div>

          {/* Editable Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[12.5px] font-medium text-faint">
                Content
              </label>
              {isModifiedFromDefault && (
                <button
                  type="button"
                  onClick={handleResetToStandardDefault}
                  className="inline-flex items-center gap-1 text-[12.5px] text-faint hover:text-ink cursor-pointer"
                  title="Reset to canonical Rwandan standard text"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset to standard wording</span>
                </button>
              )}
            </div>
            <textarea
              rows={6}
              value={article.content}
              onChange={(e) =>
                onUpdate(article.id, { content: e.target.value })
              }
              placeholder="Enter agreement terms for this clause..."
              className="w-full border border-line bg-white p-3 text-[13px] sm:text-sm leading-relaxed text-ink placeholder:text-faint focus:border-ink focus:outline-none font-sans"
            />
          </div>
        </div>
      )}
    </div>
  );
}
