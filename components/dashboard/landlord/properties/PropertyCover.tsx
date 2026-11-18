"use client";

import Image from "next/image";
import { Building2, Folder } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PropertyCover({ src, folder = false, className }: {
  src?: string | null;
  folder?: boolean;
  className?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const Icon = folder ? Folder : Building2;

  return (
    <div className={cn("relative grid h-40 shrink-0 place-items-center overflow-hidden bg-surface text-faint", className)}>
      {src && src !== failedSrc ? (
        <Image
          alt=""
          src={src}
          fill
          unoptimized={!src.startsWith("/")}
          draggable={false}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <Icon className="size-10" strokeWidth={1.4} aria-hidden="true" />
      )}
    </div>
  );
}
