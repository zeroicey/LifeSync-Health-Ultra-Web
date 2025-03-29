"use client";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { UserMenu } from "./UserMenu";
import { useSidebar } from "../ui/sidebar";
import LinkList from "./LinkList";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800/50 shadow-sm transition-all duration-300 py-3 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>

        <LinkList />

        <div className="hidden md:flex items-center space-x-3">
          <UserMenu
            user={{
              name: "shadcn",
              email: "m@example.com",
              avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
            }}
          />
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full dark:text-slate-300 dark:hover:bg-slate-800/70 text-slate-700 hover:bg-slate-100/70"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
