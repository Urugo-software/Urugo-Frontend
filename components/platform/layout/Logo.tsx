import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Urugo Home"
      className="inline-flex items-center font-extrabold tracking-tight text-xl text-brand transition-colors hover:text-brand-deep"
    >
      URUGO
    </Link>
  );
}

export default Logo;
