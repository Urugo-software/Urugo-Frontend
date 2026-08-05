function SignUpFormHeader({
  stepLabel,
  title,
  description,
}: {
  stepLabel: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mt-2 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand">
        {stepLabel}
      </p>
      <h1 className="mb-3 text-center text-3xl font-bold uppercase tracking-wider text-brand-deep sm:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mb-8 max-w-sm text-sm leading-6 text-body sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default SignUpFormHeader;
