import { Card } from "@/components/ui/card";
import { cardLayout } from "@/components/dashboard/landlord/properties/PortfolioCard";

export default function PropertiesLoading() {
  return (
    <div role="status" className="min-h-0 flex-1 space-y-6 overflow-auto p-4 sm:p-8 md:p-10">
      <span className="sr-only">Loading properties</span>
      <div aria-hidden="true" className="space-y-5 motion-safe:animate-pulse">
        <div className="h-9 w-48 rounded bg-muted" />
        <div className="h-12 bg-muted" />
        <div className="h-6 w-36 bg-muted" />
        <div className={cardLayout("grid")}>
          {[0, 1, 2].map((key) => <Card key={key} className="gap-0 rounded-none py-0">
            <div className="h-40 bg-muted" />
            <div className="space-y-3 p-4"><div className="h-5 w-2/3 bg-muted" /><div className="h-4 w-4/5 bg-muted" /><div className="h-4 w-1/2 bg-muted" /></div>
            <div className="h-12 border-t border-line bg-surface" />
          </Card>)}
        </div>
      </div>
    </div>
  );
}
