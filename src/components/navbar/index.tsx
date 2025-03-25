"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu } from "lucide-react";

// Import our components
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usePreferencesStore from "@/stores/preferencesStore";

const Navbar: React.FC = () => {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = usePreferencesStore();

  // 同步 Zustand 主题状态到 next-themes
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        {/* Logo and Project Name - Left Side */}
        <Logo />

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <NavLinks />
        </div>

        {/* Theme toggle, Language Selector and Personal Center - Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Language Selector */}
          <LanguageSelector />

          {/* User Menu */}
          <UserMenu />
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center">
          <Button
            onClick={toggleMenu}
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-blue-600 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden">
        <MobileMenu 
          isOpen={isOpen}
          onClose={handleCloseMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
