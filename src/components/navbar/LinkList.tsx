import { HelpCircle, Home, ShoppingBag, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function LinkList() {
  const t = useTranslations("NavLabel");
  const pathname = usePathname();

  const links = [
    { href: "/", icon: <Home size={18} />, label: t("home") },
    { href: "/community", icon: <Users size={18} />, label: t("community") },
    {
      href: "/assistant",
      icon: <HelpCircle size={18} />,
      label: t("assistant"),
    },
    { href: "/store", icon: <ShoppingBag size={18} />, label: t("store") },
  ];

  return (
    <div className="hidden md:flex items-center">
      <div className="flex p-1 bg-gradient-to-r from-slate-100/50 to-white/50 dark:from-slate-800/30 dark:to-slate-900/30 rounded-full shadow-inner">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={`
                px-3 py-1.5 h-auto text-sm font-medium transition-all duration-300 rounded-full
                ${
                  isActive
                    ? "bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                }
              `}
            >
              <Link href={link.href} className="flex items-center gap-1.5">
                {link.icon}
                <span className="hidden lg:block">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
