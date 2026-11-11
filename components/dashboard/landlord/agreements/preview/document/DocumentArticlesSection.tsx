"use client";

import { AgreementArticle } from "@/types/agreement.types";
import { renderInterpolatedArticle } from "@/utils/agreement-utils";

interface Props {
  articles: AgreementArticle[];
  variables: Record<string, string | number | undefined>;
  isKinyarwanda: boolean;
}

export function DocumentArticlesSection({
  articles,
  variables,
  isKinyarwanda,
}: Props) {
  return (
    <section className="mb-10 space-y-6 text-[12.5px]">
      <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink border-b border-line pb-1.5 flex items-center justify-between">
        <span>
          {isKinyarwanda
            ? "3. Ingingo n'Amabwiriza y'Amasezerano"
            : "3. General Covenants & Articles of Agreement"}
        </span>
        <span className="text-[12.5px] text-faint font-mono">
          {articles.length} {isKinyarwanda ? "Ingingo" : "Articles"}
        </span>
      </h3>

      <div className="space-y-6">
        {articles.map((art) => {
          const rendered = renderInterpolatedArticle(art, variables);

          return (
            <div key={art.id} className="text-[13px] leading-relaxed break-inside-avoid">
              <h4 className="font-bold text-ink text-[14px] mb-1.5">
                {isKinyarwanda ? "Ingingo ya" : "Article"} {art.number}:{" "}
                {rendered.title}
              </h4>
              <p className="text-body text-[13.5px] leading-relaxed text-justify">
                {rendered.content}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
