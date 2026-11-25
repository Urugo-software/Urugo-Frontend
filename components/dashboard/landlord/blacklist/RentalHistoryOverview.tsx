"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
import type { AppLocale } from "@/i18n/config";
import { localizeDisplayDate } from "@/i18n/display-format";
import { formatDateLocalized, formatRwfLocalized } from "@/i18n/formatting";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { IssueStatus, RentalIssue } from "@/types/landlord";
import { paginateItems } from "@/utils/pagination";
import { getIssueStatusMeta } from "@/utils/rental-debt";

const SEED_ISSUE_IDS = new Set(["iss-501", "iss-502"]);

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
  const t = useTranslations("landlord.renterHistory");
  const tSeed = useTranslations("landlord.seed.issues");
  const tStatuses = useTranslations("common.statuses");
  const locale = useLocale() as AppLocale;
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

  const tabLabel = (tab: "All" | IssueStatus) => {
    if (tab === "All") return t("tabAll");
    if (tab === "Unresolved") return tStatuses("unresolved");
    if (tab === "Disputed") return tStatuses("disputed");
    if (tab === "Reported") return tStatuses("reported");
    if (tab === "Confirmed") return tStatuses("confirmed");
    if (tab === "Resolved") return tStatuses("resolved");
    return tStatuses("rejected");
  };

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
      tenancyPeriod: `${renter.startDate} - ${renter.endDate ?? t("ongoingPeriod")}`,
      landlordName: profile.fullName,
      renterName: renter.name,
      createdDate: formatDateLocalized(today, locale),
      noticeDeadlineDate: formatDateLocalized(deadline, locale),
      daysRemaining: 3,
      status: "Unresolved",
      landlordReport: vals.landlordReport.trim(),
    });
    toast.success(t("reportModal.toastSubmitted"));
    reportForm.reset();
    setReportOpen(false);
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
        </div>

        <Button
          type="button"
          onClick={() => setReportOpen(true)}
          className="h-10 cursor-pointer rounded-none text-xs font-semibold"
        >
          <Plus aria-hidden="true" className="size-4" />
          <span>{t("reportBtn")}</span>
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
          placeholder={t("searchPlaceholder")}
          label={t("searchAria")}
          className="w-full lg:max-w-md"
        />

        <div
          role="tablist"
          aria-label={t("filterAria")}
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
                {tabLabel(tab)}
              </button>
            );
          })}
        </div>
      </div>

      {paginated.length === 0 ? (
        <EmptyStateBox
          icon={FileCheck}
          title={t("emptyTitle")}
          description={
            search || statusFilter !== "All"
              ? t("emptyFilteredDesc")
              : t("emptyDefaultDesc")
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
                {t("clearFilters")}
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div className="space-y-4">
            {paginated.map((issue) => {
              const meta = getIssueStatusMeta(issue.status);
              const isSeed = SEED_ISSUE_IDS.has(issue.id);
              const issueTitle = isSeed
                ? tSeed(`${issue.id}.issueTitle`)
                : issue.issueTitle;
              const landlordReport = isSeed
                ? tSeed(`${issue.id}.landlordReport`)
                : issue.landlordReport;
              const renterResponse = isSeed
                ? tSeed(`${issue.id}.renterResponse`)
                : issue.renterResponse;
              const summaryText =
                issue.status === "Disputed" && renterResponse
                  ? renterResponse
                  : issue.status === "Resolved"
                    ? t("resolvedSummary")
                    : landlordReport;

              return (
                <div
                  key={issue.id}
                  className="flex flex-col justify-between space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink">
                          {issueTitle}
                        </h3>
                        <span aria-hidden="true" className="text-line">&middot;</span>
                        <StatusBadge
                          label={t(`statusMeta.${issue.status}.label`)}
                          tone={meta.tone}
                        />
                      </div>
                      <p className="text-xs text-body">
                        <strong className="text-ink">{issue.renterName}</strong>{" "}
                        · {issue.propertyName} ·{" "}
                        {t("reportedDate", {
                          date: localizeDisplayDate(issue.createdDate, locale),
                        })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-ibm text-lg font-bold text-ink">
                        {formatRwfLocalized(issue.amountRwf, locale)}
                      </span>
                      {issue.daysRemaining !== undefined &&
                        issue.daysRemaining > 0 && (
                          <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-amber-800 sm:justify-end">
                            <Clock aria-hidden="true" className="size-3.5" />
                            <span>
                              {t(
                                issue.daysRemaining === 1
                                  ? "daysLeftSingle"
                                  : "daysLeftPlural",
                                { count: issue.daysRemaining },
                              )}
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
                      {t(`statusMeta.${issue.status}.description`)}
                    </span>
                    <Link
                      href={`/landlord/renter-history/${issue.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                    >
                      <span>{t("viewCaseDetails")}</span>
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
            itemLabel={t("paginationLabel")}
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
        title={t("reportModal.title")}
        description={t("reportModal.description")}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReportOpen(false)}
              className="cursor-pointer rounded-none"
            >
              {t("reportModal.cancel")}
            </Button>
            <Button
              type="submit"
              form="report-obligation-form"
              className="cursor-pointer rounded-none"
            >
              {t("reportModal.submit")}
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
              {t("reportModal.tenantLabel")}{" "}
              <span className="text-rose-600">*</span>
            </FieldLabel>
            <select
              id="issue-renter"
              className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
              {...reportForm.register("renterId", {
                required: t("reportModal.tenantRequired"),
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
              <FieldLabel htmlFor="issue-type">
                {t("reportModal.typeLabel")}
              </FieldLabel>
              <select
                id="issue-type"
                className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
                {...reportForm.register("obligationType")}
              >
                <option value="rent">{t("reportModal.typeRent")}</option>
                <option value="water">{t("reportModal.typeWater")}</option>
                <option value="electricity">
                  {t("reportModal.typeElectricity")}
                </option>
                <option value="other">{t("reportModal.typeOther")}</option>
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="issue-amount">
                {t("reportModal.amountLabel")}{" "}
                <span className="text-rose-600">*</span>
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
                    Number(v) > 0 || t("reportModal.amountPositive"),
                })}
              />
              <FieldError>
                {reportForm.formState.errors.amountRwf?.message}
              </FieldError>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="issue-title">
              {t("reportModal.titleLabel")}{" "}
              <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="issue-title"
              placeholder={t("reportModal.titlePlaceholder")}
              className="h-10 rounded-none"
              {...reportForm.register("issueTitle", {
                validate: (v) =>
                  v.trim().length >= 5 || t("reportModal.titleRequired"),
              })}
            />
            <FieldError>
              {reportForm.formState.errors.issueTitle?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="issue-notes">
              {t("reportModal.notesLabel")}{" "}
              <span className="text-rose-600">*</span>
            </FieldLabel>
            <textarea
              id="issue-notes"
              rows={3}
              placeholder={t("reportModal.notesPlaceholder")}
              className="w-full rounded-none border border-input bg-white p-3 text-sm"
              {...reportForm.register("landlordReport", {
                validate: (v) =>
                  v.trim().length >= 10 || t("reportModal.notesRequired"),
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
