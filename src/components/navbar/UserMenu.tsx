import React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  isMobile?: boolean;
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ isMobile = false, className }) => {
  if (isMobile) {
    return (
      <Button
        variant="ghost"
        asChild
        className={cn("w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50", className)}
      >
        <Link href="/dashboard">
          <User size={18} className="mr-2" />
          个人中心
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      asChild
      className={cn("text-gray-700 hover:text-blue-600 transition duration-300", className)}
    >
      <Link href="/dashboard">
        <User size={18} className="mr-1" />
        个人中心
      </Link>
    </Button>
  );
};

export default UserMenu;
