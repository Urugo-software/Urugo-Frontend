import { Fragment } from "react";
import NavItems from "./NavItems";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";

const navItems = [
  {
    id: 1,
    title: "Features",
    href: "/features",
  },
  {
    id: 2,
    title: "Properties",
    href: "/properties",
  },
  {
    id: 3,
    title: "How it works",
    href: "/how-it-works",
  },
  {
    id: 4,
    title: "AI Assistant",
    href: "/ai-assistant",
  },
];

function Navbar() {
  return (
    <nav className="bg-white shadow py-2 px-2.5  rounded-full   flex justify-between items-center">
      {/* brand logo */}
      <div className="ml-3">
        <Logo />
      </div>
      {/* navigation items */}
      <div className="hidden md:flex gap-4 md:gap-6 items-center font-medium ">
        {navItems.map((item) => (
          <Fragment key={item.id}>
            <NavItems href={item.href} name={item.title} />
          </Fragment>
        ))}
      </div>
      {/* auth buttons */}
      <AuthButtons />
    </nav>
  );
}

export default Navbar;
