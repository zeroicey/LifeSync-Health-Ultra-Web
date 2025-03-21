"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Users,
  HelpCircle,
  ShoppingBag,
  User,
  Home,
  Moon,
  Sun,
  Globe,
} from "lucide-react";

const Navbar: React.FC = () => {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "zh" | "ja">("zh");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        {/* Logo and Project Name - Left Side */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="LifeSync Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-blue-600">LifeSync</span>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition duration-300 flex items-center gap-1"
          >
            <Home size={18} />
            首页
          </Link>
          <Link
            href="/community"
            className="text-gray-700 hover:text-blue-600 transition duration-300 flex items-center gap-1"
          >
            <Users size={18} />
            社区
          </Link>
          <Link
            href="/assistant"
            className="text-gray-700 hover:text-blue-600 transition duration-300 flex items-center gap-1"
          >
            <HelpCircle size={18} />
            助手
          </Link>
          <Link
            href="/shop"
            className="text-gray-700 hover:text-blue-600 transition duration-300 flex items-center gap-1"
          >
            <ShoppingBag size={18} />
            商城
          </Link>
        </div>

        {/* Theme toggle, Language Selector and Personal Center - Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun size={18} className="text-gray-700" />
            ) : (
              <Moon size={18} className="text-gray-700" />
            )}
          </button>

          {/* Language Selector */}
          <div className="flex rounded-md overflow-hidden border border-gray-200">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 text-xs ${
                language === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              英
            </button>
            <button
              onClick={() => setLanguage("zh")}
              className={`px-2 py-1 text-xs ${
                language === "zh"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              中
            </button>
            <button
              onClick={() => setLanguage("ja")}
              className={`px-2 py-1 text-xs ${
                language === "ja"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              日
            </button>
          </div>

          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition duration-300 flex items-center gap-1"
          >
            <User size={18} />
            个人中心
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <Home size={18} />
            首页
          </Link>
          <Link
            href="/community"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <Users size={18} />
            社区
          </Link>
          <Link
            href="/assistant"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <HelpCircle size={18} />
            助手
          </Link>
          <Link
            href="/shop"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            商城
          </Link>
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
          >
            <User size={18} />
            个人中心
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Theme Toggle - Mobile */}
          <button
            onClick={toggleTheme}
            className="w-full block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2"
          >
            {isDarkMode ? (
              <>
                <Sun size={18} />
                切换到亮色模式
              </>
            ) : (
              <>
                <Moon size={18} />
                切换到暗色模式
              </>
            )}
          </button>

          {/* Language Selection - Mobile */}
          <div className="px-3 py-2">
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
              <Globe size={16} />
              选择语言
            </p>
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <button
                onClick={() => setLanguage("en")}
                className={`flex-1 py-2 text-sm ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("zh")}
                className={`flex-1 py-2 text-sm ${
                  language === "zh"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage("ja")}
                className={`flex-1 py-2 text-sm ${
                  language === "ja"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                日本語
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
