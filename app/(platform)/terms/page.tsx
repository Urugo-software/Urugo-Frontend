import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  LegalDocumentLayout,
  type LegalSection,
} from "@/components/platform/legal/LegalDocumentLayout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("public.legal.terms.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TermsOfServicePage() {
  const t = await getTranslations("public.legal.terms");

  const sections: LegalSection[] = [
    {
      heading: t("sections.scope.heading"),
      paragraphs: [t("sections.scope.p1"), t("sections.scope.p2")],
    },
    {
      heading: t("sections.landlord.heading"),
      paragraphs: [t("sections.landlord.p1"), t("sections.landlord.p2")],
    },
    {
      heading: t("sections.renter.heading"),
      paragraphs: [t("sections.renter.p1"), t("sections.renter.p2")],
    },
    {
      heading: t("sections.history.heading"),
      paragraphs: [t("sections.history.p1")],
    },
    {
      heading: t("sections.preview.heading"),
      paragraphs: [t("sections.preview.p1")],
    },
  ];

  return (
    <LegalDocumentLayout
      title={t("title")}
      subtitle={t("subtitle")}
      lastUpdated={t("lastUpdatedDate")}
      provisionalNote={t("provisionalNote")}
      sections={sections}
    />
  );
}
