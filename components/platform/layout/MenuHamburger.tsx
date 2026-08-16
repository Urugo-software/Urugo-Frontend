import { Menu } from "lucide-react";

function MenuHamburger({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <button
      className="md:hidden hover:bg-gray-100 p-2 rounded-md transition-all duration-300 cursor-pointer"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      <Menu />
    </button>
  );
}

export default MenuHamburger;
