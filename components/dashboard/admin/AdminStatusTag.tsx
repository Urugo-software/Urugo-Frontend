export function AdminStatusTag({ status }: { status: string }) {
  const tone = /successful|paid|verified|active|resolved|delivered/i.test(status)
    ? "bg-emerald-50 text-emerald-700"
    : /failed|suspended|rejected|disabled/i.test(status)
      ? "bg-red-50 text-red-700"
      : /review|pending|disputed|ending|open|escalated|reported|waiting|information/i.test(status)
        ? "bg-amber-50 text-amber-800"
        : "bg-surface text-body";
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-medium ${tone}`}>{status}</span>;
}
