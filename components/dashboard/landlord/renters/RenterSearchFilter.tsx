import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";

interface RenterSearchFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export function RenterSearchFilter({
  searchQuery,
  onSearchChange,
}: RenterSearchFilterProps) {
  return (
    <DashboardSearchInput
      value={searchQuery}
      onChange={onSearchChange}
      placeholder="Search by name, property, unit, or phone..."
      label="Search renters"
      className="w-full"
    />
  );
}
