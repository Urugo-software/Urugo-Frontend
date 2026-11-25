"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AgreementArticle, RenterChangeRequest } from "@/types/agreement.types";
import toast from "react-hot-toast";

interface Props {
  articles: AgreementArticle[];
  onClose: () => void;
  onSubmit: (request: RenterChangeRequest) => void;
}

export function SimulatorRequestChangeTab({
  articles,
  onClose,
  onSubmit,
}: Props) {
  const t = useTranslations("landlord.agreements.preview.simulator");
  const tCommon = useTranslations("common");
  const [selectedArticleId, setSelectedArticleId] = useState(
    articles[0]?.id ?? "",
  );
  const [requestedChangeText, setRequestedChangeText] = useState("");
  const [reasonText, setReasonText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedChangeText.trim()) {
      toast.error(t("specifyChangeError"));
      return;
    }

    const targetArticle = articles.find((a) => a.id === selectedArticleId);
    if (!targetArticle) return;

    const newRequest: RenterChangeRequest = {
      id: `cr-${Date.now()}`,
      articleId: targetArticle.id,
      articleNumber: targetArticle.number,
      articleTitle: targetArticle.title,
      requestedChange: requestedChangeText.trim(),
      reason: reasonText.trim(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    onSubmit(newRequest);
    toast.success(
      t("changeRequestSuccess", { number: targetArticle.number }),
    );
    setRequestedChangeText("");
    setReasonText("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[12.5px]">
      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          {t("selectArticle")}
        </label>
        <select
          value={selectedArticleId}
          onChange={(e) => setSelectedArticleId(e.target.value)}
          className="w-full border border-line bg-white px-3 py-2 text-[13px] text-ink focus:border-ink focus:outline-none"
        >
          {articles.map((art) => (
            <option key={art.id} value={art.id}>
              {t("articleOption", { number: art.number, title: art.title })}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          {t("requestedAdjustment")}
        </label>
        <textarea
          rows={4}
          value={requestedChangeText}
          onChange={(e) => setRequestedChangeText(e.target.value)}
          placeholder={t("requestedPlaceholder")}
          className="w-full border border-line bg-white p-3 text-[13px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          {t("explanationLabel")}
        </label>
        <input
          type="text"
          value={reasonText}
          onChange={(e) => setReasonText(e.target.value)}
          placeholder={t("explanationPlaceholder")}
          className="w-full border border-line bg-white px-3 py-2 text-[13px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-line pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-8.5 rounded-none border-line px-4 text-[12.5px] font-medium"
        >
          {tCommon("actions.cancel")}
        </Button>
        <Button
          type="submit"
          className="h-8.5 cursor-pointer rounded-none bg-amber-900 px-4 text-[12.5px] font-semibold text-white hover:bg-black"
        >
          {t("submitRevision")}
        </Button>
      </div>
    </form>
  );
}
