"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Archive, Mail, MessageSquare, Phone, Send } from "lucide-react";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Pagination } from "@/components/shared/Pagination";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { InquiryStatus } from "@/types/landlord";
import { paginateItems } from "@/utils/pagination";

const ITEMS_PER_PAGE = 5;
const TABS: Array<"All" | InquiryStatus> = ["All", "New", "Replied", "Archived"];
const TONE: Record<InquiryStatus, StatusTone> = {
  New: "info",
  Replied: "success",
  Archived: "neutral",
};

interface ReplyForm {
  message: string;
}

export function LandlordInquiriesView() {
  const { inquiries, contactVisibility, replyToInquiry, updateInquiryStatus } =
    useLandlordWorkspace();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | InquiryStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(
    inquiries[0]?.id ?? null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyForm>({ defaultValues: { message: "" } });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
      const matchesQuery =
        !q ||
        [inq.senderName, inq.propertyName, inq.message, inq.senderPhone]
          .some((val) => val.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [inquiries, search, statusFilter]);

  const {
    items: paginated,
    page,
    totalPages,
    totalItems,
  } = paginateItems(filtered, currentPage, ITEMS_PER_PAGE);

  const activeInquiry =
    filtered.find((i) => i.id === selectedId) ?? paginated[0] ?? null;

  const onSendReply = (values: ReplyForm) => {
    if (!activeInquiry) return;
    replyToInquiry(activeInquiry.id, values.message.trim());
    toast.success(`Reply sent to ${activeInquiry.senderName}.`);
    reset();
  };

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Property Inquiries
          </h2>
          <p className="mt-1 text-sm text-body">
            Respond directly to prospective tenants asking about your listings.
          </p>
        </div>

        <Link
          href="/landlord/settings?tab=profile"
          className="border border-line bg-white px-3 py-2 text-xs font-semibold text-body hover:text-ink"
        >
          Contact visibility:{" "}
          <strong className="text-ink">
            {[
              contactVisibility.showPhone && "Phone",
              contactVisibility.showWhatsApp && "WhatsApp",
              contactVisibility.showEmail && "Email",
            ]
              .filter(Boolean)
              .join(", ") || "Platform only"}
          </strong>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center lg:justify-between">
        <DashboardSearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder="Search tenant, property, or message"
          label="Search property inquiries"
          className="w-full lg:max-w-md"
        />
        <div
          role="tablist"
          aria-label="Filter inquiries"
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

      {filtered.length === 0 ? (
        <EmptyStateBox
          icon={MessageSquare}
          title="No inquiries found"
          description="Incoming questions from prospective tenants will appear here."
          action={
            search || statusFilter !== "All" ? (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer rounded-none"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
              >
                Clear filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          {/* Inquiry List */}
          <div className="space-y-3 xl:col-span-2">
            {paginated.map((inq) => {
              const selected = activeInquiry?.id === inq.id;
              return (
                <button
                  key={inq.id}
                  type="button"
                  onClick={() => setSelectedId(inq.id)}
                  className={`w-full cursor-pointer border p-4 text-left transition-colors ${
                    selected
                      ? "border-brand-blue bg-brand-tint/30"
                      : "border-line bg-white hover:bg-surface/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="truncate text-sm font-bold text-ink">
                      {inq.senderName}
                    </span>
                    <StatusBadge label={inq.status} tone={TONE[inq.status]} />
                  </div>
                  <p className="mt-1 truncate text-xs font-medium text-brand-blue">
                    {inq.propertyName}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs text-body">
                    {inq.message}
                  </p>
                  <p className="mt-2 text-[11px] text-faint">{inq.createdAt}</p>
                </button>
              );
            })}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              itemLabel="inquiries"
              onPageChange={setCurrentPage}
              className="mt-4 pt-4"
            />
          </div>

          {/* Detail & Reply Panel */}
          {activeInquiry && (
            <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs sm:p-6 xl:col-span-3">
              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-ink">
                        {activeInquiry.senderName}
                      </h3>
                      <span aria-hidden="true" className="text-line">&middot;</span>
                      <StatusBadge
                        label={activeInquiry.status}
                        tone={TONE[activeInquiry.status]}
                      />
                    </div>
                    <p className="mt-1 text-xs font-medium text-brand-blue">
                      {activeInquiry.propertyName}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-body">
                      <span className="inline-flex items-center gap-1">
                        <Phone aria-hidden="true" className="size-3.5 text-faint" />
                        {activeInquiry.senderPhone}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Mail aria-hidden="true" className="size-3.5 text-faint" />
                        {activeInquiry.senderEmail}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const next =
                        activeInquiry.status === "Archived" ? "New" : "Archived";
                      updateInquiryStatus(activeInquiry.id, next);
                      toast.success(
                        next === "Archived"
                          ? "Inquiry archived."
                          : "Inquiry reopened.",
                      );
                    }}
                    className="cursor-pointer rounded-none text-xs"
                  >
                    <Archive aria-hidden="true" className="size-3.5" />
                    {activeInquiry.status === "Archived" ? "Reopen" : "Archive"}
                  </Button>
                </div>

                {/* Thread */}
                <div className="space-y-3">
                  <div className="border border-line bg-surface/50 p-4">
                    <div className="flex items-center justify-between text-xs text-faint">
                      <strong className="text-ink">
                        {activeInquiry.senderName}
                      </strong>
                      <span>{activeInquiry.createdAt}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {activeInquiry.message}
                    </p>
                  </div>

                  {activeInquiry.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="border border-blue-200 bg-brand-tint/40 p-4"
                    >
                      <div className="flex items-center justify-between text-xs text-faint">
                        <strong className="text-brand-blue">You (Landlord)</strong>
                        <span>{reply.timestamp}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink">
                        {reply.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <form
                noValidate
                onSubmit={handleSubmit(onSendReply)}
                className="mt-6 space-y-2 border-t border-line pt-4"
              >
                <label
                  htmlFor="inquiry-reply"
                  className="block text-xs font-semibold text-ink"
                >
                  Send a reply
                </label>
                <textarea
                  id="inquiry-reply"
                  rows={3}
                  placeholder="Write your response about pricing, availability, or viewing times..."
                  aria-invalid={!!errors.message}
                  className="w-full rounded-none border border-input bg-white p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                  {...register("message", {
                    validate: (v) =>
                      v.trim().length >= 3 || "Enter a reply message.",
                  })}
                />
                <FieldError>{errors.message?.message}</FieldError>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="cursor-pointer rounded-none text-xs"
                  >
                    <Send aria-hidden="true" className="size-3.5" />
                    Send Reply
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
