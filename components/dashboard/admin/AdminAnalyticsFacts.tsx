import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const groups = [
  { title: "Property", facts: [["Average rent", "RWF 182,000"], ["Average deposit", "RWF 180,000"], ["Occupancy", "92%"], ["Verification rate", "87%"]] },
  { title: "Payments", facts: [["Successful volume", "RWF 84.2M"], ["Failed payments", "11"], ["Refunds", "RWF 1.2M"], ["Platform revenue", "RWF 4.1M"]] },
];

export function AdminAnalyticsFacts() {
  return <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">{groups.map((group) => <Card key={group.title} className="gap-0 rounded-lg py-0 shadow-xs ring-line"><CardHeader className="border-b border-line py-4"><CardTitle className="text-[15px] font-semibold">{group.title} summary</CardTitle></CardHeader><CardContent className="grid gap-x-8 sm:grid-cols-2">{group.facts.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 border-b border-line py-3.5 text-sm"><span className="text-body">{label}</span><span className="font-semibold text-ink">{value}</span></div>)}</CardContent></Card>)}</div>;
}
