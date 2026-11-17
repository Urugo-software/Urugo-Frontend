"use client";

import { AgreementArticle } from "@/types/agreement.types";
import { renderInterpolatedArticle } from "@/utils/agreement-utils";

interface Props {
  article: AgreementArticle;
  variables: Record<string, string | number | undefined>;
  isKinyarwanda: boolean;
}

export function DocumentArticleItem({
  article,
  variables,
  isKinyarwanda,
}: Props) {
  const rendered = renderInterpolatedArticle(article, variables);

  return (
    <div className="break-inside-avoid text-[13px] leading-relaxed">
      <h3 className="font-bold text-ink text-[13px] uppercase tracking-wide mb-1">
        {isKinyarwanda ? "Ingingo ya " : "Article "}
        {article.number}. {rendered.title}
      </h3>
      <p className="text-ink text-justify leading-relaxed">
        {rendered.content}
      </p>
    </div>
  );
}
