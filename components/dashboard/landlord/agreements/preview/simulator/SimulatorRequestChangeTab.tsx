"use client";

import { useState } from "react";
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
  const [selectedArticleId, setSelectedArticleId] = useState(
    articles[0]?.id ?? ""
  );
  const [requestedChangeText, setRequestedChangeText] = useState("");
  const [reasonText, setReasonText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedChangeText.trim()) {
      toast.error("Please specify the requested change.");
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
    toast.success(`Change request submitted for Article ${targetArticle.number}`);
    setRequestedChangeText("");
    setReasonText("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[12.5px]">
      <div>
        <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
          Select Article to Revise
        </label>
        <select
          value={selectedArticleId}
          onChange={(e) => setSelectedArticleId(e.target.value)}
          className="w-full border border-line bg-white px-3 py-2 text-[13px] text-ink focus:border-ink focus:outline-none"
        >
          {articles.map((art) => (
            <option key={art.id} value={art.id}>
              Article {art.number}: {art.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
          Requested Adjustment / Revision
        </label>
        <textarea
          rows={4}
          value={requestedChangeText}
          onChange={(e) => setRequestedChangeText(e.target.value)}
          placeholder="e.g. Please clarify that water heater maintenance is covered by landlord, or change payment date to 5th."
          className="w-full border border-line bg-white p-3 text-[13px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
          Explanation / Rationale (Optional)
        </label>
        <input
          type="text"
          value={reasonText}
          onChange={(e) => setReasonText(e.target.value)}
          placeholder="e.g. Salary pay date is on the 3rd of the month."
          className="w-full border border-line bg-white px-3 py-2 text-[13px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
        />
      </div>

      <div className="pt-2 flex justify-end gap-2 border-t border-line">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-none border-line text-[12.5px] font-medium h-8.5 px-4"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-none bg-amber-900 text-white hover:bg-black text-[12.5px] font-semibold h-8.5 px-4 cursor-pointer"
        >
          Submit Revision Request
        </Button>
      </div>
    </form>
  );
}
