"use client";
import { CommunitySidebar } from "./CommunitySidebar";

interface ClientSideSidebarContentProps {
  locale: string;
}

export function ClientSideSidebarContent({ locale }: ClientSideSidebarContentProps) {
  return <CommunitySidebar locale={locale} />;
}
