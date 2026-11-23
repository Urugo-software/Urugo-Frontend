"use client";

import { CheckCircle2, Globe, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Step3AgreementLanguageProps } from "@/types/renter-wizard.types";

export function Step3AgreementLanguage({
  selectedLanguage,
  onSelectLanguage,
  onBack,
  onContinue,
}: Step3AgreementLanguageProps) {
  return (
    <div className="space-y-8 sm:space-y-9 text-[12.5px]">
      <div>
        <h3 className="text-lg font-bold text-ink">Agreement Language Selection</h3>
        <p className="text-body text-xs mt-1">
          Select the legal language for drafting this residential tenancy contract.
        </p>
      </div>

      {/* Language Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* English Choice */}
        <div
          onClick={() => onSelectLanguage("en")}
          className={`border p-6 cursor-pointer transition-all ${
            selectedLanguage === "en"
              ? "border-ink bg-surface shadow-xs ring-1 ring-ink"
              : "border-line bg-white hover:border-zinc-400"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-ink text-white">
                <Globe className="size-4" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-faint">
                EN
              </span>
            </div>
            {selectedLanguage === "en" && (
              <CheckCircle2 className="size-5 text-ink" />
            )}
          </div>

          <div className="mt-4 space-y-1.5">
            <h4 className="text-sm font-bold text-ink">
              English (Official Tenancy Lease)
            </h4>
            <p className="text-xs text-body leading-relaxed">
              Standard statutory residential tenancy contract drafted under the statutory laws of the Republic of Rwanda.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-line flex items-center gap-1.5 text-[12.5px] text-faint">
            <FileText className="size-3.5" />
            <span>18 English statutory covenants &middot; Single document</span>
          </div>
        </div>

        {/* Kinyarwanda Choice */}
        <div
          onClick={() => onSelectLanguage("rw")}
          className={`border p-6 cursor-pointer transition-all ${
            selectedLanguage === "rw"
              ? "border-ink bg-surface shadow-xs ring-1 ring-ink"
              : "border-line bg-white hover:border-zinc-400"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-ink text-white">
                <Globe className="size-4" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-faint">
                RW
              </span>
            </div>
            {selectedLanguage === "rw" && (
              <CheckCircle2 className="size-5 text-ink" />
            )}
          </div>

          <div className="mt-4 space-y-1.5">
            <h4 className="text-sm font-bold text-ink">
              Ikinyarwanda (Amasezerano y&rsquo;Ubukode)
            </h4>
            <p className="text-xs text-body leading-relaxed">
              Amasezerano y&rsquo;ubukode bw&rsquo;inzu yo guturamo yateguwe hakurikijwe amategeko n&rsquo;amabwiriza agenga ubutaka mu Rwanda.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-line flex items-center gap-1.5 text-[12.5px] text-faint">
            <FileText className="size-3.5" />
            <span>Ingingo 18 mu Kinyarwanda &middot; Inyandiko imwe rukumbi</span>
          </div>
        </div>
      </div>

      {/* Business Rule Notice */}
      <div className="border border-line bg-surface/50 p-4 flex items-start gap-3">
        <AlertCircle className="size-4 text-faint shrink-0 mt-0.5" />
        <div className="text-xs text-body leading-relaxed space-y-0.5">
          <strong className="text-ink font-semibold block">
            Single Binding Contract Rule
          </strong>
          <p>
            Each tenancy contract is prepared and executed in one chosen language. All standard legal covenants, custom clauses, financial descriptions, and signatures will be structured exclusively in the selected language.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-line pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-10 rounded-none border-line text-xs font-medium px-4"
        >
          &larr; Back to Renter Details
        </Button>

        <Button
          type="button"
          disabled={!selectedLanguage}
          onClick={onContinue}
          className="h-10 rounded-none bg-ink text-white hover:bg-black text-xs font-semibold px-6 cursor-pointer disabled:opacity-50"
        >
          Open Agreement Editor &rarr;
        </Button>
      </div>
    </div>
  );
}
