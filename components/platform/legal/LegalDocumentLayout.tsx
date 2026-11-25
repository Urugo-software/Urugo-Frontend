import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AlertCircle, ArrowLeft } from "lucide-react";

import SectionContainer from "@/components/platform/home/SectionContainer";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalDocumentLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  provisionalNote: string;
  sections: LegalSection[];
}

export async function LegalDocumentLayout({
  title,
  subtitle,
  lastUpdated,
  provisionalNote,
  sections,
}: LegalDocumentLayoutProps) {
  const t = await getTranslations("public.legal");

  return (
    <main className="min-h-screen w-full bg-white py-10 sm:py-16">
      <SectionContainer className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-deep hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{t("backToHome")}</span>
        </Link>

        <header className="border-b border-line pb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand">
            {t("provisionalBadge")}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-body sm:text-base">
            {subtitle}
          </p>
          <p className="mt-3 text-xs text-faint">
            {t("lastUpdated", { date: lastUpdated })}
          </p>
        </header>

        <div
          role="note"
          className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-amber-700"
          />
          <p className="leading-relaxed">{provisionalNote}</p>
        </div>

        <div className="mt-8 space-y-8">
          {sections.map((section, index) => (
            <section key={section.heading} className="space-y-2.5">
              <h2 className="text-lg font-bold tracking-tight text-ink">
                {index + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((text, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm leading-relaxed text-body sm:text-[15px]"
                >
                  {text}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6 text-sm text-body">
          {t("questionsPrompt")}{" "}
          <a
            href="mailto:info@urugo.rw"
            className="font-semibold text-brand hover:underline"
          >
            info@urugo.rw
          </a>
          .
        </div>
      </SectionContainer>
    </main>
  );
}
