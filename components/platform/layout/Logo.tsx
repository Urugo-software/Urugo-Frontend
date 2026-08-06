import Link from "next/dist/client/link";

function Logo() {
  return (
    <div>
      <Link href="/">
        <h1 className="font-extrabold text-brand tracking-tight text-xl">
          URUGO
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
