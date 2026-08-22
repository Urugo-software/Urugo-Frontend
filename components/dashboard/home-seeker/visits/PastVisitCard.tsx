"use client";

import Image from "next/image";
import Link from "next/link";
import { VisitItem } from "@/data/visits-data";

export function PastVisitCard({ visit }: { visit: VisitItem }) {
  return (
    <div className=" border border-line bg-white p-6 opacity-80 transition hover:opacity-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface">
          <Image
            src={visit.image}
            alt={visit.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1  self-start">
          <div className="text-[17px]  font-bold text-ink">
            <Link
              className="hover:text-brand hover:underline duration-300"
              href={`/properties/${visit.id}`}
            >
              {visit.title}
            </Link>
          </div>
          <div className="text-[13px] text-body">{visit.location}</div>
        </div>
        <span className="rounded-full bg-surface px-3 py-1.5 text-[11.5px] font-bold text-faint self-start sm:self-center">
          {visit.status}
        </span>
      </div>
    </div>
  );
}
