import Link from "next/link";

interface NavItemsProps {
  href: string;
  name: string;
}

function NavItems({ href, name }: NavItemsProps) {
  return (
    <Link
      className="text-ink hover:border-b-2 duration-300 hover:border-brand/80 hover:text-brand rounded-full px-2 text-sm tracking-wide"
      href={href}
    >
      {name}
    </Link>
  );
}

export default NavItems;
