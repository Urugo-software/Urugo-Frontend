import Link from "next/link";

interface NavItemsProps {
  href: string;
  name: string;
}

function NavItems({ href, name }: NavItemsProps) {
  return (
    <Link className="text-ink text-sm tracking-wide" href={href}>
      {name}
    </Link>
  );
}

export default NavItems;
