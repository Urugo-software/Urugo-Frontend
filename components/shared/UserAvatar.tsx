"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name: string;
  className?: string;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserAvatar({ src, name, className }: UserAvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex size-16 shrink-0 items-center justify-center overflow-hidden border border-line bg-surface text-base font-bold text-ink",
        className,
      )}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="80px"
          unoptimized={!src.startsWith("/")}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </div>
  );
}
