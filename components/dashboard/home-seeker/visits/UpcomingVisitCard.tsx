"use client";

import Image from "next/image";
import { VisitItem } from "@/data/visits-data";

interface UpcomingVisitCardProps {
  visit: VisitItem;
  onCancel: (id: string) => void;
}

export function UpcomingVisitCard({
  visit,
  onCancel,
}: UpcomingVisitCardProps) {
  const isConfirmed = visit.status === "Confirmed";
  return (
    <div className="rounded-2xl border border-line bg-white p-6 transition hover:shadow-xs">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-xl bg-surface sm:w-[140px]">
          <Image
            src={visit.image}
            alt={visit.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[15.5px] font-bold text-ink">
                {visit.title}
              </div>
              <div className="text-[13px] text-body">{visit.location}</div>
            </div>
            <span
              className={`rounded-full px-3 py-1.5 text-[11.5px] font-bold ${
                isConfirmed
                  ? "bg-success-tint text-success"
                  : "bg-warn-tint text-warn"
              }`}
            >
              {visit.status}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
            <div>
              <span className="text-faint">Date</span>
              <div className="font-semibold text-ink">{visit.date}</div>
            </div>
            <div>
              <span className="text-faint">Time</span>
              <div className="font-semibold text-ink">{visit.time}</div>
            </div>
            <div>
              <span className="text-faint">Landlord</span>
              <div className="font-semibold text-ink">{visit.landlord}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {isConfirmed && (
              <button
                type="button"
                className="rounded-lg border border-line px-4 py-2 text-[13px] font-semibold text-ink transition hover:bg-surface cursor-pointer"
              >
                Get directions
              </button>
            )}
            <button
              type="button"
              className="rounded-lg border border-line px-4 py-2 text-[13px] font-semibold text-ink transition hover:bg-surface cursor-pointer"
            >
              Reschedule
            </button>
            <button
              type="button"
              onClick={() => onCancel(visit.id)}
              className="rounded-lg border border-line px-4 py-2 text-[13px] font-semibold text-danger transition hover:bg-red-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
