import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function OnLoadSkeleton({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("absolute inset-0 z-10 bg-gray-300 motion-safe:animate-pulse", className)} />;
}
