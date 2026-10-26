import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminAttention } from "@/data/admin-dashboard-data";

export function AdminAttentionPanel() {
  return <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line">
    <CardHeader className="border-b border-line py-4"><CardTitle className="text-[15px] font-semibold">Review queue</CardTitle><p className="text-sm leading-5 text-body">Open work across Urugo</p></CardHeader>
    <CardContent className="divide-y divide-line px-4">
      {adminAttention.map((item) => <Link key={item.title} href={item.href} className="flex items-center justify-between gap-3 py-4 first:pt-4 hover:text-brand">
        <div><p className="text-sm font-medium text-ink">{item.title}</p><p className="mt-1 text-[13px] leading-5 text-body">{item.detail}</p></div>
        <span className="flex items-center gap-2 text-sm font-semibold text-body"><span className="grid min-w-8 place-items-center rounded-full bg-warn-tint px-2 py-1 text-[13px] text-warn">{item.count}</span><ArrowRight className="size-4 text-faint" /></span>
      </Link>)}
    </CardContent>
  </Card>;
}
