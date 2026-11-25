"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Calendar, Clock, Send, Trash2 } from "lucide-react";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordInquiry, ViewingRequest } from "@/types/landlord";

const VIEWING_TONE: Record<ViewingRequest["status"], StatusTone> = {
  Pending: "warning",
  Confirmed: "success",
  Rescheduled: "info",
  Rejected: "danger",
};

const INQUIRY_TONE: Record<LandlordInquiry["status"], StatusTone> = {
  New: "info",
  Replied: "success",
  Archived: "neutral",
};

export function RenterViewingCard({ viewing }: { viewing: ViewingRequest }) {
  const t = useTranslations("renter.discovery.inquiries");
  const cancelViewing = useLandlordWorkspace((s) => s.cancelViewingRequest);

  return (
    <article className="space-y-3 border border-line bg-white p-5 shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
        <div className="min-w-0">
          <Link
            href={`/properties/${viewing.propertyId}`}
            className="text-base font-bold text-ink hover:text-brand-blue hover:underline"
          >
            {viewing.propertyName}
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-body">
            <span className="inline-flex items-center gap-1">
              <Calendar aria-hidden="true" className="size-3.5 text-faint" />
              {viewing.preferredDate}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden="true" className="size-3.5 text-faint" />
              {viewing.preferredTime}
            </span>
          </div>
        </div>
        <StatusBadge
          label={viewing.status}
          tone={VIEWING_TONE[viewing.status]}
        />
      </div>

      {viewing.note && (
        <p className="text-sm text-body">
          {t("notePrefix")} {viewing.note}
        </p>
      )}

      {viewing.rejectionReason && (
        <p className="border-l-2 border-rose-500 bg-rose-50/50 px-3 py-2 text-xs text-rose-700">
          {t("landlordNotePrefix")} {viewing.rejectionReason}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-faint">
        <span>{t("requestedDate", { date: viewing.createdAt })}</span>
        {viewing.status === "Pending" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              cancelViewing(viewing.id);
              toast.success(t("cancelViewingSuccess"));
            }}
            className="h-8 cursor-pointer rounded-none text-xs text-rose-700 hover:bg-rose-50"
          >
            <Trash2 aria-hidden="true" className="size-3.5" />
            {t("cancelRequest")}
          </Button>
        )}
      </div>
    </article>
  );
}

export function RenterInquiryCard({ inquiry }: { inquiry: LandlordInquiry }) {
  const t = useTranslations("renter.discovery.inquiries");
  const replyToInquiry = useLandlordWorkspace((s) => s.replyToInquiry);
  const { register, handleSubmit, reset } = useForm<{ text: string }>({
    defaultValues: { text: "" },
  });

  const onReply = ({ text }: { text: string }) => {
    const clean = text.trim();
    if (!clean) return;
    replyToInquiry(inquiry.id, clean, "seeker");
    toast.success(t("followupSuccess"));
    reset();
  };

  return (
    <article className="space-y-3 border border-line bg-white p-5 shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
        <div>
          <Link
            href={`/properties/${inquiry.propertyId}`}
            className="text-base font-bold text-ink hover:text-brand-blue hover:underline"
          >
            {inquiry.propertyName}
          </Link>
          <p className="mt-0.5 text-xs text-faint">
            {t("sentDate", { date: inquiry.createdAt })}
          </p>
        </div>
        <StatusBadge
          label={inquiry.status}
          tone={INQUIRY_TONE[inquiry.status]}
        />
      </div>

      <p className="text-sm leading-relaxed text-ink">{inquiry.message}</p>

      {inquiry.replies.length > 0 && (
        <div className="space-y-2 border-t border-line pt-3">
          {inquiry.replies.map((reply) => (
            <div
              key={reply.id}
              className={`border-l-2 px-3 py-2 text-xs ${
                reply.sender === "landlord"
                  ? "border-brand-blue bg-brand-tint/30 text-ink"
                  : "border-line bg-surface/60 text-body"
              }`}
            >
              <div className="font-semibold">
                {reply.sender === "landlord"
                  ? t("senderLandlord")
                  : t("senderYou")}{" "}
                &middot;{" "}
                <span className="font-normal text-faint">
                  {reply.timestamp}
                </span>
              </div>
              <p className="mt-1 text-sm">{reply.text}</p>
            </div>
          ))}
        </div>
      )}

      {inquiry.status !== "Archived" && (
        <form
          onSubmit={handleSubmit(onReply)}
          className="flex items-center gap-2 border-t border-line pt-3"
        >
          <Input
            placeholder={t("followupPlaceholder")}
            className="h-9 flex-1 rounded-none text-sm"
            {...register("text", { required: true })}
          />
          <Button
            type="submit"
            size="sm"
            className="h-9 cursor-pointer rounded-none px-3.5 text-xs"
          >
            <Send aria-hidden="true" className="size-3.5" />
            {t("replyButton")}
          </Button>
        </form>
      )}
    </article>
  );
}
