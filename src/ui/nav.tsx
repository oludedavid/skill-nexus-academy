import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import Link from "next/link";
import UserProfile from "./userProfile";

export default function NavBar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathName]);

  function isActive(url: string) {
    return pathName === url;
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#10192B] shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <Button
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Logo
              logoName={"SkillNexusAcademy"}
              className="h-10 w-10 ml-2 text-white font-bold text-lg"
            />
          </div>
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors hover:text-gray-300 ${
                    isActive("/") ? "text-[#DAD7E2]" : "text-white"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className={`text-sm font-medium transition-colors hover:text-gray-300 ${
                    isActive("/courses") ? "text-[#663FD6]" : "text-white"
                  }`}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="relative text-white hover:text-gray-300"
                >
                  <ShoppingBasket size={20} />
                  <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Button
                asChild
                className="bg-[#663FD6] text-white hover:bg-[#552EC4] transition-colors"
              >
                <Link href="/contact-us">Contact Us</Link>
              </Button>
            </div>
            <UserProfile
              userEmailStyle="text-gray-300 text-xs"
              userNameStyle="text-white text-sm font-medium"
              session={session}
              status={status}
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute w-full bg-[#10192B] shadow-xl">
          <div className="px-4 pb-4 pt-2">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className={`block px-4 py-2 text-base font-medium rounded-lg ${
                    isActive("/")
                      ? "bg-[#663FD6] text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className={`block px-4 py-2 text-base font-medium rounded-lg ${
                    isActive("/courses")
                      ? "bg-[#663FD6] text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className={`block px-4 py-2 text-base font-medium rounded-lg ${
                    isActive("/cart")
                      ? "bg-[#663FD6] text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBasket size={20} />
                    Cart
                    <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-1">
                      0
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Button
                  asChild
                  className="w-full bg-[#663FD6] text-white hover:bg-[#552EC4]"
                >
                  <Link href="/contact-us">Contact Us</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
