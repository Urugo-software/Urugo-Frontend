import SectionLoading from "@/components/shared/SectionLoading";

export default function LandlordLoading() {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center bg-surface/30 p-8">
      <SectionLoading message="Loading landlord workspace..." />
    </div>
  );
}
