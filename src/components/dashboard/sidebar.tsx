import { Activity, BarChart2, Calendar, Heart, Home, Inbox, LineChart, Smartphone, Search, Settings, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

export function AppSidebar() {
  const t = useTranslations("Dashboard");

  const sections: SidebarSection[] = [
    {
      label: t("overview"),
      items: [
        {
          title: t("summary"),
          url: "/dashboard",
          icon: Home,
        },
        {
          title: t("activity"),
          url: "/dashboard/activity",
          icon: Activity,
        },
      ],
    },
    {
      label: t("healthData"),
      items: [
        {
          title: t("heartRate"),
          url: "/dashboard/health-data/heart-rate",
          icon: Heart,
        },
        {
          title: t("sleep"),
          url: "/dashboard/health-data/sleep",
          icon: Calendar,
        },
        {
          title: t("bloodPressure"),
          url: "/dashboard/health-data/blood-pressure",
          icon: Activity,
        },
        {
          title: t("weight"),
          url: "/dashboard/health-data/weight",
          icon: LineChart,
        },
      ],
    },
    {
      label: t("analysis"),
      items: [
        {
          title: t("trends"),
          url: "/dashboard/analysis/trends",
          icon: BarChart2,
        },
        {
          title: t("reports"),
          url: "/dashboard/analysis/reports",
          icon: Zap,
        },
      ],
    },
    {
      label: t("devices"),
      items: [
        {
          title: t("deviceManagement"),
          url: "/dashboard/device-manage",
          icon: Smartphone,
        },
        {
          title: t("settings"),
          url: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
