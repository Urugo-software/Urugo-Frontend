"use client";

import Link from "next/link";
import { savedPropertiesData } from "@/data/dashboard-data";
import { SectionCard } from "./SectionCard";
import { SavedPropertyItem } from "./SavedPropertyItem";

export function SavedPropertiesSection() {
  return (
    <SectionCard
      title="Saved Properties"
      className="tracking-wide"
      action={
        <Link
          href="/properties"
          className="text-[13.5px] font-semibold text-brand transition hover:underline"
        >
          Browse more →
        </Link>
      }
    >
      <div className="flex flex-col gap-3">
        {savedPropertiesData.map((item) => (
          <SavedPropertyItem key={item.id} item={item} />
        ))}
      </div>
    </SectionCard>
  );
}
