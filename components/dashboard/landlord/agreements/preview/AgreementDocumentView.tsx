"use client";

import { useMemo } from "react";
import {
  Agreement,
  AgreementLanguage,
} from "../types/agreement.types";
import {
  formatCurrencyRwf,
  formatDate,
  getAgreementVariables,
  renderInterpolatedArticle,
} from "../utils/agreement-utils";
import { CheckCircle2, ShieldCheck, Printer } from "lucide-react";

interface Props {
  agreement: Agreement;
  displayLanguage: AgreementLanguage;
  onLanguageChange?: (lang: AgreementLanguage) => void;
}

export function AgreementDocumentView({
  agreement,
  displayLanguage,
  onLanguageChange,
}: Props) {
  const isKinyarwanda = displayLanguage === "rw";

  const variables = useMemo(
    () => getAgreementVariables(agreement),
    [agreement]
  );

  return (
    <div className="space-y-4">
      {/* Minimal Document Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-white px-4 py-2.5 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Document Language:
          </span>
          <div className="inline-flex items-center border border-line bg-surface p-0.5">
            <button
              type="button"
              onClick={() => onLanguageChange && onLanguageChange("en")}
              className={`px-3 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                displayLanguage === "en"
                  ? "bg-white text-ink shadow-xs"
                  : "text-faint hover:text-ink"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange && onLanguageChange("rw")}
              className={`px-3 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                displayLanguage === "rw"
                  ? "bg-white text-ink shadow-xs"
                  : "text-faint hover:text-ink"
              }`}
            >
              Kinyarwanda
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-body">
          <span className="font-mono text-faint">
            {agreement.articles.length} {isKinyarwanda ? "Ingingo" : "Articles"}
          </span>
          <span>&middot;</span>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:underline cursor-pointer"
          >
            <Printer className="size-3.5 text-faint" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Realistic A4 Document Canvas */}
      <div className="border border-line bg-surface/50 p-3 sm:p-8 lg:p-10 print:border-none print:p-0 print:bg-transparent">
        <article className="relative mx-auto max-w-[820px] border border-line/90 bg-white p-6 sm:p-12 md:p-16 shadow-xs text-ink font-sans print:m-0 print:max-w-none print:border-none print:p-0 print:shadow-none">
          {/* Header Bar */}
          <div className="border-b-2 border-ink pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-ink text-white px-2 py-0.5">
                  URUGO OFFICIAL CONTRACT
                </span>
                <span className="font-mono text-xs text-faint">
                  v{agreement.version}.0
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading uppercase">
                {isKinyarwanda
                  ? "Amasezerano yo Gukodesha Inzu yo Guturamo"
                  : "Residential Tenancy Lease Agreement"}
              </h2>
              <p className="text-xs text-faint mt-1">
                {isKinyarwanda
                  ? "Yateguwe hakurikijwe amategeko n'amabwiriza agenga ubutaka n'ubukode mu Rwanda"
                  : "Executed under the statutory tenancy regulations of the Republic of Rwanda"}
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs">
              <p className="font-bold text-ink">REF: {agreement.referenceNumber}</p>
              <p className="text-faint mt-0.5">
                {isKinyarwanda ? "Itariki: " : "Date: "}
                {formatDate(agreement.updatedAt)}
              </p>
            </div>
          </div>

          {/* Recitals / Preamble */}
          <div className="mb-8 text-xs leading-relaxed text-body bg-surface/40 border border-line p-4">
            <p>
              {isKinyarwanda
                ? "Aya masezerano asinywe hagati y'impande zombi zivugwa muri iyi nyandiko. Nyir'inzu yemeranyije n'Umukode gukodesha inzu yo guturamo ifite ibiranga byavuzwe hano munsi, hashingiwe ku ngingo zikurikira n'amabwiriza yose akubiyemo."
                : "This Residential Lease Agreement is entered into by and between the Landlord and Renter identified below. The Landlord hereby lets to the Renter, and the Renter leases from the Landlord, the described residential premises subject to the terms and covenants stipulated herein."}
            </p>
          </div>

          {/* SECTION 1: PARTIES IDENTIFICATION */}
          <section className="mb-8 space-y-3 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink border-b border-line pb-1.5 flex items-center justify-between">
              <span>
                {isKinyarwanda ? "1. Ibiranga Impande Zombi" : "1. The Contracting Parties"}
              </span>
              <span className="text-[10px] text-faint font-normal font-mono">
                {isKinyarwanda ? "nyir'inzu n'umukode" : "landlord & renter"}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Landlord Box */}
              <div className="border border-line p-4 bg-surface/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-faint block mb-2">
                  {isKinyarwanda ? "Nyir'inzu (Landlord)" : "Landlord (Lessor)"}
                </span>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-ink text-sm">{agreement.landlord.name}</p>
                  <p className="text-faint font-mono">
                    {isKinyarwanda ? "Indangamuntu: " : "National ID: "}
                    <span className="text-ink">{agreement.landlord.nationalId}</span>
                  </p>
                  <p className="text-faint font-mono">
                    {isKinyarwanda ? "Telefoni: " : "Phone: "}
                    <span className="text-ink">{agreement.landlord.phone}</span>
                  </p>
                  {agreement.landlord.email && (
                    <p className="text-faint">
                      Email: <span className="text-ink">{agreement.landlord.email}</span>
                    </p>
                  )}
                  {agreement.landlord.address && (
                    <p className="text-faint">
                      {isKinyarwanda ? "Aderesi: " : "Address: "}
                      <span className="text-ink">{agreement.landlord.address}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Renter Box */}
              <div className="border border-line p-4 bg-surface/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-faint block mb-2">
                  {isKinyarwanda ? "Umukode (Renter / Tenant)" : "Renter (Lessee)"}
                </span>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-ink text-sm">{agreement.renter.name}</p>
                  <p className="text-faint font-mono">
                    {isKinyarwanda ? "Indangamuntu: " : "National ID: "}
                    <span className="text-ink">{agreement.renter.nationalId}</span>
                  </p>
                  <p className="text-faint font-mono">
                    {isKinyarwanda ? "Telefoni: " : "Phone: "}
                    <span className="text-ink">{agreement.renter.phone}</span>
                  </p>
                  {agreement.renter.email && (
                    <p className="text-faint">
                      Email: <span className="text-ink">{agreement.renter.email}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: PREMISES & FINANCIAL SUMMARY */}
          <section className="mb-8 space-y-3 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink border-b border-line pb-1.5 flex items-center justify-between">
              <span>
                {isKinyarwanda
                  ? "2. Ibiranga Inzu n'Imiterere y'Ubwishyu"
                  : "2. Premises & Tenancy Financial Schedule"}
              </span>
              <span className="text-[10px] text-faint font-normal font-mono">
                {agreement.property.name} &middot; Unit {agreement.property.unitNumber}
              </span>
            </h3>

            <div className="overflow-x-auto border border-line">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  <tr className="border-b border-line bg-surface/30">
                    <td className="p-3 font-semibold text-faint w-1/3">
                      {isKinyarwanda ? "Inzu Ikodeshwa / Umuturirwa" : "Premises / Unit Identification"}
                    </td>
                    <td className="p-3 font-medium text-ink w-2/3">
                      {agreement.property.name}, Unit {agreement.property.unitNumber} (
                      {agreement.property.propertyType})
                    </td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="p-3 font-semibold text-faint">
                      {isKinyarwanda ? "Aderesi n'Akarere" : "Location & District"}
                    </td>
                    <td className="p-3 font-medium text-ink">
                      {agreement.property.address}, {agreement.property.district}
                    </td>
                  </tr>
                  <tr className="border-b border-line bg-surface/30">
                    <td className="p-3 font-semibold text-faint">
                      {isKinyarwanda ? "Itariki yo Gutangira" : "Commencement Date & Term"}
                    </td>
                    <td className="p-3 font-medium text-ink">
                      {formatDate(agreement.tenancyStartDate)} (
                      {agreement.tenancyDurationMonths ?? 12}{" "}
                      {isKinyarwanda ? "Amezi" : "Months"})
                    </td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="p-3 font-semibold text-faint">
                      {isKinyarwanda ? "Ubukode bwa Buri Kwezi" : "Monthly Agreed Rent"}
                    </td>
                    <td className="p-3 font-bold text-ink">
                      {formatCurrencyRwf(agreement.financials.monthlyRentRwf)}
                    </td>
                  </tr>
                  <tr className="border-b border-line bg-surface/30">
                    <td className="p-3 font-semibold text-faint">
                      {isKinyarwanda ? "Umunsi wo Kwishyura" : "Rent Due Day"}
                    </td>
                    <td className="p-3 font-medium text-ink">
                      {isKinyarwanda
                        ? `Mbere y'itariki ya ${agreement.financials.paymentDueDay} ya buri kwezi`
                        : `On or before the ${agreement.financials.paymentDueDay}th day of each calendar month`}
                    </td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="p-3 font-semibold text-faint">
                      {isKinyarwanda ? "Ingwate y'Ubukode" : "Security Deposit"}
                    </td>
                    <td className="p-3 font-medium text-ink">
                      {formatCurrencyRwf(agreement.financials.securityDepositRwf)}
                    </td>
                  </tr>
                  <tr className="bg-surface/50 font-semibold">
                    <td className="p-3 font-bold text-ink">
                      {isKinyarwanda ? "Amafaranga Yose yo Gutangira" : "Total Initial Payment Due"}
                    </td>
                    <td className="p-3 font-bold text-ink">
                      {formatCurrencyRwf(agreement.financials.totalInitialAmountRwf)}
                      <span className="text-[11px] font-normal text-faint block mt-0.5">
                        ({agreement.financials.advanceMonths} {isKinyarwanda ? "amezi y'integuza" : "month(s) advance"} + {isKinyarwanda ? "ingwate" : "deposit"})
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 3: ARTICLES OF AGREEMENT */}
          <section className="mb-10 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink border-b border-line pb-1.5 flex items-center justify-between">
              <span>
                {isKinyarwanda
                  ? "3. Ingingo n'Amabwiriza y'Amasezerano"
                  : "3. General Covenants & Articles of Agreement"}
              </span>
              <span className="text-[10px] text-faint font-mono">
                {agreement.articles.length} {isKinyarwanda ? "Ingingo" : "Articles"}
              </span>
            </h3>

            <div className="space-y-6">
              {agreement.articles.map((art) => {
                const rendered = renderInterpolatedArticle(art, variables);

                return (
                  <div key={art.id} className="text-xs leading-relaxed break-inside-avoid">
                    <h4 className="font-bold text-ink text-[13px] mb-1.5">
                      {isKinyarwanda ? "Ingingo ya" : "Article"} {art.number}:{" "}
                      {rendered.title}
                    </h4>
                    <p className="text-body text-[12.5px] leading-relaxed text-justify">
                      {rendered.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 4: SIGNATURES & ATTESTATION */}
          <section className="mt-12 pt-8 border-t-2 border-ink space-y-4 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
              {isKinyarwanda
                ? "4. Isinywa ry'Amasezerano n'Ibyemezo"
                : "4. Execution & Digital Signatures"}
            </h3>
            <p className="text-xs text-faint">
              {isKinyarwanda
                ? "Mu gushyira umukono kuri iyi nyandiko, impande zombi zemeje ko zasomye, zasobanukiwe kandi zemeye amabwiriza yose akubiye muri aya masezerano."
                : "In witness whereof, the parties hereto have digitally endorsed this Agreement on the dates recorded below through the Urugo Verified Tenancy Service."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Landlord Signature Block */}
              <div className="border border-line p-4 min-h-36 flex flex-col justify-between bg-surface/20">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-faint block">
                    {isKinyarwanda ? "Umukono wa Nyir'inzu" : "Landlord Endorsement"}
                  </span>
                  <p className="font-bold text-sm text-ink mt-1">
                    {agreement.landlord.name}
                  </p>
                </div>

                <div className="pt-4 border-t border-line mt-4">
                  {agreement.landlordSignature ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        <span>
                          {isKinyarwanda ? "Yasinye mu buryo bw'ikoranabuhanga" : "Digitally Endorsed"}
                        </span>
                      </div>
                      <p className="text-[10px] text-faint font-mono">
                        Signed: {formatDate(agreement.landlordSignature.signedAt)}
                      </p>
                      {agreement.landlordSignature.ipAddress && (
                        <p className="text-[10px] text-faint font-mono">
                          IP: {agreement.landlordSignature.ipAddress} &middot; Verified
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-faint italic">
                      {isKinyarwanda
                        ? "[Bitegereje umukono wa Nyir'inzu]"
                        : "[Pending Landlord Signature]"}
                    </div>
                  )}
                </div>
              </div>

              {/* Renter Signature Block */}
              <div className="border border-line p-4 min-h-36 flex flex-col justify-between bg-surface/20">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-faint block">
                    {isKinyarwanda ? "Umukono w'Umukode" : "Renter Endorsement"}
                  </span>
                  <p className="font-bold text-sm text-ink mt-1">
                    {agreement.renter.name}
                  </p>
                </div>

                <div className="pt-4 border-t border-line mt-4">
                  {agreement.renterSignature ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        <span>
                          {isKinyarwanda ? "Yasinye mu buryo bw'ikoranabuhanga" : "Digitally Endorsed"}
                        </span>
                      </div>
                      <p className="text-[10px] text-faint font-mono">
                        Signed: {formatDate(agreement.renterSignature.signedAt)}
                      </p>
                      {agreement.renterSignature.ipAddress && (
                        <p className="text-[10px] text-faint font-mono">
                          IP: {agreement.renterSignature.ipAddress} &middot; Verified
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-faint italic">
                      {isKinyarwanda
                        ? "[Bitegereje umukono w'Umukode]"
                        : "[Pending Renter Signature]"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Footer watermark & security seal */}
          <div className="mt-12 pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between text-[10px] text-faint font-mono">
            <div className="flex items-center gap-1">
              <ShieldCheck className="size-3 text-faint" />
              <span>Urugo Tenancy Registry &middot; Cryptographic Verification Seal</span>
            </div>
            <p className="mt-1 sm:mt-0">
              Doc ID: {agreement.id}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
