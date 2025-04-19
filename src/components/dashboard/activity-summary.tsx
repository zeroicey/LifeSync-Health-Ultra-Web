"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HealthDataType } from "@/types/health";
import { format } from "date-fns";
import { Activity, Heart, Moon, Weight } from "lucide-react";
import { useTranslations } from "next-intl";

interface ActivityItem {
  id: string;
  type: "data_record" | "device_sync" | "achievement" | "reminder";
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
}

interface ActivitySummaryProps {
  activities: ActivityItem[];
  className?: string;
  showAll?: boolean;
}

export function ActivitySummary({ activities, className, showAll = false }: ActivitySummaryProps) {
  const t = useTranslations("Dashboard");
  
  // 获取活动图标
  const getActivityIcon = (activity: ActivityItem) => {
    if (activity.icon) return activity.icon;
    
    switch (activity.type) {
      case "data_record":
        if (activity.title.includes(t("heartRate"))) {
          return <Heart className="h-4 w-4 text-red-500" />;
        } else if (activity.title.includes(t("sleep"))) {
          return <Moon className="h-4 w-4 text-blue-500" />;
        } else if (activity.title.includes(t("weight"))) {
          return <Weight className="h-4 w-4 text-green-500" />;
        } else {
          return <Activity className="h-4 w-4 text-purple-500" />;
        }
      case "device_sync":
        return <Activity className="h-4 w-4 text-blue-500" />;
      case "achievement":
        return <Activity className="h-4 w-4 text-amber-500" />;
      case "reminder":
        return <Activity className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{t("recentActivity")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {(showAll ? activities : activities.slice(0, 5)).map((activity) => {
            const activityDate = new Date(activity.timestamp);
            
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 px-4 py-3 border-b last:border-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {getActivityIcon(activity)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <time className="text-xs text-muted-foreground">
                      {format(activityDate, 'HH:mm')}
                    </time>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
