import type { Metadata } from "next";
import {
  LegalDocumentLayout,
  type LegalSection,
} from "@/components/platform/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Terms of Service (Provisional)",
  description:
    "Provisional terms of service for home seekers, landlords, and renters using the Urugo platform.",
};

const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Scope of Urugo",
    paragraphs: [
      "Urugo provides tools for searching rental properties, connecting home seekers with landlords, and helping landlords either advertise listings (Listing-Only mode) or manage leases, rent payment records, and tenancies (Full Rental Management).",
      "Urugo is a software platform and is not a party to rental contracts between landlords and renters.",
    ],
  },
  {
    heading: "Landlord Responsibilities",
    paragraphs: [
      "Landlords who list properties on Urugo are responsible for providing accurate descriptions, photos, pricing, and availability status.",
      "Listing-Only landlords manage their own viewing schedules, agreements, and rent collection independently. Managed landlords remain responsible for verifying payments and following applicable local rental laws.",
    ],
  },
  {
    heading: "Home Seeker and Renter Responsibilities",
    paragraphs: [
      "Home seekers should inspect properties in person and confirm lease terms directly with the landlord before paying any deposit or rent.",
      "Renters using Urugo's rental management tools are responsible for submitting accurate payment references and communicating repair requests or balance disputes in good faith.",
    ],
  },
  {
    heading: "Rental History and Disputes",
    paragraphs: [
      "Any rental balance notice logged on Urugo is intended to give renters a clear notice window to settle or dispute the record with supporting proof before it is confirmed.",
    ],
  },
  {
    heading: "Preview Status and Changes",
    paragraphs: [
      "Parts of Urugo's frontend currently run in preview mode using sample data while backend services are being connected. Features and these provisional terms may change prior to full public launch.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocumentLayout
      title="Terms of Service"
      subtitle="Clear, straightforward expectations for home seekers, landlords, and renters using Urugo."
      lastUpdated="November 2026"
      provisionalNote="Provisional notice: These Terms of Service are a working draft for the current product preview and require formal legal review before general public release."
      sections={TERMS_SECTIONS}
    />
  );
}
