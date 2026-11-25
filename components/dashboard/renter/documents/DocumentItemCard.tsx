"use client";

import { useState } from "react";
import { Download, Eye, FileText, Printer } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RenterDocument } from "@/types/renter";
import {
  buildDocumentDownloadContent,
  downloadTextFile,
} from "@/utils/renter-helpers";

const CATEGORY_KEYS: Record<RenterDocument["category"], string> = {
  "Lease Agreement": "leaseAgreement",
  "Payment Receipt": "paymentReceipt",
  Notice: "notice",
};

export function DocumentItemCard({ doc }: { doc: RenterDocument }) {
  const t = useTranslations("renter.documents");
  const [previewOpen, setPreviewOpen] = useState(false);
  const profile = useRenterWorkspace((s) => s.profile);
  const property = useRenterWorkspace((s) => s.property);

  const content = buildDocumentDownloadContent(doc, property, profile.name);
  const categoryLabel = t(`categories.${CATEGORY_KEYS[doc.category]}`);

  const handleDownload = () => {
    const slug = doc.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    downloadTextFile(`${slug || doc.id}.txt`, content);
    toast.success(t("downloadSuccess", { title: doc.title }));
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-white p-4 shadow-2xs">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center border border-line bg-surface text-brand-blue">
            <FileText aria-hidden="true" className="size-5" />
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-ink">
              {doc.title}
            </h4>
            <span className="text-xs text-faint">
              {categoryLabel} &middot; {doc.size} &middot; {doc.date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
            className="h-8 cursor-pointer rounded-none text-xs"
          >
            <Eye aria-hidden="true" className="size-3.5" />
            {t("preview")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="h-8 cursor-pointer rounded-none text-xs"
          >
            <Download aria-hidden="true" className="size-3.5" />
            {t("download")}
          </Button>
        </div>
      </div>

      <ModalDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={doc.title}
        description={`${categoryLabel} · ${doc.date}`}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.print()}
              className="cursor-pointer rounded-none"
            >
              <Printer aria-hidden="true" className="size-4" />
              {t("print")}
            </Button>
            <Button
              type="button"
              onClick={handleDownload}
              className="cursor-pointer rounded-none"
            >
              <Download aria-hidden="true" className="size-4" />
              {t("downloadCopy")}
            </Button>
          </>
        }
      >
        <pre className="whitespace-pre-wrap border border-line bg-surface/50 p-4 font-ibm text-xs leading-relaxed text-ink">
          {content}
        </pre>
      </ModalDialog>
    </>
  );
}
