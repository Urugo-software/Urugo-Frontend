"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Eye,
  FileEdit,
  MoreHorizontal,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { Agreement, AgreementFilterTab, AgreementStatus } from "@/types/agreement.types";
import { AgreementStatusBadge } from "./AgreementStatusBadge";
import { formatDate } from "@/utils/agreement-utils";

interface Props {
  initialAgreements: Agreement[];
}

const TABS: { id: AgreementFilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "drafts", label: "Drafts" },
  { id: "in_review", label: "Sent" },
  { id: "changes_requested", label: "Changes requested" },
  { id: "awaiting_signatures", label: "Awaiting signature" },
  { id: "signed", label: "Signed" },
  { id: "archived", label: "Archived" },
];

const TAB_STATUS_MAP: Record<Exclude<AgreementFilterTab, "all">, AgreementStatus[]> = {
  drafts: ["Draft", "Ready for Review"],
  in_review: ["Sent", "Viewed"],
  changes_requested: ["Changes Requested"],
  awaiting_signatures: ["Awaiting Renter Signature", "Awaiting Landlord Signature"],
  signed: ["Signed"],
  archived: ["Declined", "Expired", "Superseded", "Cancelled"],
};

const EDITABLE_STATUSES: AgreementStatus[] = [
  "Draft",
  "Ready for Review",
  "Changes Requested",
];

