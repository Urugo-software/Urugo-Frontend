import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export function AdminMetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  return <Card className="gap-0 rounded-lg py-4 shadow-xs ring-line">
    <CardContent className="flex items-start justify-between gap-3 px-4">
      <div><p className="text-sm font-medium text-body">{label}</p><p className="mt-3 text-2xl font-semibold text-ink">{value}</p><p className="mt-1.5 text-[13px] leading-5 text-faint">{detail}</p></div>
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-brand-tint text-brand"><Icon className="size-4" /></span>
    </CardContent>
  </Card>;
}
