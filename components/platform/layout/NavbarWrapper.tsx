"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";

function NavbarWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
    </>
  );
}

export default NavbarWrapper;
