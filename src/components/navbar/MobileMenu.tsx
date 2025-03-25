"use client";
import React from "react";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className={cn("p-0", className)}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <NavLinks isMobile={true} />
          <UserMenu isMobile={true} />

          <Separator className="my-2" />

          {/* Theme Toggle - Mobile */}
          <ThemeToggle isMobile={true} />

          {/* Language Selection - Mobile */}
          <LanguageSelector isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
