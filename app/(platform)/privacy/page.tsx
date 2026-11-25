import type { Metadata } from "next";
import {
  LegalDocumentLayout,
  type LegalSection,
} from "@/components/platform/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Privacy Policy (Provisional)",
  description:
    "Provisional privacy policy describing how Urugo handles user information during platform development.",
};

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "About Urugo",
    paragraphs: [
      "Urugo is a rental housing platform designed to help people find homes in Rwanda and help landlords list properties or manage rentals from move-in to move-out.",
    ],
  },
  {
    heading: "Information You Provide",
    paragraphs: [
      "When you create an account, list a property, request a viewing, send an inquiry, or manage a lease on Urugo, you may enter details such as your name, phone number, email address, property details, and rental records.",
      "During the current frontend preview stage, several interactions are stored locally in your browser so you can test workflows. Live backend storage, authentication, and notification services will be covered by the final reviewed policy before public launch.",
    ],
  },
  {
    heading: "How Information Is Intended to Be Used",
    paragraphs: [
      "Information entered on Urugo is intended to connect home seekers with landlords, schedule property viewings, keep lease and payment records organized, and support rental history reviews.",
      "Landlords using Urugo can choose whether to display their phone number, WhatsApp contact, or email address on public listings.",
    ],
  },
  {
    heading: "Sharing and Visibility",
    paragraphs: [
      "Public property details such as location, rent, photos, and amenities are visible to anyone browsing Urugo. Contact details and private rental records are intended only for the relevant landlord, renter, or authorized platform support staff once backend access controls are active.",
    ],
  },
  {
    heading: "Your Choices",
    paragraphs: [
      "You can browse public listings without creating an account. For preview data stored in your browser, you can clear your browser storage at any time. Once live accounts launch, you will be able to update or request deletion of your account information.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentLayout
      title="Privacy Policy"
      subtitle="A plain-language overview of how Urugo plans to collect and use information across our public site and rental dashboards."
      lastUpdated="November 2026"
      provisionalNote="Provisional notice: This Privacy Policy is a working draft for the current product preview and requires formal legal review before general public release."
      sections={PRIVACY_SECTIONS}
    />
  );
}
