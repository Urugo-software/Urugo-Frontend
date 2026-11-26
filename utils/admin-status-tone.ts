import type { StatusTone } from "@/components/shared/StatusBadge";

export function getAdminStatusTone(status: string): StatusTone {
  const s = status.trim().toLowerCase();
  if (
    /^(successful|paid|verified|active|resolved|delivered|executed|approved|published|matched)$/.test(
      s,
    )
  ) {
    return "success";
  }
  if (/^(failed|suspended|rejected|disabled|expired|mismatch)$/.test(s)) {
    return "danger";
  }
  if (
    /pending|review|disputed|ending|open|escalated|reported|waiting|information|restricted|unresolved|simulated|awaiting/.test(
      s,
    )
  ) {
    return "warning";
  }
  if (/^(draft|paused|cancelled|closed|inactive)$/.test(s)) {
    return "neutral";
  }
  return "info";
}
