import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  LegalDocumentLayout,
  type LegalSection,
} from "@/components/platform/legal/LegalDocumentLayout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("public.legal.privacy.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("public.legal.privacy");

  const sections: LegalSection[] = [
    {
      heading: t("sections.about.heading"),
      paragraphs: [t("sections.about.p1")],
    },
    {
      heading: t("sections.info.heading"),
      paragraphs: [t("sections.info.p1"), t("sections.info.p2")],
    },
    {
      heading: t("sections.use.heading"),
      paragraphs: [t("sections.use.p1"), t("sections.use.p2")],
    },
    {
      heading: t("sections.sharing.heading"),
      paragraphs: [t("sections.sharing.p1")],
    },
    {
      heading: t("sections.choices.heading"),
      paragraphs: [t("sections.choices.p1")],
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
