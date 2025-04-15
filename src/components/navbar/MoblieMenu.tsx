"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Bot, HelpCircle, Home, ShoppingBag, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserMenu } from "./UserMenu";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";

export function MobileMenu() {
  const t = useTranslations("NavLabel");
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      icon: <Home size={18} className="text-blue-500" />,
      label: t("home"),
    },
    {
      href: "/community",
      icon: <Users size={18} className="text-indigo-500" />,
      label: t("community"),
    },
    {
      href: "/assistant",
      icon: <Bot size={18} className="text-purple-500" />,
      label: t("assistant"),
    },
    {
      href: "/shop",
      icon: <ShoppingBag size={18} className="text-amber-500" />,
      label: t("store"),
    },
    {
      href: "/evaluate",
      icon: <HelpCircle size={18} className="text-red-400" />,
      label: t("evaluate"),
    },
  ];

  return (
    <Sidebar
      side="right"
      className="lg:hidden rounded-lg shadow-lg transition-all duration-200"
    >
      <SidebarHeader className="p-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold">LS</span>
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            LifeSync
          </span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {links.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <SidebarMenuItem key={item.label} className="my-1">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                          : ""
                      }`}
                    >
                      <Link href={item.href} className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                        {isActive && (
                          <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-blue-500" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200 dark:border-slate-800">
        <UserMenu
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
