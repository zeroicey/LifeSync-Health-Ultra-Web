"use client";

import dynamic from "next/dynamic";

// 动态导入客户端组件
const CommunityContent = dynamic(
  () => import("./ClientComponents").then(mod => mod.CommunityContent),
  { ssr: false }
);

const SidebarContent = dynamic(
  () => import("./ClientComponents").then(mod => mod.SidebarContent),
  { ssr: false }
);

export function CommunityContentWrapper({ locale }: { locale: string }) {
  return <CommunityContent locale={locale} />;
}

export function SidebarContentWrapper({ locale }: { locale: string }) {
  return <SidebarContent locale={locale} />;
}
