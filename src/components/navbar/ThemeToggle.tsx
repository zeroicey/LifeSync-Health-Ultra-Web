"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usePreferencesStore from "@/stores/preferencesStore";

interface ThemeToggleProps {
  isMobile?: boolean;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isMobile = false,
  className,
}) => {
  const { theme, toggleTheme } = usePreferencesStore();
  const isDarkMode = theme === "dark";

  if (isMobile) {
    return (
      <Button
        onClick={toggleTheme}
        variant="ghost"
        className={cn("w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50", className)}
      >
        {isDarkMode ? (
          <>
            <Sun size={18} className="mr-2" />
            切换到亮色模式
          </>
        ) : (
          <>
            <Moon size={18} className="mr-2" />
            切换到暗色模式
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className={cn("p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors", className)}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun size={18} className="text-gray-700" />
      ) : (
        <Moon size={18} className="text-gray-700" />
      )}
    </Button>
  );
};

export default ThemeToggle;
