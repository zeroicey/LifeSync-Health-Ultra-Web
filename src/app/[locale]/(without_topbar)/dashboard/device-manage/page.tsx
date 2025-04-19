"use client";

import { DeviceCard } from "@/components/dashboard/device-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDevices } from "@/mock/healthData";
import { ConnectionStatus, Device, DeviceType } from "@/types/health";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Bluetooth, Plus, RefreshCw, Smartphone, Trash2, WifiIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function DeviceManagePage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [deviceFilter, setDeviceFilter] = useState<"all" | "connected" | "disconnected">("all");
  const [isScanning, setIsScanning] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 模拟扫描设备
  const handleScanDevices = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };
  
  // 根据过滤条件获取设备
  const getFilteredDevices = () => {
    if (deviceFilter === "all") {
      return mockDevices;
    } else if (deviceFilter === "connected") {
      return mockDevices.filter(device => device.connectionStatus === ConnectionStatus.CONNECTED);
    } else {
      return mockDevices.filter(device => device.connectionStatus !== ConnectionStatus.CONNECTED);
    }
  };
  
  const filteredDevices = getFilteredDevices();
  
  // 获取设备类型的本地化文本
  const getDeviceTypeText = (type: DeviceType) => {
    switch (type) {
      case DeviceType.SMART_WATCH:
        return t("deviceType.smartWatch");
      case DeviceType.FITNESS_TRACKER:
        return t("deviceType.fitnessTracker");
      case DeviceType.SMART_SCALE:
        return t("deviceType.smartScale");
      case DeviceType.BLOOD_PRESSURE_MONITOR:
        return t("deviceType.bloodPressureMonitor");
      case DeviceType.HEART_RATE_MONITOR:
        return t("deviceType.heartRateMonitor");
      case DeviceType.SLEEP_TRACKER:
        return t("deviceType.sleepTracker");
      case DeviceType.OTHER:
        return t("deviceType.other");
      default:
        return type;
    }
  };
  
  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">{t("deviceManagement")}</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={handleScanDevices} disabled={isScanning}>
            {isScanning ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                {t("scanning")}
              </>
            ) : (
              <>
                <Bluetooth className="mr-2 h-4 w-4" />
                {t("scanDevices")}
              </>
            )}
          </Button>
          <Button size="sm" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            {t("addDevice")}
          </Button>
        </div>
      </div>
      
      {/* 设备过滤器 */}
      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setDeviceFilter(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">{t("allDevices")}</TabsTrigger>
          <TabsTrigger value="connected">{t("connectedDevices")}</TabsTrigger>
          <TabsTrigger value="disconnected">{t("disconnectedDevices")}</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* 设备列表 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDevices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
        
        {/* 添加设备卡片 */}
        <Card className="border-dashed">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <CardTitle className="text-base font-medium">{t("addNewDevice")}</CardTitle>
            <CardDescription>{t("addDeviceDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button variant="outline" size="lg" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              {t("connectDevice")}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* 设备详情 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("deviceDetails")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b px-4 py-2 font-medium">
              <div>{t("deviceName")}</div>
              <div>{t("deviceType")}</div>
              <div>{t("brand")}</div>
              <div>{t("status")}</div>
              <div>{t("lastSync")}</div>
            </div>
            <div className="divide-y">
              {filteredDevices.map((device) => (
                <div key={device.id} className="grid grid-cols-5 px-4 py-3">
                  <div>{device.name}</div>
                  <div>{getDeviceTypeText(device.type)}</div>
                  <div>{device.brand}</div>
                  <div>
                    <span className={
                      device.connectionStatus === ConnectionStatus.CONNECTED ? "text-green-500" :
                      device.connectionStatus === ConnectionStatus.DISCONNECTED ? "text-gray-500" :
                      device.connectionStatus === ConnectionStatus.PAIRING ? "text-blue-500" :
                      "text-red-500"
                    }>
                      {t(`connectionStatus.${device.connectionStatus}`)}
                    </span>
                  </div>
                  <div>{format(new Date(device.lastSyncTime), 'yyyy-MM-dd HH:mm', { locale: zhCN })}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 连接指南 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("connectionGuide")}</CardTitle>
          <CardDescription>{t("connectionGuideDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bluetooth className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{t("bluetoothConnection")}</h3>
                <p className="text-sm text-muted-foreground">{t("bluetoothConnectionDescription")}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <WifiIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{t("wifiConnection")}</h3>
                <p className="text-sm text-muted-foreground">{t("wifiConnectionDescription")}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{t("appConnection")}</h3>
                <p className="text-sm text-muted-foreground">{t("appConnectionDescription")}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {t("viewFullGuide")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
