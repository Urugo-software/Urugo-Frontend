function FeaturedPropertySkeleton() {
  return (
    <div className="flex h-105 w-full flex-col overflow-hidden rounded-sm border border-brand/10 bg-white">
      <div className="h-full animate-pulse bg-gray-200" />
      <div className="space-y-4 p-4 pb-8 pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="h-5 w-2/5 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-4 w-3/5 animate-pulse rounded bg-gray-200" />
        <div className="border-t border-line" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default FeaturedPropertySkeleton;
