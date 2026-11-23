import { Card } from "@/components/ui/card";
import { cardLayout } from "@/components/dashboard/landlord/properties/PortfolioCard";

export default function GroupDetailsLoading() {
  return (
    <div role="status" className="min-h-0 flex-1 space-y-6 overflow-auto bg-surface/30 p-4 sm:p-8 md:p-10">
      <span className="sr-only">Loading group details</span>
      <div aria-hidden="true" className="space-y-6 motion-safe:animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-5 w-48 rounded bg-line" />

        {/* Hero Card Skeleton */}
        <Card className="overflow-hidden rounded-none border border-line bg-white shadow-2xs">
          <div className="h-44 sm:h-52 bg-line" />
          <div className="p-4 sm:p-6 space-y-2">
            <div className="h-4 w-2/3 bg-line rounded" />
          </div>
        </Card>

        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((key) => (
            <Card key={key} className="rounded-none border border-line bg-white p-4 shadow-2xs space-y-2">
              <div className="h-3 w-1/2 bg-line rounded" />
              <div className="h-6 w-3/4 bg-line rounded" />
              <div className="h-3 w-1/3 bg-line rounded" />
            </Card>
          ))}
        </div>

        {/* Properties Toolbar Skeleton */}
        <div className="h-14 border border-line bg-white p-4" />

        {/* Properties Grid Skeleton */}
        <div className={cardLayout("grid")}>
          {[0, 1, 2].map((key) => (
            <Card key={key} className="gap-0 rounded-none py-0 border border-line bg-white shadow-2xs">
              <div className="h-40 bg-line" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-2/3 bg-line rounded" />
                <div className="h-4 w-4/5 bg-line rounded" />
                <div className="h-4 w-1/2 bg-line rounded" />
              </div>
              <div className="h-12 border-t border-line bg-surface" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

