function TotalAvailableProperties({
  total,
  hasActiveFilters = false,
}: {
  total: number;
  hasActiveFilters?: boolean;
}) {
  const noun = total === 1 ? "property" : "properties";
  return (
    <span className="text-[14px] tracking-wide text-body">
      <b className="text-ink">{total}</b>{" "}
      {hasActiveFilters ? `${noun} matching your filters` : `${noun} available`}
    </span>
  );
}

export default TotalAvailableProperties;
