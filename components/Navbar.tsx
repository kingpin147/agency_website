"use client";
import { useState } from "react";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DropDownMenu from "./drop-down-menu";

interface NavbarProps {
  scrollToWebsiteDesign?: () => void;
  scrollToGraphicDesign?: () => void;
  scrollToShopifyStores?: () => void;
  scrollToBrands?: () => void;
  scrollToServices?: () => void;
}

const Navbar = ({
  scrollToWebsiteDesign = () => {}, // Default to no-op
  scrollToGraphicDesign = () => {}, // Default to no-op
  scrollToShopifyStores = () => {}, // Default to no-op
  scrollToBrands = () => {}, // Default to no-op
  scrollToServices = () => {}, // Default to no-op
}: NavbarProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownVisible((prev) => !prev);
  };

  const closeDropDown = () => {
    setIsDropDownVisible(false);
  };

  return (
    <header className="p-6 md:p-10 flex items-center justify-between z-50">
      {/* Logo */}
      <Link href="/" aria-label="Go to homepage">
        <Image
          priority
          src="/logo/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-10 h-10 md:w-14 md:h-14"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex space-x-10 items-center text-slate-300 
        bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to bg-neutral-400 bg-opacity-50"
      >
        <button
          onClick={scrollToWebsiteDesign}
          className="hover:text-gray-50"
          aria-label="Scroll to Website Design section"
        >
          Website Design
        </button>
        <button
          onClick={scrollToGraphicDesign}
          className="hover:text-gray-50"
          aria-label="Scroll to Graphic Design section"
        >
          Graphic Design
        </button>
        <button
          onClick={scrollToShopifyStores}
          className="hover:text-gray-50"
          aria-label="Scroll to Shopify Stores section"
        >
          Shopify Stores
        </button>
        <button
          onClick={scrollToBrands}
          className="hover:text-gray-50"
          aria-label="Scroll to Brands section"
        >
          Brands
        </button>
        <Link href="/pricing" className="hover:text-gray-50">
          Pricing
        </Link>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className="md:hidden">
        <button
          onClick={toggleDropDown}
          className="w-8 h-8 text-slate-300 cursor-pointer"
          aria-label={isDropDownVisible ? "Close menu" : "Open menu"}
        >
          {isDropDownVisible ? <X /> : <AlignJustify />}
        </button>
        {isDropDownVisible && (
          <DropDownMenu
            onClose={closeDropDown}
            scrollToServices={scrollToServices}
          />
        )}
      </div>

      {/* Contact Button */}
      <div className="hidden md:flex">
        <Link
          href="/contact"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Contact
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
