import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RenterInvitationActivation } from "@/components/platform/auth/invitation/RenterInvitationActivation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.invitationActivation");
  return { title: t("metaTitle"), robots: { index: false, follow: false } };
}

export default function RenterInvitationActivationPage() {
  return <div className="flex w-full justify-center"><RenterInvitationActivation /></div>;
}
