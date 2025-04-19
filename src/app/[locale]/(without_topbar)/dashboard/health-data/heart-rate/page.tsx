"use client";

import { HealthChart } from "@/components/dashboard/health-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAverage, calculateTrend, formatHealthValue, getLatestHealthData, getTrendType } from "@/lib/health-utils";
import { mockHeartRateData } from "@/mock/healthData";
import { HealthDataType } from "@/types/health";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Activity, Calendar, Download, Heart, Plus, Printer, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function HeartRatePage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 获取数据
  const latestHeartRate = getLatestHealthData(mockHeartRateData);
  
  // 计算心率数据趋势
  const heartRateAvg = calculateAverage(mockHeartRateData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const heartRateTrend = calculateTrend(mockHeartRateData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const heartRateTrendType = getTrendType(heartRateTrend, HealthDataType.HEART_RATE);
  
  // 计算最大和最小值
  const sortedData = [...mockHeartRateData].sort((a, b) => a.value - b.value);
  const minHeartRate = sortedData[0];
  const maxHeartRate = sortedData[sortedData.length - 1];
  
  // 根据时间范围获取数据
  const getDataByTimeRange = () => {
    const now = new Date();
    let daysToShow = 7;
    
    if (timeRange === "month") {
      daysToShow = 30;
    } else if (timeRange === "year") {
      daysToShow = 365;
    }
    
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - daysToShow);
    
    return mockHeartRateData.filter(data => new Date(data.timestamp) >= cutoffDate);
  };
  
  const displayData = getDataByTimeRange();
  
  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">{t("heartRateManagement")}</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {t("selectDate")}
          </Button>
          <Button size="sm" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            {t("addData")}
          </Button>
        </div>
      </div>
      
      {/* 心率数据摘要 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("currentHeartRate")}
          value={latestHeartRate ? formatHealthValue(latestHeartRate.value, HealthDataType.HEART_RATE) : "-"}
          description={latestHeartRate ? format(new Date(latestHeartRate.timestamp), 'yyyy-MM-dd HH:mm', { locale: zhCN }) : ""}
          icon={Heart}
        />
        <StatsCard
          title={t("avgHeartRate")}
          value={formatHealthValue(heartRateAvg, HealthDataType.HEART_RATE)}
          description={t("avgOverTime", { time: t(`timeRange.${timeRange}`) })}
          icon={Activity}
          trend={heartRateTrendType}
          trendValue={`${Math.abs(heartRateTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("minHeartRate")}
          value={formatHealthValue(minHeartRate.value, HealthDataType.HEART_RATE)}
          description={format(new Date(minHeartRate.timestamp), 'yyyy-MM-dd', { locale: zhCN })}
          icon={Heart}
        />
        <StatsCard
          title={t("maxHeartRate")}
          value={formatHealthValue(maxHeartRate.value, HealthDataType.HEART_RATE)}
          description={format(new Date(maxHeartRate.timestamp), 'yyyy-MM-dd', { locale: zhCN })}
          icon={Heart}
        />
      </div>
      
      {/* 心率数据图表 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{t("heartRateTrend")}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                {t("print")}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                {t("export")}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                {t("share")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="week" className="w-full" onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList className="mb-4">
              <TabsTrigger value="week">{t("timeRange.week")}</TabsTrigger>
              <TabsTrigger value="month">{t("timeRange.month")}</TabsTrigger>
              <TabsTrigger value="year">{t("timeRange.year")}</TabsTrigger>
            </TabsList>
            <TabsContent value="week" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("heartRate")}
                  color="#ef4444"
                  unit="bpm"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="month" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("heartRate")}
                  color="#ef4444"
                  unit="bpm"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="year" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("heartRate")}
                  color="#ef4444"
                  unit="bpm"
                  className="h-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* 心率数据记录 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("heartRateRecords")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 border-b px-4 py-2 font-medium">
              <div>{t("date")}</div>
              <div>{t("time")}</div>
              <div>{t("heartRate")}</div>
              <div>{t("notes")}</div>
            </div>
            <div className="divide-y">
              {displayData.slice(-10).reverse().map((data) => (
                <div key={data.id} className="grid grid-cols-4 px-4 py-3">
                  <div>{format(new Date(data.timestamp), 'yyyy-MM-dd', { locale: zhCN })}</div>
                  <div>{format(new Date(data.timestamp), 'HH:mm', { locale: zhCN })}</div>
                  <div>{formatHealthValue(data.value, HealthDataType.HEART_RATE)}</div>
                  <div className="text-muted-foreground">{data.notes || "-"}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
