"use client";

import { AgreementArticle } from "@/types/agreement.types";
import { DocumentArticleItem } from "./DocumentArticleItem";

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
    <section className="mb-8 space-y-4 text-[12.5px]">
      <div className="border-b border-zinc-200 pb-2 my-12 mt-16">
        <h2 className="text-lg text-center  font-bold uppercase tracking-wider text-ink">
          {isKinyarwanda
            ? "Ingingo n'Amabwiriza y'Amasezerano"
            : "Terms and Conditions of Lease"}
        </h2>
        <p className="text-[12.5px] text-center text-body italic mt-1">
          {isKinyarwanda
            ? "NONEHO RERO, hashingiwe ku masezerano n'inshingano zivugwa muri iyi nyandiko, impande zombi zemeranyije ibi bikurikira:"
            : "NOW, THEREFORE, in consideration of the mutual covenants and premises herein contained, the parties agree as follows:"}
        </p>
      </div>

      <div className="space-y-8">
        {articles.map((art) => (
          <DocumentArticleItem
            key={art.id}
            article={art}
            variables={variables}
            isKinyarwanda={isKinyarwanda}
          />
        ))}
      </div>
    </section>
  );
}
