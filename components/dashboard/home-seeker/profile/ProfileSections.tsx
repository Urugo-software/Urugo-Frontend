import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { profilePreferences, securityOptions } from "@/data/home-seeker-data";

export function ProfileSections() {
  return (
    <>
      <section className="mb-6 flex gap-3 rounded-2xl border border-warn/30 bg-warn-tint p-5">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-warn" />
        <div className="min-w-0">
          <h2 className="text-sm font-bold">You&apos;re not verified yet</h2>
          <p className="mt-1 text-sm leading-6 text-body">
            You can browse and save properties as a guest. To sign a lease,
            start verification with the AI Assistant.
          </p>
        </div>
        <Link
          href="#"
          className="ml-auto h-fit rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap hover:bg-surface"
        >
          Start
        </Link>
      </section>
      <section className="mb-6  border border-line p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-bold">Search preferences</h2>
          <Link
            href="#"
            className="text-sm font-semibold text-brand hover:underline"
          >
            Update via AI Assistant
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {profilePreferences.map((item) => (
            <span
              key={item}
              className="rounded-full bg-surface px-3.5 py-2 text-xs font-semibold"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
      <section className=" border border-line p-6">
        <h2 className="mb-3 text-base font-bold">Account security</h2>
        {securityOptions.map(([title, detail, action], index) => (
          <div
            key={title}
            className={`flex items-center justify-between gap-4 py-3 ${!index ? "border-b border-line" : ""}`}
          >
            <div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-xs text-faint">{detail}</p>
            </div>
            <button className="text-sm font-semibold text-brand hover:underline">
              {action}
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
