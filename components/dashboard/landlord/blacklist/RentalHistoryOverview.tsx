"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowRight, Clock, FileCheck, Plus } from "lucide-react";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Pagination } from "@/components/shared/Pagination";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { IssueStatus, RentalIssue } from "@/types/landlord";
import { formatRwf } from "@/utils/format";
import { paginateItems } from "@/utils/pagination";
import { getIssueStatusMeta } from "@/utils/rental-debt";

const ITEMS_PER_PAGE = 6;
const STATUS_FILTERS: Array<"All" | IssueStatus> = [
  "All",
  "Unresolved",
  "Disputed",
  "Reported",
  "Confirmed",
  "Resolved",
  "Rejected",
];

interface ReportIssueFormValues {
  renterId: string;
  obligationType: "rent" | "water" | "electricity" | "other";
  issueTitle: string;
  amountRwf: string;
  landlordReport: string;
}

interface RentalHistoryOverviewProps {
  issues?: RentalIssue[];
}

export function RentalHistoryOverview({
  issues: fallbackIssues,
}: RentalHistoryOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    profile,
    renters,
    issues: storeIssues,
    createIssue,
  } = useLandlordWorkspace();
  const issues = useMemo(
    () => (storeIssues.length ? storeIssues : (fallbackIssues ?? [])),
    [storeIssues, fallbackIssues],
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | IssueStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportOpen, setReportOpen] = useState(false);

  const reportForm = useForm<ReportIssueFormValues>({
    defaultValues: {
      renterId: renters[0]?.id ?? "",
      obligationType: "water",
      issueTitle: "",
      amountRwf: "",
      landlordReport: "",
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return issues.filter((issue) => {
      const matchesStatus =
        statusFilter === "All" || issue.status === statusFilter;
      const matchesQuery =
        !q ||
        [issue.renterName, issue.propertyName, issue.issueTitle]
          .some((val) => val.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [issues, search, statusFilter]);

  const {
    items: paginated,
    page,
    totalPages,
    totalItems,
  } = paginateItems(filtered, currentPage, ITEMS_PER_PAGE);

  const onReportSubmit = (vals: ReportIssueFormValues) => {
    const renter = renters.find((r) => r.id === vals.renterId);
    if (!renter) return;
    const today = new Date();
    const deadline = new Date(today);
    deadline.setDate(deadline.getDate() + 3);

    createIssue({
      renterId: renter.id,
      propertyId: renter.propertyId,
      obligationType: vals.obligationType,
      issueTitle: vals.issueTitle.trim(),
      amountRwf: Math.round(Number(vals.amountRwf)),
      propertyName: `${renter.propertyName} — ${renter.unitNumber}`,
      tenancyPeriod: `${renter.startDate} - ${renter.endDate ?? "Ongoing"}`,
      landlordName: profile.fullName,
      renterName: renter.name,
      createdDate: today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      noticeDeadlineDate: deadline.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      daysRemaining: 3,
      status: "Unresolved",
      landlordReport: vals.landlordReport.trim(),
    });
    toast.success(
      "Obligation submitted under a 3-day notice window (Unresolved).",
    );
    reportForm.reset();
    setReportOpen(false);
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Renter History & Obligations
          </h2>
          <p className="mt-1 text-sm text-body">
            Review verified tenancy obligations, active 3-day notice cases, and
            renter dispute responses. Unresolved and disputed records are never
            classified as confirmed debt.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setReportOpen(true)}
          className="h-10 cursor-pointer rounded-none text-xs font-semibold"
        >
          <Plus aria-hidden="true" className="size-4" />
          <span>Report Rental Obligation</span>
        </Button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center lg:justify-between">
        <DashboardSearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder="Search renter name, property, or obligation..."
          label="Search rental history records"
          className="w-full lg:max-w-md"
        />

        <div
          role="tablist"
          aria-label="Filter rental history by status"
          className="flex flex-wrap gap-1.5"
        >
          {STATUS_FILTERS.map((tab) => {
            const active = statusFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setStatusFilter(tab);
                  setCurrentPage(1);
                }}
                className={`h-9 cursor-pointer border px-3 text-xs font-semibold transition-colors ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-body hover:bg-surface hover:text-ink"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {paginated.length === 0 ? (
        <EmptyStateBox
          icon={FileCheck}
          title="No rental history records found"
          description={
            search || statusFilter !== "All"
              ? "No records match your current search or status filter."
              : "No unpaid rental obligations or disputes have been reported."
          }
          action={
            search || statusFilter !== "All" ? (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer rounded-none"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setCurrentPage(1);
                }}
              >
                Clear filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div className="space-y-4">
            {paginated.map((issue) => {
              const meta = getIssueStatusMeta(issue.status);
              const summaryText =
                issue.status === "Disputed" && issue.renterResponse
                  ? issue.renterResponse
                  : issue.status === "Resolved"
                    ? "Obligation settled or proof accepted; case closed."
                    : issue.landlordReport;

              return (
                <div
                  key={issue.id}
                  className="flex flex-col justify-between space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink">
                          {issue.issueTitle}
                        </h3>
                        <span aria-hidden="true" className="text-line">&middot;</span>
                        <StatusBadge label={meta.label} tone={meta.tone} />
                      </div>
                      <p className="text-xs text-body">
                        <strong className="text-ink">{issue.renterName}</strong>{" "}
                        · {issue.propertyName} · Reported {issue.createdDate}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-ibm text-lg font-bold text-ink">
                        {formatRwf(issue.amountRwf)}
                      </span>
                      {issue.daysRemaining !== undefined &&
                        issue.daysRemaining > 0 && (
                          <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-amber-800 sm:justify-end">
                            <Clock aria-hidden="true" className="size-3.5" />
                            <span>
                              {issue.daysRemaining} day
                              {issue.daysRemaining === 1 ? "" : "s"} left in
                              notice window
                            </span>
                          </p>
                        )}
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-body">
                    {summaryText}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                    <span className="text-xs text-faint">
                      {meta.description}
                    </span>
                    <Link
                      href={`/landlord/renter-history/${issue.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                    >
                      <span>View Case Details</span>
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            itemLabel="records"
            onPageChange={(nextPage) => {
              setCurrentPage(nextPage);
              containerRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </>
      )}

      {/* Report Obligation Modal */}
      <ModalDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="Report Unresolved Rental Obligation"
        description="Record an unpaid rent or utility balance tied to a verified tenancy. The renter automatically receives a 3-day notice to pay or submit proof before confirmation."
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReportOpen(false)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="report-obligation-form"
              className="cursor-pointer rounded-none"
            >
              Submit Notice
            </Button>
          </>
        }
      >
        <form
          id="report-obligation-form"
          noValidate
          onSubmit={reportForm.handleSubmit(onReportSubmit)}
          className="space-y-4"
        >
          <Field>
            <FieldLabel htmlFor="issue-renter">
              Verified tenant <span className="text-rose-600">*</span>
            </FieldLabel>
            <select
              id="issue-renter"
              className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
              {...reportForm.register("renterId", {
                required: "Select a tenant.",
              })}
            >
              {renters.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.propertyName} ({r.unitNumber})
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="issue-type">Obligation type</FieldLabel>
              <select
                id="issue-type"
                className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
                {...reportForm.register("obligationType")}
              >
                <option value="rent">Unpaid Rent</option>
                <option value="water">Water Bill (WASAC)</option>
                <option value="electricity">Electricity (EUCL)</option>
                <option value="other">Other Agreed Charge</option>
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="issue-amount">
                Remaining amount (RWF) <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="issue-amount"
                type="number"
                min={500}
                step={500}
                placeholder="50000"
                className="h-10 rounded-none"
                {...reportForm.register("amountRwf", {
                  validate: (v) =>
                    Number(v) > 0 || "Enter a positive amount in RWF.",
                })}
              />
              <FieldError>
                {reportForm.formState.errors.amountRwf?.message}
              </FieldError>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="issue-title">
              Summary title <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="issue-title"
              placeholder="e.g., Unpaid August Water Utility Balance"
              className="h-10 rounded-none"
              {...reportForm.register("issueTitle", {
                validate: (v) =>
                  v.trim().length >= 5 || "Enter a clear summary title.",
              })}
            />
            <FieldError>
              {reportForm.formState.errors.issueTitle?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="issue-notes">
              Supporting details <span className="text-rose-600">*</span>
            </FieldLabel>
            <textarea
              id="issue-notes"
              rows={3}
              placeholder="Describe the billing period, meter reading, or agreed lease obligation..."
              className="w-full rounded-none border border-input bg-white p-3 text-sm"
              {...reportForm.register("landlordReport", {
                validate: (v) =>
                  v.trim().length >= 10 ||
                  "Provide factual supporting details.",
              })}
            />
            <FieldError>
              {reportForm.formState.errors.landlordReport?.message}
            </FieldError>
          </Field>
        </form>
      </ModalDialog>
    </div>
  );
}
