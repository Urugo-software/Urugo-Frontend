import { LockKeyhole, Bell, CreditCard, ShieldCheck, Sparkles, Globe2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeading } from "./AdminPageHeading";

const groups = [
  { title: "Platform", icon: Globe2, note: "Public identity and regional defaults", rows: [["Platform name", "Urugo"], ["Currency", "Rwandan franc (RWF)"], ["Default location", "Kigali, Rwanda"], ["Maintenance mode", "Off"]] },
  { title: "Payments", icon: CreditCard, note: "Provider availability and settlement", rows: [["Providers", "MTN MoMo, Airtel Money, Bank of Kigali"], ["Transaction fees", "Managed by finance"], ["Settlement currency", "RWF"]] },
  { title: "Notifications", icon: Bell, note: "Delivery channels used by the platform", rows: [["Email delivery", "Enabled"], ["SMS delivery", "Enabled"], ["Templates", "12 active"]] },
  { title: "Verification", icon: ShieldCheck, note: "Required checks for accounts and listings", rows: [["Landlord identity", "National ID required"], ["Property documents", "Ownership proof required"], ["Review queue", "86 awaiting review"]] },
  { title: "AI services", icon: Sparkles, note: "Service configuration and usage limits", rows: [["Provider", "Configured"], ["Credentials", "Protected"], ["Usage limits", "Managed by platform"]] },
];

function SettingsGroup({ group }: { group: typeof groups[number] }) {
  const Icon = group.icon;
  return <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line"><CardHeader className="flex flex-row items-center gap-3 border-b border-line py-4"><span className="grid size-9 place-items-center rounded-md bg-surface text-body"><Icon className="size-4" /></span><div><CardTitle className="text-[15px]">{group.title}</CardTitle><p className="mt-1 text-[13px] text-body">{group.note}</p></div></CardHeader><CardContent className="divide-y divide-line px-4">{group.rows.map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2 py-3"><span className="text-sm text-body">{label}</span><span className="text-sm font-medium text-ink">{value}</span></div>)}</CardContent></Card>;
}

export function AdminSettingsView() {
  return <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-[1500px] space-y-6 p-4 pb-16 sm:p-8 md:p-10"><AdminPageHeading title="Platform settings" description="Review platform defaults, integrations, and verification requirements." action={<span className="inline-flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-[13px] text-body"><LockKeyhole className="size-3.5" />Sensitive values protected</span>} /><div className="grid gap-5 lg:grid-cols-2">{groups.map((group) => <SettingsGroup key={group.title} group={group} />)}</div><p className="text-[13px] leading-5 text-body">Sample configuration shown for review. Secret credentials are never displayed; changes require a connected admin API.</p></div></div>;
}