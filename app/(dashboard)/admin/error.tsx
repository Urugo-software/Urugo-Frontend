"use client";

import SectionError from "@/components/shared/SectionError";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <SectionError onRetry={reset} />;
}
