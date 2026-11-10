"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Eye,
  FileEdit,
  ArrowUpRight,
  AlertTriangle,
  FileCheck2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Agreement, AgreementFilterTab } from "./types/agreement.types";
import { AgreementStatusBadge } from "./AgreementStatusBadge";
import { formatDate } from "./utils/agreement-utils";

interface Props {
  initialAgreements: Agreement[];
}

export function AgreementListContainer({ initialAgreements }: Props) {
  const [agreements] = useState<Agreement[]>(initialAgreements);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<AgreementFilterTab>("all");

  // Metrics computation
  const metrics = useMemo(() => {
    const total = agreements.length;
    const fullySigned = agreements.filter((a) => a.status === "Signed").length;
    const awaitingSignatures = agreements.filter(
      (a) =>
        a.status === "Awaiting Renter Signature" ||
        a.status === "Awaiting Landlord Signature"
    ).length;
    const changesRequested = agreements.filter(
      (a) => a.status === "Changes Requested"
    ).length;
    const drafts = agreements.filter(
      (a) => a.status === "Draft" || a.status === "Ready for Review"
    ).length;

    return { total, fullySigned, awaitingSignatures, changesRequested, drafts };
  }, [agreements]);

  // Filtering
  const filteredAgreements = useMemo(() => {
    return agreements.filter((agreement) => {
      // Search matching
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchesRef = agreement.referenceNumber.toLowerCase().includes(query);
        const matchesRenter = agreement.renter.name.toLowerCase().includes(query);
        const matchesProp = agreement.property.name.toLowerCase().includes(query);
        const matchesUnit = agreement.property.unitNumber.toLowerCase().includes(query);
        if (!matchesRef && !matchesRenter && !matchesProp && !matchesUnit) {
          return false;
        }
      }

      // Tab matching
      if (activeTab === "all") return true;
      if (activeTab === "drafts") {
        return agreement.status === "Draft" || agreement.status === "Ready for Review";
      }
      if (activeTab === "in_review") {
        return agreement.status === "Sent" || agreement.status === "Viewed";
      }
      if (activeTab === "awaiting_signatures") {
        return (
          agreement.status === "Awaiting Renter Signature" ||
          agreement.status === "Awaiting Landlord Signature"
        );
      }
      if (activeTab === "signed") {
        return agreement.status === "Signed";
      }
      if (activeTab === "archived") {
        return (
          agreement.status === "Declined" ||
          agreement.status === "Expired" ||
          agreement.status === "Superseded" ||
          agreement.status === "Cancelled"
        );
      }

      return true;
    });
  }, [agreements, searchQuery, activeTab]);

  return (
    <div className="space-y-6">
      {/* Metric summary banner */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="border border-line bg-surface/30 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">
            Total Agreements
          </span>
          <p className="mt-1 text-2xl font-bold tracking-tight text-ink">
            {metrics.total}
          </p>
        </div>

        <div className="border border-line bg-surface/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">
              Fully Signed
            </span>
            <FileCheck2 className="size-4 text-ink" />
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-ink">
            {metrics.fullySigned}
          </p>
        </div>

        <div className="border border-line bg-surface/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">
              Pending Signatures
            </span>
            <Clock className="size-4 text-purple-700" />
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-ink">
            {metrics.awaitingSignatures}
          </p>
        </div>

        <div className="border border-line bg-surface/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">
              Changes Requested
            </span>
            <AlertTriangle className="size-4 text-amber-600" />
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-ink">
            {metrics.changesRequested}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: "all", label: "All Agreements" },
            { id: "drafts", label: `Drafts (${metrics.drafts})` },
            { id: "in_review", label: "Sent / In Review" },
            { id: "awaiting_signatures", label: `Signatures (${metrics.awaitingSignatures})` },
            { id: "signed", label: `Signed (${metrics.fullySigned})` },
            { id: "archived", label: "Archived" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AgreementFilterTab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-none cursor-pointer border transition-colors ${
                activeTab === tab.id
                  ? "border-ink bg-ink text-white"
                  : "border-transparent text-faint hover:text-ink hover:bg-surface"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search renter, ref, property…"
            className="w-full rounded-none border border-line bg-white py-1.5 pl-8.5 pr-3 text-xs text-ink placeholder:text-faint focus:border-ink focus:outline-none"
          />
        </div>
      </div>

      {/* Table / List */}
      {filteredAgreements.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-line p-12 text-center">
          <SlidersHorizontal className="size-8 text-faint mb-2" />
          <h3 className="text-sm font-bold text-ink">No agreements found</h3>
          <p className="mt-1 text-xs text-faint max-w-sm">
            No lease agreements match your current filter or search criteria.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-line bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-line bg-surface/50">
              <tr>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  Reference & Renter
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  Property & Unit
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  Language & Articles
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  Last Updated
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  Status
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-faint text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredAgreements.map((agreement) => {
                const isEditable =
                  agreement.status === "Draft" ||
                  agreement.status === "Ready for Review" ||
                  agreement.status === "Changes Requested";

                return (
                  <tr
                    key={agreement.id}
                    className="hover:bg-surface/40 transition-colors"
                  >
                    {/* Reference & Renter */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold text-ink">
                          {agreement.referenceNumber}
                        </span>
                        <span className="mt-0.5 text-sm font-semibold text-ink">
                          {agreement.renter.name}
                        </span>
                        <span className="text-[11px] text-faint font-mono">
                          {agreement.renter.phone}
                        </span>
                      </div>
                    </td>

                    {/* Property & Unit */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-ink">
                          {agreement.property.name}
                        </span>
                        <span className="text-[11px] text-faint">
                          Unit {agreement.property.unitNumber} &middot;{" "}
                          {agreement.property.district}
                        </span>
                      </div>
                    </td>

                    {/* Language & Articles */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-line bg-surface text-ink">
                          {agreement.language.toUpperCase()}
                        </span>
                        <span className="text-xs text-faint">
                          {agreement.articles.length} Articles
                        </span>
                      </div>
                    </td>

                    {/* Last Updated */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-ink">
                          {formatDate(agreement.updatedAt)}
                        </span>
                        <span className="text-[10px] text-faint">
                          Created {formatDate(agreement.createdAt)}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <AgreementStatusBadge status={agreement.status} />
                        {agreement.status === "Changes Requested" && (
                          <span className="text-[10px] font-medium text-amber-800">
                            {agreement.changeRequests?.length ?? 1} revision
                            {(agreement.changeRequests?.length ?? 1) > 1 ? "s" : ""}{" "}
                            requested
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <Link
                          href={`/landlord/agreements/${agreement.id}`}
                          className="inline-flex items-center gap-1 border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink hover:bg-surface transition-colors"
                        >
                          <Eye className="size-3" />
                          <span>View</span>
                        </Link>

                        {isEditable && (
                          <Link
                            href={`/landlord/agreements/${agreement.id}/edit`}
                            className="inline-flex items-center gap-1 border border-ink bg-ink px-2.5 py-1 text-xs font-semibold text-white hover:bg-black transition-colors"
                          >
                            <FileEdit className="size-3" />
                            <span>Edit</span>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
