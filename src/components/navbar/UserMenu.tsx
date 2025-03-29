"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Languages,
  Lightbulb,
  LogOut,
  Monitor,
  Moon,
  Sparkles,
  Sun,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import React from "react";
import {
  LanguageState,
  ThemeState,
  useLanguageStore,
  useThemeStore,
} from "@/stores/settingStore";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";

export function UserMenu({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { buttonLabels, setLanguage, language }: LanguageState =
    useLanguageStore();
  const { theme, setTheme }: ThemeState = useThemeStore();
  const { setTheme: _setTheme } = useTheme();
  const router = useRouter();
  const [, startTransition] = React.useTransition();
  const pathname = usePathname();
  const params = useParams();

  const switchTheme = (theme: string) => {
    const nextTheme = theme as "light" | "dark" | "system";
    setTheme(nextTheme);
    _setTheme(nextTheme);
    if (nextTheme === theme) return;
  };

  const switchLanguage = (locale: string) => {
    const nextLocale = locale as "zh" | "en" | "jp";
    const currentLocale = params.locale as string;
    setLanguage(nextLocale);
    if (nextLocale === currentLocale) return;
    startTransition(() => {
      // @ts-ignore
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 px-2 py-1.5 rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all duration-300"
        >
          <Avatar className="h-8 w-8 rounded-full border-2 border-slate-200 dark:border-slate-700">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:grid flex-1 text-left text-sm leading-tight">
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {user.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg"
        side="bottom"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 p-3 text-left border-b border-slate-100 dark:border-slate-800">
            <Avatar className="h-10 w-10 rounded-full border-2 border-slate-200 dark:border-slate-700">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {user.name}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="p-2">
          <DropdownMenuGroup>
            <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-slate-700" />

          <DropdownMenuGroup>
            <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <User className="h-4 w-4 text-blue-500" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell className="h-4 w-4 text-amber-500" />
              <span>Notifications</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-slate-700" />

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Languages className="h-4 w-4 text-green-500" />
                <span>Language</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <DropdownMenuRadioGroup
                    value={language}
                    onValueChange={switchLanguage}
                  >
                    <DropdownMenuRadioItem
                      value="en"
                      className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors pl-7"
                    >
                      {buttonLabels.en}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="zh"
                      className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors pl-7"
                    >
                      {buttonLabels.zh}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="jp"
                      className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors pl-7"
                    >
                      {buttonLabels.jp}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={switchTheme}
                  >
                    <DropdownMenuRadioItem
                      value="light"
                      className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors pl-7"
                    >
                      <Sun className="h-4 w-4 text-amber-500" />
                      <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="dark"
                      className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors pl-7"
                    >
                      <Moon className="h-4 w-4 text-indigo-500" />
                      <span>Dark</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="system"
                      className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors pl-7"
                    >
                      <Monitor className="h-4 w-4 text-blue-500" />
                      <span>System</span>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-slate-700" />

          <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center gap-2 p-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
