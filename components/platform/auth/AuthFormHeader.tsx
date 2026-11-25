import type { Ref } from "react";

interface AuthFormHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  headingRef?: Ref<HTMLHeadingElement>;
}

export function AuthFormHeader({
  eyebrow,
  title,
  description,
  headingRef,
}: AuthFormHeaderProps) {
  return (
    <header className="space-y-2 text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
      )}
      <h1
        ref={headingRef}
        tabIndex={headingRef ? -1 : undefined}
        className="text-2xl font-bold tracking-tight text-ink outline-none sm:text-[1.75rem]"
      >
        {title}
      </h1>
      <p className="mx-auto max-w-sm text-sm leading-relaxed text-body">
        {description}
      </p>
    </header>
  );
}
