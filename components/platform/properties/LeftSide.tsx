"use client";

import Link from "next/link";
import { Building2, MessageSquareText } from "lucide-react";
import { useUiStore } from "@/store/ui.store";

function LeftSide() {
  const openAssistant = useUiStore((s) => s.openAssistant);

  return (
    <aside
      aria-label="Helpful actions"
      className="hidden h-full w-[300px] shrink-0 flex-col gap-4 md:flex"
    >
      <div className="rounded-2xl bg-brand p-6 text-white shadow-md">
        <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-white/15">
          <Building2 aria-hidden="true" className="size-4 text-white" />
        </div>
        <h2 className="mb-1.5 text-base font-extrabold">Have a home to rent?</h2>
        <p className="mb-4 text-[13px] leading-relaxed text-white/85">
          List your property in Listing-Only mode to receive viewing requests,
          or manage leases and rent on Urugo.
        </p>
        <Link
          href="/auth/sign-up"
          className="flex w-full justify-center rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-brand transition-colors hover:bg-surface"
        >
          List your property
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5.5 transition-all hover:border-brand/30 hover:shadow-xs">
        <div className="mb-3.5 flex size-9 items-center justify-center rounded-[10px] bg-brand-tint">
          <MessageSquareText aria-hidden="true" size={16} className="text-brand" />
        </div>
        <h2 className="mb-1.5 text-[14.5px] font-bold text-ink">
          Not sure what fits your budget?
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-body">
          Ask Zoe in plain English for Kigali area guidance and move-in cost
          estimates.
        </p>
        <button
          type="button"
          onClick={() => openAssistant()}
          className="flex w-full cursor-pointer justify-center rounded-full border border-line px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
        >
          Ask Zoe
        </button>
      </div>
    </aside>
  );
}

export default LeftSide;