export function AgreementListContainer({ initialAgreements }: Props) {
  const [agreements] = useState<Agreement[]>(initialAgreements);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<AgreementFilterTab>("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close overflow menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

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
        const matchesDistrict = agreement.property.district?.toLowerCase().includes(query);
        if (!matchesRef && !matchesRenter && !matchesProp && !matchesUnit && !matchesDistrict) {
          return false;
        }
      }

      // Tab matching
      if (activeTab === "all") return true;
      const allowed = TAB_STATUS_MAP[activeTab];
      return allowed ? allowed.includes(agreement.status) : true;
    });
  }, [agreements, searchQuery, activeTab]);

  const handleCopyReference = (ref: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(ref);
      setCopiedId(id);
      toast.success(`Copied ${ref} to clipboard`);
      setTimeout(() => setCopiedId(null), 2000);
    }
    setOpenMenuId(null);
  };

  const hasActiveFilters = activeTab !== "all" || searchQuery.trim() !== "";

  return (
    <div className="space-y-6">
      {/* Search and Status Tabs Bar - SpotDraft / DocuSign minimal style */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by renter, reference, property…"
              className="w-full border border-line bg-white py-2 pl-9 pr-8 text-xs sm:text-sm text-ink placeholder:text-faint focus:border-ink focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-faint hover:text-ink cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Clean Text Tabs - Minimal, no repeated counts, no oversized buttons */}
        <div className="flex items-center gap-1 sm:gap-6 border-b border-line overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 pt-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap border-b-2 -mb-px px-2 sm:px-0 ${
                  isActive
                    ? "border-ink text-ink font-semibold"
                    : "border-transparent text-body hover:text-ink hover:border-line"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Agreements List */}
      {filteredAgreements.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-line p-12 text-center bg-surface/30">
          <FileText className="size-8 text-faint mb-2" />
          <h3 className="text-sm font-bold text-ink">No agreements found</h3>
          <p className="mt-1 text-xs text-body max-w-sm">
            {hasActiveFilters
              ? "No agreements match your search or filter criteria."
              : "No agreements recorded yet."}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-4 border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block border border-line bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-line bg-surface/40">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-faint">
                    Agreement
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-faint">
                    Property
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-faint">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-faint">
                    Last updated
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-faint text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredAgreements.map((agreement) => {
                  const isEditable = EDITABLE_STATUSES.includes(agreement.status);
                  const isMenuOpen = openMenuId === agreement.id;

                  return (
                    <tr
                      key={agreement.id}
                      className="hover:bg-surface/50 transition-colors"
                    >
                      {/* Agreement: Renter name + Reference */}
                      <td className="px-6 py-4.5 align-top">
                        <Link
                          href={`/landlord/agreements/${agreement.id}`}
                          className="font-medium text-sm text-ink hover:underline block"
                        >
                          {agreement.renter.name}
                        </Link>
                        <span className="font-mono text-xs text-faint block mt-0.5">
                          {agreement.referenceNumber}
                        </span>
                      </td>

                      {/* Property: Property name + Unit & District */}
                      <td className="px-6 py-4.5 align-top">
                        <span className="text-sm font-medium text-ink block">
                          {agreement.property.name}
                        </span>
                        <span className="text-xs text-body block mt-0.5">
                          Unit {agreement.property.unitNumber} &middot; {agreement.property.district}
                        </span>
                      </td>

                      {/* Status: Plain text with small colored dot, borderless */}
                      <td className="px-6 py-4.5 align-top">
                        <AgreementStatusBadge status={agreement.status} />
                      </td>

                      {/* Last Updated: Single relevant date */}
                      <td className="px-6 py-4.5 align-top text-sm text-body">
                        {formatDate(agreement.updatedAt)}
                      </td>

                      {/* Actions: Clear View link + Compact overflow menu */}
                      <td className="px-6 py-4.5 align-top text-right">
                        <div className="inline-flex items-center justify-end gap-2 relative">
                          <Link
                            href={`/landlord/agreements/${agreement.id}`}
                            className="inline-flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface transition-colors cursor-pointer"
                          >
                            <Eye className="size-3.5 text-faint" />
                            <span>View</span>
                          </Link>

                          {/* Overflow Menu */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(isMenuOpen ? null : agreement.id);
                              }}
                              aria-label="More actions"
                              className="p-1.5 border border-line bg-white text-faint hover:text-ink hover:bg-surface transition-colors cursor-pointer"
                            >
                              <MoreHorizontal className="size-3.5" />
                            </button>

                            {isMenuOpen && (
                              <div
                                ref={menuRef}
                                className="absolute right-0 top-full mt-1 w-44 border border-line bg-white shadow-md z-20 py-1 text-left"
                              >
                                {isEditable && (
                                  <Link
                                    href={`/landlord/agreements/${agreement.id}/edit`}
                                    onClick={() => setOpenMenuId(null)}
                                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-ink hover:bg-surface transition-colors"
                                  >
                                    <FileEdit className="size-3.5 text-faint" />
                                    <span>
                                      {agreement.status === "Changes Requested"
                                        ? "Revise clauses"
                                        : "Edit clauses"}
                                    </span>
                                  </Link>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleCopyReference(agreement.referenceNumber, agreement.id)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-ink hover:bg-surface transition-colors cursor-pointer"
                                >
                                  {copiedId === agreement.id ? (
                                    <>
                                      <Check className="size-3.5 text-success" />
                                      <span>Copied reference</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="size-3.5 text-faint" />
                                      <span>Copy reference</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive List View */}
          <div className="md:hidden divide-y divide-line border-y border-line bg-white">
            {filteredAgreements.map((agreement) => {
              const isEditable = EDITABLE_STATUSES.includes(agreement.status);

              return (
                <div key={agreement.id} className="py-4 space-y-2.5 px-1">
                  {/* Top row: Renter & Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/landlord/agreements/${agreement.id}`}
                        className="font-semibold text-sm text-ink hover:underline block truncate"
                      >
                        {agreement.renter.name}
                      </Link>
                      <span className="font-mono text-xs text-faint block mt-0.5">
                        {agreement.referenceNumber}
                      </span>
                    </div>

                    <AgreementStatusBadge status={agreement.status} />
                  </div>

                  {/* Property Info */}
                  <div className="text-xs text-body">
                    <span className="font-medium text-ink">{agreement.property.name}</span>
                    <span className="text-faint"> &middot; Unit {agreement.property.unitNumber} ({agreement.property.district})</span>
                  </div>

                  {/* Bottom row: Last updated & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-line/60">
                    <span className="text-xs text-faint">
                      Updated {formatDate(agreement.updatedAt)}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/landlord/agreements/${agreement.id}`}
                        className="inline-flex items-center gap-1 border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink hover:bg-surface transition-colors"
                      >
                        <Eye className="size-3 text-faint" />
                        <span>View</span>
                      </Link>

                      {isEditable && (
                        <Link
                          href={`/landlord/agreements/${agreement.id}/edit`}
                          className="inline-flex items-center gap-1 border border-ink bg-ink px-2.5 py-1 text-xs font-semibold text-white hover:bg-black transition-colors"
                        >
                          <FileEdit className="size-3" />
                          <span>
                            {agreement.status === "Changes Requested" ? "Revise" : "Edit"}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
