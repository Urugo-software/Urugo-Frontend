"use client";

import { useState } from "react";
import { X, MessageSquarePlus, PenTool, User } from "lucide-react";
import { Agreement, RenterChangeRequest } from "@/types/agreement.types";
import { SimulatorRequestChangeTab } from "./simulator/SimulatorRequestChangeTab";
import { SimulatorSignTab } from "./simulator/SimulatorSignTab";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg border border-line bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 bg-surface/50">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center bg-ink text-white">
              <User className="size-3.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-bold text-ink">
                Renter Review & Action Simulator
              </h3>
              <p className="text-[12.5px] text-faint">
                Simulating actions for {agreement.renter.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-faint hover:text-ink cursor-pointer p-1"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Action Toggle Tabs */}
        <div className="grid grid-cols-2 border-b border-line text-[12.5px]">
          <button
            type="button"
            onClick={() => setActiveTab("request_change")}
            className={`flex items-center justify-center gap-2 py-2.5 font-semibold cursor-pointer border-b-2 transition-colors ${
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
            className={`flex items-center justify-center gap-2 py-2.5 font-semibold cursor-pointer border-b-2 transition-colors ${
              activeTab === "sign"
                ? "border-ink bg-white text-ink"
                : "border-transparent bg-surface text-faint hover:text-ink"
            }`}
          >
            <PenTool className="size-3.5" />
            <span>Sign Agreement</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-[12.5px]">
          {activeTab === "request_change" ? (
            <SimulatorRequestChangeTab
              articles={agreement.articles}
              onClose={onClose}
              onSubmit={onSubmitChangeRequest}
            />
          ) : (
            <SimulatorSignTab
              referenceNumber={agreement.referenceNumber}
              defaultSignerName={agreement.renter.name}
              onClose={onClose}
              onSign={onSignAgreement}
            />
          )}
        </div>
      </div>
    </div>
  );
}
