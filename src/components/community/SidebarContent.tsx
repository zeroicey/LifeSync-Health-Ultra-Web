"use client";
import { CommunitySidebar } from "./CommunitySidebar";

interface SidebarContentProps {
  locale: string;
}

// 使用默认导出
export default function SidebarContent({ locale }: SidebarContentProps) {
  return <CommunitySidebar locale={locale} />;
}
