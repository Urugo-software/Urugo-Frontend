"use client";

import Image from "next/image";
import { Building2, Folder } from "lucide-react";
import { createContext, useContext, useState } from "react";
import OnLoadSkeleton from "@/components/shared/OnLoadSkeleton";
import { cn } from "@/lib/utils";

export const EagerCoverContext = createContext<string | undefined>(undefined);

export function PropertyCover({ src, folder = false, className }: {
  src?: string | null;
  folder?: boolean;
  className?: string;
}) {
  const eagerCover = useContext(EagerCoverContext);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const Icon = folder ? Folder : Building2;

  return (
    <div className={cn("relative isolate grid h-40 shrink-0 place-items-center overflow-hidden bg-surface text-faint", className)}>
      {src && status === "loading" && <OnLoadSkeleton aria-hidden="true" className="pointer-events-none z-0 bg-line" />}
      {src && status !== "error" ? (
        <Image
          alt=""
          src={src}
          fill
          loading={src === eagerCover ? "eager" : "lazy"}
          unoptimized={!src.startsWith("/")}
          draggable={false}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      ) : (
        <Icon className="size-10" strokeWidth={1.4} aria-hidden="true" />
      )}
    </div>
  );
}
