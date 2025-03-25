import React from "react";
import Link from "next/link";
import { Home, Users, HelpCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  isMobile?: boolean;
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile = false, className }) => {
  const links = [
    { href: "/", icon: <Home size={18} />, label: "首页" },
    { href: "/community", icon: <Users size={18} />, label: "社区" },
    { href: "/assistant", icon: <HelpCircle size={18} />, label: "助手" },
    { href: "/shop", icon: <ShoppingBag size={18} />, label: "商城" },
  ];

  if (isMobile) {
    return (
      <>
        {links.map((link) => (
          <Button
            key={link.href}
            variant="ghost"
            asChild
            className="w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            <Link href={link.href}>
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          </Button>
        ))}
      </>
    );
  }

  return (
    <div className={cn("flex items-center space-x-8", className)}>
      {links.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className="text-gray-700 hover:text-blue-600 transition duration-300"
        >
          <Link href={link.href}>
            {link.icon}
            <span className="ml-1">{link.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default NavLinks;
