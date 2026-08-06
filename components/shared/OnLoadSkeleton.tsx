import { cn } from "@/lib/utils";

function OnLoadSkeleton({
  children: Children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("animate-pulse bg-gray-300 inset-0 absolute z-10")}>
      {Children}
    </div>
  );
}

export default OnLoadSkeleton;
