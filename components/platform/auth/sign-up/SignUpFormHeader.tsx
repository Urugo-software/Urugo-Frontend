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
    <div className="text-center sm:mt-2">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand sm:text-xs sm:tracking-[0.35em]">
        {stepLabel}
      </p>
      <h1 className="mb-3 text-center text-2xl font-bold uppercase tracking-wider text-brand ">
        {title}
      </h1>
      <p className="mx-auto mb-6 max-w-xs text-sm leading-6 text-gray-400 sm:mb-8 sm:max-w-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default SignUpFormHeader;
