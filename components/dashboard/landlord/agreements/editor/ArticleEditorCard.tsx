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

  const standardDef = article.standardNumber
    ? CANONICAL_18_ARTICLES.find(
        (d) => d.standardNumber === article.standardNumber,
      )
    : null;

  const defaultTitle = standardDef
    ? language === "rw"
      ? standardDef.titleRw
      : standardDef.titleEn
    : "";

  const defaultContent = standardDef
    ? language === "rw"
      ? standardDef.contentRw
      : standardDef.contentEn
    : "";

  const isModifiedFromDefault = Boolean(
    standardDef &&
      (article.title.trim() !== defaultTitle.trim() ||
        article.content.trim() !== defaultContent.trim()),
  );

  const handleResetToStandardDefault = () => {
    if (!standardDef) return;
    onUpdate(article.id, {
      title: defaultTitle,
      content: defaultContent,
    });
  };

  return (
    <div className="border border-line bg-white transition-colors">
      <div className="flex items-center justify-between gap-2 px-4 py-2 transition-colors hover:bg-surface/50">
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={onToggleExpand}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 py-1.5 text-left"
        >
          <span className="w-6 shrink-0 font-mono text-[13px] font-semibold text-faint">
            {article.number}.
          </span>

          <span className="truncate text-[13px] font-medium text-ink sm:text-sm">
            {article.title || `Article ${article.number}`}
          </span>

          {article.isCustom && (
            <span className="shrink-0 text-[12.5px] font-normal lowercase text-faint">
              (custom)
            </span>
          )}

          {isModifiedFromDefault && (
            <span className="shrink-0 text-[12.5px] font-normal text-amber-700">
              (edited)
            </span>
          )}
        </button>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onMoveUp(index)}
            aria-label={`Move article ${article.number} up`}
            className="cursor-pointer p-1.5 text-faint hover:text-ink disabled:cursor-not-allowed disabled:opacity-20"
            title="Move up"
          >
            <ArrowUp className="size-3.5" />
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => onMoveDown(index)}
            aria-label={`Move article ${article.number} down`}
            className="cursor-pointer p-1.5 text-faint hover:text-ink disabled:cursor-not-allowed disabled:opacity-20"
            title="Move down"
          >
            <ArrowDown className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(article.id)}
            aria-label={`Delete article ${article.number}`}
            className="ml-0.5 cursor-pointer p-1.5 text-faint hover:text-red-600"
            title="Delete article"
          >
            <Trash2 className="size-3.5" />
          </button>
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-label={
              isExpanded
                ? `Collapse article ${article.number}`
                : `Expand article ${article.number}`
            }
            onClick={onToggleExpand}
            className="ml-1 cursor-pointer p-1 text-faint hover:text-ink"
          >
            <ChevronDown
              className={`size-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180 text-ink" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 border-t border-line bg-surface/10 p-4 sm:p-5">
          <div>
            <label
              htmlFor={`article-title-${article.id}`}
              className="mb-1.5 block text-[12.5px] font-medium text-faint"
            >
              Heading
            </label>
            <input
              id={`article-title-${article.id}`}
              type="text"
              value={article.title}
              onChange={(e) => onUpdate(article.id, { title: e.target.value })}
              placeholder="Article heading..."
              className="w-full border border-line bg-white px-3 py-2 text-[13px] font-medium text-ink placeholder:text-faint focus:border-ink focus:outline-none sm:text-sm"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                htmlFor={`article-content-${article.id}`}
                className="block text-[12.5px] font-medium text-faint"
              >
                Content
              </label>
              {isModifiedFromDefault && (
                <button
                  type="button"
                  onClick={handleResetToStandardDefault}
                  className="inline-flex cursor-pointer items-center gap-1 text-[12.5px] text-faint hover:text-ink"
                  title="Reset to canonical Rwandan standard text"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset to standard wording</span>
                </button>
              )}
            </div>
            <textarea
              id={`article-content-${article.id}`}
              rows={6}
              value={article.content}
              onChange={(e) =>
                onUpdate(article.id, { content: e.target.value })
              }
              placeholder="Enter agreement terms for this clause..."
              className="w-full border border-line bg-white p-3 font-sans text-[13px] leading-relaxed text-ink placeholder:text-faint focus:border-ink focus:outline-none sm:text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
