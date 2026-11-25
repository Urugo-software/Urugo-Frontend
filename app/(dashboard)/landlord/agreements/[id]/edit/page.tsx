import { getTranslations } from "next-intl/server";
import { mockAgreements } from "@/data/mock-agreements";
import { AgreementEditView } from "@/components/dashboard/landlord/agreements/AgreementEditView";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const t = await getTranslations("landlord.pages.agreements");
  const agreement = mockAgreements.find((a) => a.id === id);

  return {
    title: agreement
      ? t("editTitle", { referenceNumber: agreement.referenceNumber })
      : t("editFallbackTitle"),
  };
}

export default async function AgreementEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <AgreementEditView agreementId={id} />
    </main>
  );
}
