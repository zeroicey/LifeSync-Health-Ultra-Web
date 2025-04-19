"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ConnectionStatus, Device } from "@/types/health";
import { format } from "date-fns";
import { Battery, BatteryCharging, BatteryWarning, Smartphone, Watch } from "lucide-react";
import { useTranslations } from "next-intl";

interface DeviceCardProps {
  device: Device;
  className?: string;
}

export function DeviceCard({ device, className }: DeviceCardProps) {
  const t = useTranslations("Dashboard");
  
  // 获取设备图标
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'smart_watch':
        return Watch;
      default:
        return Smartphone;
    }
  };
  
  // 获取电池图标
  const getBatteryIcon = () => {
    if (!device.batteryLevel && device.batteryLevel !== 0) return null;
    
    if (device.batteryLevel <= 20) {
      return <BatteryWarning className="h-4 w-4 text-red-500" />;
    } else if (device.batteryLevel >= 90) {
      return <BatteryCharging className="h-4 w-4 text-green-500" />;
    } else {
      return <Battery className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  // 获取连接状态样式
  const getStatusStyle = () => {
    switch (device.connectionStatus) {
      case ConnectionStatus.CONNECTED:
        return "bg-green-500";
      case ConnectionStatus.DISCONNECTED:
        return "bg-gray-400";
      case ConnectionStatus.PAIRING:
        return "bg-blue-500 animate-pulse";
      case ConnectionStatus.ERROR:
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };
  
  const DeviceIcon = getDeviceIcon();
  const batteryIcon = getBatteryIcon();
  const lastSyncDate = new Date(device.lastSyncTime);
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className={cn("h-2 w-2 rounded-full", getStatusStyle())} />
          <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
        </div>
        <DeviceIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-muted-foreground">{t("brand")}</div>
          <div className="font-medium text-right">{device.brand}</div>
          
          <div className="text-muted-foreground">{t("model")}</div>
          <div className="font-medium text-right">{device.model}</div>
          
          <div className="text-muted-foreground">{t("status")}</div>
          <div className="font-medium text-right">
            {t(`connectionStatus.${device.connectionStatus}`)}
          </div>
          
          <div className="text-muted-foreground">{t("lastSync")}</div>
          <div className="font-medium text-right">
            {format(lastSyncDate, 'yyyy-MM-dd HH:mm')}
          </div>
          
          {device.batteryLevel !== undefined && (
            <>
              <div className="text-muted-foreground">{t("battery")}</div>
              <div className="font-medium text-right flex items-center justify-end">
                {device.batteryLevel}% {batteryIcon}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
