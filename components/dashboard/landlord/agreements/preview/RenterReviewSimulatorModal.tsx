"use client";

import { useState } from "react";
import { X, MessageSquarePlus, PenTool, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agreement, RenterChangeRequest } from "../types/agreement.types";
import toast from "react-hot-toast";

interface Props {
  agreement: Agreement;
  isOpen: boolean;
  onClose: () => void;
  onSubmitChangeRequest: (request: RenterChangeRequest) => void;
  onSignAgreement: (signerName: string) => void;
}

export function RenterReviewSimulatorModal({
  agreement,
  isOpen,
  onClose,
  onSubmitChangeRequest,
  onSignAgreement,
}: Props) {
  const [activeTab, setActiveTab] = useState<"request_change" | "sign">("request_change");
  const [selectedArticleId, setSelectedArticleId] = useState(
    agreement.articles[0]?.id ?? ""
  );
  const [requestedChangeText, setRequestedChangeText] = useState("");
  const [reasonText, setReasonText] = useState("");
  const [signerName, setSignerName] = useState(agreement.renter.name);

  if (!isOpen) return null;

  const handleSubmitChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedChangeText.trim()) {
      toast.error("Please specify the requested change.");
      return;
    }

    const targetArticle = agreement.articles.find((a) => a.id === selectedArticleId);
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

    onSubmitChangeRequest(newRequest);
    toast.success(`Change request submitted for Article ${targetArticle.number}`);
    setRequestedChangeText("");
    setReasonText("");
    onClose();
  };

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) {
      toast.error("Please enter your legal name to endorse.");
      return;
    }

    onSignAgreement(signerName.trim());
    toast.success("Agreement signed successfully as Renter!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg border border-line bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 bg-surface/50">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center bg-ink text-white">
              <User className="size-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                Renter Review & Action Simulator
              </h3>
              <p className="text-[11px] text-faint">
                Simulating actions for {agreement.renter.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-faint hover:text-ink cursor-pointer p-1"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Action Toggle Tabs */}
        <div className="grid grid-cols-2 border-b border-line">
          <button
            type="button"
            onClick={() => setActiveTab("request_change")}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold cursor-pointer border-b-2 ${
              activeTab === "request_change"
                ? "border-ink bg-white text-ink"
                : "border-transparent bg-surface text-faint hover:text-ink"
            }`}
          >
            <MessageSquarePlus className="size-3.5" />
            <span>Request Changes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sign")}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold cursor-pointer border-b-2 ${
              activeTab === "sign"
                ? "border-ink bg-white text-ink"
                : "border-transparent bg-surface text-faint hover:text-ink"
            }`}
          >
            <PenTool className="size-3.5" />
            <span>Sign Agreement</span>
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6">
          {activeTab === "request_change" ? (
            <form onSubmit={handleSubmitChange} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Select Article to Revise
                </label>
                <select
                  value={selectedArticleId}
                  onChange={(e) => setSelectedArticleId(e.target.value)}
                  className="w-full border border-line bg-white p-2 text-xs text-ink focus:border-ink focus:outline-none"
                >
                  {agreement.articles.map((art) => (
                    <option key={art.id} value={art.id}>
                      Article {art.number}: {art.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Requested Adjustment / Revision
                </label>
                <textarea
                  rows={3}
                  value={requestedChangeText}
                  onChange={(e) => setRequestedChangeText(e.target.value)}
                  placeholder="e.g. Please clarify that water heater maintenance is covered by landlord, or change payment date to 5th."
                  className="w-full border border-line bg-white p-2.5 text-xs text-ink placeholder:text-faint focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Explanation / Rationale (Optional)
                </label>
                <input
                  type="text"
                  value={reasonText}
                  onChange={(e) => setReasonText(e.target.value)}
                  placeholder="e.g. Salary pay date is on the 3rd of the month."
                  className="w-full border border-line bg-white p-2 text-xs text-ink placeholder:text-faint focus:border-ink focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="rounded-none border-line text-xs font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-none bg-amber-900 text-white hover:bg-black text-xs font-semibold"
                >
                  Submit Revision Request
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSign} className="space-y-4">
              <div className="border border-line bg-surface/50 p-4 text-xs text-body space-y-2">
                <div className="flex items-center gap-2 font-semibold text-ink">
                  <CheckCircle2 className="size-4 text-ink" />
                  <span>Legal Acknowledgment</span>
                </div>
                <p>
                  By typing your legal name and confirming below, you acknowledge having read and accepted all covenants of Lease Agreement <strong>{agreement.referenceNumber}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Full Legal Name as Signature
                </label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full border border-line bg-white p-2 text-xs font-semibold text-ink focus:border-ink focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="rounded-none border-line text-xs font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-none bg-ink text-white hover:bg-black text-xs font-semibold"
                >
                  Sign & Endorse Agreement
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
