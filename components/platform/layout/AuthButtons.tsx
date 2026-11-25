import Link from "next/link";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Link
        href="/auth/sign-in"
        className="hidden h-10 items-center justify-center rounded-full border border-line bg-white px-4 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white md:inline-flex"
      >
        Sign in
      </Link>
      <Link
        href="/auth/sign-up"
        className="inline-flex h-10 items-center justify-center rounded-full border border-brand bg-brand px-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-deep"
      >
        List your property
      </Link>
    </div>
  );
};

export default AuthButtons;
