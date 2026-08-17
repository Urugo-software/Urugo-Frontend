import { Fragment } from "react";
import NavItems from "./NavItems";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import MenuHamburger from "./MenuHamburger";
import { navItems } from "@/data/navbar-data";

function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
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
            <NavItems  href={item.href} name={item.title} />
          </Fragment>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {/* auth buttons */}
        <AuthButtons />
        {/* Menu hamburger */}
        <MenuHamburger
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </nav>
  );
}

export default Navbar;
