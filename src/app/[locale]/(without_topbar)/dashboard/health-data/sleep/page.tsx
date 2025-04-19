"use client";

import { HealthChart } from "@/components/dashboard/health-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAverage, calculateTrend, formatHealthValue, getLatestHealthData, getTrendType } from "@/lib/health-utils";
import { mockSleepData } from "@/mock/healthData";
import { HealthDataType, SleepData, SleepQuality } from "@/types/health";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar, Clock, Download, Moon, Plus, Printer, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function SleepPage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 获取数据
  const latestSleep = getLatestHealthData(mockSleepData) as SleepData;
  
  // 计算睡眠数据趋势
  const sleepAvg = calculateAverage(mockSleepData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const sleepTrend = calculateTrend(mockSleepData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const sleepTrendType = getTrendType(sleepTrend, HealthDataType.SLEEP);
  
  // 计算深度睡眠平均时长
  const deepSleepAvg = mockSleepData.reduce((sum, item) => {
    const sleepItem = item as SleepData;
    return sum + sleepItem.deepSleepDuration;
  }, 0) / mockSleepData.length;
  
  // 计算睡眠质量分布
  const sleepQualityDistribution = mockSleepData.reduce((acc, item) => {
    const sleepItem = item as SleepData;
    acc[sleepItem.sleepQuality] = (acc[sleepItem.sleepQuality] || 0) + 1;
    return acc;
  }, {} as Record<SleepQuality, number>);
  
  // 获取最常见的睡眠质量
  let mostCommonQuality: SleepQuality = SleepQuality.FAIR;
  let maxCount = 0;
  
  Object.entries(sleepQualityDistribution).forEach(([quality, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommonQuality = quality as SleepQuality;
    }
  });
  
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
    
    return mockSleepData.filter(data => new Date(data.timestamp) >= cutoffDate);
  };
  
  const displayData = getDataByTimeRange();
  
  // 获取睡眠质量的本地化文本
  const getSleepQualityText = (quality: SleepQuality) => {
    switch (quality) {
      case SleepQuality.EXCELLENT:
        return t("sleepQuality.excellent");
      case SleepQuality.GOOD:
        return t("sleepQuality.good");
      case SleepQuality.FAIR:
        return t("sleepQuality.fair");
      case SleepQuality.POOR:
        return t("sleepQuality.poor");
      default:
        return quality;
    }
  };
  
  // 获取睡眠质量的颜色
  const getSleepQualityColor = (quality: SleepQuality) => {
    switch (quality) {
      case SleepQuality.EXCELLENT:
        return "text-green-500";
      case SleepQuality.GOOD:
        return "text-blue-500";
      case SleepQuality.FAIR:
        return "text-amber-500";
      case SleepQuality.POOR:
        return "text-red-500";
      default:
        return "";
    }
  };
  
  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">{t("sleepManagement")}</h1>
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
      
      {/* 睡眠数据摘要 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("lastSleepDuration")}
          value={latestSleep ? formatHealthValue(latestSleep.value, HealthDataType.SLEEP) : "-"}
          description={latestSleep ? format(new Date(latestSleep.timestamp), 'yyyy-MM-dd', { locale: zhCN }) : ""}
          icon={Moon}
        />
        <StatsCard
          title={t("avgSleepDuration")}
          value={formatHealthValue(sleepAvg, HealthDataType.SLEEP)}
          description={t("avgOverTime", { time: t(`timeRange.${timeRange}`) })}
          icon={Clock}
          trend={sleepTrendType}
          trendValue={`${Math.abs(sleepTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("avgDeepSleep")}
          value={`${deepSleepAvg.toFixed(1)} 小时`}
          description={t("deepSleepDescription")}
          icon={Moon}
        />
        <StatsCard
          title={t("commonSleepQuality")}
          value={getSleepQualityText(mostCommonQuality)}
          description={t("basedOnRecentData")}
          icon={Moon}
          className={getSleepQualityColor(mostCommonQuality)}
        />
      </div>
      
      {/* 睡眠数据图表 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{t("sleepTrend")}</CardTitle>
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
                  valueLabel={t("sleepDuration")}
                  color="#3b82f6"
                  unit="小时"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="month" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("sleepDuration")}
                  color="#3b82f6"
                  unit="小时"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="year" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("sleepDuration")}
                  color="#3b82f6"
                  unit="小时"
                  className="h-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* 睡眠数据记录 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("sleepRecords")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b px-4 py-2 font-medium">
              <div>{t("date")}</div>
              <div>{t("sleepDuration")}</div>
              <div>{t("deepSleep")}</div>
              <div>{t("sleepQuality")}</div>
              <div>{t("notes")}</div>
            </div>
            <div className="divide-y">
              {displayData.slice(-10).reverse().map((data) => {
                const sleepItem = data as SleepData;
                return (
                  <div key={data.id} className="grid grid-cols-5 px-4 py-3">
                    <div>{format(new Date(data.timestamp), 'yyyy-MM-dd', { locale: zhCN })}</div>
                    <div>{formatHealthValue(data.value, HealthDataType.SLEEP)}</div>
                    <div>{sleepItem.deepSleepDuration.toFixed(1)} 小时</div>
                    <div className={getSleepQualityColor(sleepItem.sleepQuality)}>
                      {getSleepQualityText(sleepItem.sleepQuality)}
                    </div>
                    <div className="text-muted-foreground">{data.notes || "-"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 睡眠阶段分布 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("sleepStages")}</CardTitle>
        </CardHeader>
        <CardContent>
          {latestSleep && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {format(new Date(latestSleep.timestamp), 'yyyy-MM-dd', { locale: zhCN })}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-700 mr-2"></div>
                    <span>{t("deepSleep")}</span>
                  </div>
                  <span>{latestSleep.deepSleepDuration.toFixed(1)} 小时</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-700 h-2.5 rounded-full" style={{ width: `${(latestSleep.deepSleepDuration / latestSleep.value) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <span>{t("lightSleep")}</span>
                  </div>
                  <span>{latestSleep.lightSleepDuration.toFixed(1)} 小时</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${(latestSleep.lightSleepDuration / latestSleep.value) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span>{t("remSleep")}</span>
                  </div>
                  <span>{latestSleep.remSleepDuration.toFixed(1)} 小时</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${(latestSleep.remSleepDuration / latestSleep.value) * 100}%` }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                    <span>{t("awake")}</span>
                  </div>
                  <span>{latestSleep.awakeDuration.toFixed(1)} 小时</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: `${(latestSleep.awakeDuration / latestSleep.value) * 100}%` }}></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
