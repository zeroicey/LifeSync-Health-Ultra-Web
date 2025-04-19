"use client";

import { HealthChart } from "@/components/dashboard/health-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAverage, calculateTrend, formatHealthValue, getLatestHealthData, getTrendType } from "@/lib/health-utils";
import { mockBloodPressureData } from "@/mock/healthData";
import { BloodPressureData, HealthDataType } from "@/types/health";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Activity, Calendar, Download, Plus, Printer, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function BloodPressurePage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 获取数据
  const latestBP = getLatestHealthData(mockBloodPressureData) as BloodPressureData;
  
  // 计算血压数据趋势
  const systolicAvg = calculateAverage(mockBloodPressureData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const systolicTrend = calculateTrend(mockBloodPressureData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const systolicTrendType = getTrendType(systolicTrend, HealthDataType.BLOOD_PRESSURE);
  
  // 计算舒张压平均值
  const diastolicAvg = mockBloodPressureData.reduce((sum, item) => {
    const bpItem = item as BloodPressureData;
    return sum + bpItem.diastolicPressure;
  }, 0) / mockBloodPressureData.length;
  
  // 计算脉压差平均值
  const pulsePressureAvg = mockBloodPressureData.reduce((sum, item) => {
    const bpItem = item as BloodPressureData;
    return sum + (item.value - bpItem.diastolicPressure);
  }, 0) / mockBloodPressureData.length;
  
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
    
    return mockBloodPressureData.filter(data => new Date(data.timestamp) >= cutoffDate);
  };
  
  const displayData = getDataByTimeRange();
  
  // 获取血压分类
  const getBPCategory = (systolic: number, diastolic: number): string => {
    if (systolic < 120 && diastolic < 80) {
      return "正常";
    } else if ((systolic >= 120 && systolic <= 129) && diastolic < 80) {
      return "血压偏高";
    } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
      return "高血压前期";
    } else if ((systolic >= 140 && systolic <= 159) || (diastolic >= 90 && diastolic <= 99)) {
      return "高血压一级";
    } else if (systolic >= 160 || diastolic >= 100) {
      return "高血压二级";
    } else {
      return "未知";
    }
  };
  
  // 获取血压分类的颜色
  const getBPCategoryColor = (category: string): string => {
    switch (category) {
      case "正常":
        return "text-green-500";
      case "血压偏高":
        return "text-yellow-500";
      case "高血压前期":
        return "text-amber-500";
      case "高血压一级":
        return "text-orange-500";
      case "高血压二级":
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
        <h1 className="text-2xl font-bold tracking-tight">{t("bloodPressure")}</h1>
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
      
      {/* 血压数据摘要 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("currentBloodPressure")}
          value={latestBP ? `${Math.round(latestBP.value)}/${Math.round(latestBP.diastolicPressure)} mmHg` : "-"}
          description={latestBP ? format(new Date(latestBP.timestamp), 'yyyy-MM-dd HH:mm', { locale: zhCN }) : ""}
          icon={Activity}
        />
        <StatsCard
          title={t("avgSystolic")}
          value={`${Math.round(systolicAvg)} mmHg`}
          description={t("avgOverTime", { time: t(`timeRange.${timeRange}`) })}
          icon={Activity}
          trend={systolicTrendType}
          trendValue={`${Math.abs(systolicTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("avgDiastolic")}
          value={`${Math.round(diastolicAvg)} mmHg`}
          description={t("avgOverTime", { time: t(`timeRange.${timeRange}`) })}
          icon={Activity}
        />
        <StatsCard
          title={t("pulsePressure")}
          value={`${Math.round(pulsePressureAvg)} mmHg`}
          description={t("pulsePressureDescription")}
          icon={Activity}
        />
      </div>
      
      {/* 血压数据图表 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{t("bloodPressureTrend")}</CardTitle>
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
                  valueLabel={t("systolic")}
                  color="#ef4444"
                  unit="mmHg"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="month" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("systolic")}
                  color="#ef4444"
                  unit="mmHg"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="year" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("systolic")}
                  color="#ef4444"
                  unit="mmHg"
                  className="h-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* 血压数据记录 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("bloodPressureRecords")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b px-4 py-2 font-medium">
              <div>{t("date")}</div>
              <div>{t("time")}</div>
              <div>{t("systolicDiastolic")}</div>
              <div>{t("category")}</div>
              <div>{t("notes")}</div>
            </div>
            <div className="divide-y">
              {displayData.slice(-10).reverse().map((data) => {
                const bpItem = data as BloodPressureData;
                const category = getBPCategory(bpItem.value, bpItem.diastolicPressure);
                
                return (
                  <div key={data.id} className="grid grid-cols-5 px-4 py-3">
                    <div>{format(new Date(data.timestamp), 'yyyy-MM-dd', { locale: zhCN })}</div>
                    <div>{format(new Date(data.timestamp), 'HH:mm', { locale: zhCN })}</div>
                    <div>{Math.round(bpItem.value)}/{Math.round(bpItem.diastolicPressure)} mmHg</div>
                    <div className={getBPCategoryColor(category)}>
                      {category}
                    </div>
                    <div className="text-muted-foreground">{data.notes || "-"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 血压指南 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("bloodPressureGuide")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">{t("bloodPressureCategories")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-500 font-medium">正常</span>
                  <span>&lt; 120/80 mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500 font-medium">血压偏高</span>
                  <span>120-129/&lt; 80 mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-500 font-medium">高血压前期</span>
                  <span>130-139/80-89 mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-500 font-medium">高血压一级</span>
                  <span>140-159/90-99 mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500 font-medium">高血压二级</span>
                  <span>≥ 160/100 mmHg</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">{t("measurementTips")}</h3>
              <ul className="space-y-1 text-sm list-disc pl-5">
                <li>{t("measurementTip1")}</li>
                <li>{t("measurementTip2")}</li>
                <li>{t("measurementTip3")}</li>
                <li>{t("measurementTip4")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
