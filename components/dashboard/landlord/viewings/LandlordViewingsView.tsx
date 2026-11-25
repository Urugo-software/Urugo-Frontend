"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Calendar, Check, Clock, Mail, Phone, X } from "lucide-react";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Pagination } from "@/components/shared/Pagination";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { ViewingRequest, ViewingStatus } from "@/types/landlord";
import { paginateItems } from "@/utils/pagination";

const ITEMS_PER_PAGE = 6;
const TABS: Array<"All" | ViewingStatus> = [
  "All",
  "Pending",
  "Confirmed",
  "Rescheduled",
  "Rejected",
];
const VIEWING_TONE: Record<ViewingStatus, StatusTone> = {
  Pending: "warning",
  Confirmed: "success",
  Rescheduled: "info",
  Rejected: "danger",
};

interface RescheduleValues {
  preferredDate: string;
  preferredTime: string;
}

interface RejectValues {
  reason: string;
}

export function LandlordViewingsView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewings, confirmViewing, rescheduleViewing, rejectViewing } =
    useLandlordWorkspace();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ViewingStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rescheduleTarget, setRescheduleTarget] =
    useState<ViewingRequest | null>(null);
  const [rejectTarget, setRejectTarget] = useState<ViewingRequest | null>(null);

  const rescheduleForm = useForm<RescheduleValues>({
    defaultValues: { preferredDate: "", preferredTime: "10:00" },
  });
  const rejectForm = useForm<RejectValues>({
    defaultValues: { reason: "" },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return viewings.filter((v) => {
      const matchesStatus = statusFilter === "All" || v.status === statusFilter;
      const matchesQuery =
        !q ||
        [v.requesterName, v.propertyName, v.preferredDate, v.requesterPhone]
          .some((val) => val.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [search, statusFilter, viewings]);

  const {
    items: paginated,
    page,
    totalPages,
    totalItems,
  } = paginateItems(filtered, currentPage, ITEMS_PER_PAGE);

  const openReschedule = (req: ViewingRequest) => {
    rescheduleForm.reset({
      preferredDate: req.preferredDate,
      preferredTime: req.preferredTime,
    });
    setRescheduleTarget(req);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Viewing Requests
        </h2>
        <p className="mt-1 text-sm text-body">
          Confirm, reschedule, or decline property visit requests from
          prospective tenants.
        </p>
      </div>

      <div className="flex flex-col gap-3 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center lg:justify-between">
        <DashboardSearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder="Search visitor, property, or date"
          label="Search viewing requests"
          className="w-full lg:max-w-md"
        />

        <div
          role="tablist"
          aria-label="Filter viewing requests"
          className="flex flex-wrap gap-1.5"
        >
          {TABS.map((tab) => {
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
          icon={Calendar}
          title="No viewing requests found"
          description="When prospective tenants request to inspect one of your properties, it will appear here."
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {paginated.map((req) => (
              <div
                key={req.id}
                className="flex flex-col justify-between space-y-4 border border-line bg-white p-5 shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-ink">
                        {req.requesterName}
                      </h3>
                      <p className="truncate text-xs font-medium text-brand-blue">
                        {req.propertyName}
                      </p>
                    </div>
                    <StatusBadge
                      label={req.status}
                      tone={VIEWING_TONE[req.status]}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 border-y border-line py-2.5 text-xs text-body">
                    <span className="inline-flex items-center gap-1.5 font-ibm font-semibold text-ink">
                      <Calendar aria-hidden="true" className="size-3.5 text-faint" />
                      {req.preferredDate}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-ibm font-semibold text-ink">
                      <Clock aria-hidden="true" className="size-3.5 text-faint" />
                      {req.preferredTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-body">
                    <span className="inline-flex items-center gap-1">
                      <Phone aria-hidden="true" className="size-3.5 text-faint" />
                      {req.requesterPhone}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail aria-hidden="true" className="size-3.5 text-faint" />
                      {req.requesterEmail}
                    </span>
                  </div>

                  {req.note && (
                    <p className="border-l-2 border-line pl-3 text-xs leading-relaxed text-body">
                      {req.note}
                    </p>
                  )}

                  {req.rejectionReason && (
                    <p className="border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                      <strong>Rejection reason:</strong> {req.rejectionReason}
                    </p>
                  )}
                </div>

                {req.status !== "Rejected" && (
                  <div className="flex flex-wrap gap-2 border-t border-line pt-3">
                    {req.status !== "Confirmed" && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          confirmViewing(req.id);
                          toast.success(
                            `Viewing confirmed for ${req.requesterName}.`,
                          );
                        }}
                        className="cursor-pointer rounded-none bg-emerald-700 text-xs text-white hover:bg-emerald-800"
                      >
                        <Check aria-hidden="true" className="size-3.5" />
                        Confirm
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => openReschedule(req)}
                      className="cursor-pointer rounded-none text-xs"
                    >
                      Reschedule
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        rejectForm.reset({ reason: "" });
                        setRejectTarget(req);
                      }}
                      className="cursor-pointer rounded-none border-rose-200 text-xs text-rose-700 hover:bg-rose-50"
                    >
                      <X aria-hidden="true" className="size-3.5" />
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            itemLabel="viewing requests"
            onPageChange={(nextPage) => {
              setCurrentPage(nextPage);
              containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}

      {/* Reschedule Modal */}
      <ModalDialog
        open={Boolean(rescheduleTarget)}
        onClose={() => setRescheduleTarget(null)}
        title="Reschedule Viewing"
        description={
          rescheduleTarget
            ? `Propose a new slot for ${rescheduleTarget.requesterName} (${rescheduleTarget.propertyName}).`
            : undefined
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRescheduleTarget(null)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="reschedule-viewing-form"
              className="cursor-pointer rounded-none"
            >
              Save New Time
            </Button>
          </>
        }
      >
        <form
          id="reschedule-viewing-form"
          noValidate
          onSubmit={rescheduleForm.handleSubmit((vals) => {
            if (!rescheduleTarget) return;
            rescheduleViewing(
              rescheduleTarget.id,
              vals.preferredDate,
              vals.preferredTime,
            );
            toast.success("Viewing rescheduled.");
            setRescheduleTarget(null);
          })}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Field>
            <FieldLabel htmlFor="reschedule-date">
              New date <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="reschedule-date"
              type="date"
              className="h-10 rounded-none"
              {...rescheduleForm.register("preferredDate", {
                required: "Choose a date.",
              })}
            />
            <FieldError>
              {rescheduleForm.formState.errors.preferredDate?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="reschedule-time">
              New time <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="reschedule-time"
              type="time"
              className="h-10 rounded-none"
              {...rescheduleForm.register("preferredTime", {
                required: "Choose a time.",
              })}
            />
            <FieldError>
              {rescheduleForm.formState.errors.preferredTime?.message}
            </FieldError>
          </Field>
        </form>
      </ModalDialog>

      {/* Reject Viewing Modal */}
      <ModalDialog
        open={Boolean(rejectTarget)}
        onClose={() => setRejectTarget(null)}
        variant="alert"
        title="Decline Viewing Request"
        description={
          rejectTarget
            ? `Provide a brief reason for ${rejectTarget.requesterName}.`
            : undefined
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRejectTarget(null)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="reject-viewing-form"
              variant="destructive"
              className="cursor-pointer rounded-none"
            >
              Confirm Decline
            </Button>
          </>
        }
      >
        <form
          id="reject-viewing-form"
          noValidate
          onSubmit={rejectForm.handleSubmit((vals) => {
            if (!rejectTarget) return;
            rejectViewing(rejectTarget.id, vals.reason.trim());
            toast.success("Viewing request declined.");
            setRejectTarget(null);
          })}
          className="space-y-2"
        >
          <Field>
            <FieldLabel htmlFor="viewing-reject-reason">
              Reason <span className="text-rose-600">*</span>
            </FieldLabel>
            <textarea
              id="viewing-reject-reason"
              rows={3}
              placeholder="e.g., Unit already reserved, or unavailable on that day..."
              className="w-full rounded-none border border-input bg-white p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              {...rejectForm.register("reason", {
                validate: (v) =>
                  v.trim().length >= 5 || "Enter a short reason.",
              })}
            />
            <FieldError>{rejectForm.formState.errors.reason?.message}</FieldError>
          </Field>
        </form>
      </ModalDialog>
    </div>
  );
}
