"use client";
import React from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usePreferencesStore from "@/stores/preferencesStore";
import { Language } from "@/types/preferences";

interface LanguageSelectorProps {
  isMobile?: boolean;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isMobile = false,
  className,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = usePreferencesStore();

  const switchLanguage = (locale: Language) => {
    setLanguage(locale);
    const newPath = `/${locale}${pathname.substring(3)}`;
    router.push(newPath);
  };

  if (isMobile) {
    return (
      <div className={cn("px-3 py-2", className)}>
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
          <Globe size={16} />
          选择语言
        </p>
        <div className="flex rounded-md overflow-hidden border border-gray-200">
          <Button
            onClick={() => switchLanguage("en")}
            variant={language === "en" ? "default" : "ghost"}
            className={cn(
              "flex-1 py-2 text-sm",
              language === "en" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            )}
          >
            English
          </Button>
          <Button
            onClick={() => switchLanguage("zh")}
            variant={language === "zh" ? "default" : "ghost"}
            className={cn(
              "flex-1 py-2 text-sm",
              language === "zh" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            )}
          >
            中文
          </Button>
          <Button
            onClick={() => switchLanguage("ja")}
            variant={language === "ja" ? "default" : "ghost"}
            className={cn(
              "flex-1 py-2 text-sm",
              language === "ja" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            )}
          >
            日本語
          </Button>
        </div>
      </div>
    );
  }

  // Desktop version with three clickable buttons
  return (
    <div className={cn("flex rounded-md overflow-hidden border border-gray-200", className)}>
      <Button
        onClick={() => switchLanguage("en")}
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 h-auto min-w-0 text-xs rounded-none",
          language === "en" 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "bg-white text-gray-700 hover:bg-gray-100"
        )}
      >
        英
      </Button>
      <Button
        onClick={() => switchLanguage("zh")}
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 h-auto min-w-0 text-xs rounded-none",
          language === "zh" 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "bg-white text-gray-700 hover:bg-gray-100"
        )}
      >
        中
      </Button>
      <Button
        onClick={() => switchLanguage("ja")}
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 h-auto min-w-0 text-xs rounded-none",
          language === "ja" 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "bg-white text-gray-700 hover:bg-gray-100"
        )}
      >
        日
      </Button>
    </div>
  );
};

export default LanguageSelector;
