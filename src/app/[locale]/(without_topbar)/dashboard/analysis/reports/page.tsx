"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockHealthReports } from "@/mock/healthData";
import { HealthDataType, HealthInsight, HealthReport, TrendType } from "@/types/health";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArrowRight, Calendar, Download, FileText, Printer, Share2, TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ReportsPage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [selectedReport, setSelectedReport] = useState<HealthReport | null>(null);
  
  useEffect(() => {
    setMounted(true);
    
    // 默认选择第一个报告
    if (mockHealthReports.length > 0) {
      setSelectedReport(mockHealthReports[0]);
    }
  }, []);
  
  // 获取趋势图标
  const getTrendIcon = (trend: TrendType) => {
    switch (trend) {
      case TrendType.IMPROVING:
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case TrendType.DECLINING:
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  // 获取趋势文本样式
  const getTrendStyle = (trend: TrendType) => {
    switch (trend) {
      case TrendType.IMPROVING:
        return "text-green-500";
      case TrendType.DECLINING:
        return "text-red-500";
      case TrendType.STABLE:
        return "text-blue-500";
      case TrendType.FLUCTUATING:
        return "text-amber-500";
      default:
        return "text-gray-500";
    }
  };
  
  // 获取健康数据类型的本地化文本
  const getDataTypeText = (dataType: HealthDataType) => {
    switch (dataType) {
      case HealthDataType.HEART_RATE:
        return t("heartRate");
      case HealthDataType.BLOOD_PRESSURE:
        return t("bloodPressure");
      case HealthDataType.SLEEP:
        return t("sleep");
      case HealthDataType.WEIGHT:
        return t("weight");
      case HealthDataType.STEPS:
        return t("steps");
      case HealthDataType.CALORIES:
        return t("calories");
      case HealthDataType.WATER:
        return t("water");
      case HealthDataType.MOOD:
        return t("mood");
      default:
        return dataType;
    }
  };
  
  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">{t("healthReports")}</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {t("selectDate")}
          </Button>
          <Button size="sm" variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            {t("print")}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t("export")}
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            {t("share")}
          </Button>
        </div>
      </div>
      
      {/* 报告选择 */}
      <Tabs 
        defaultValue={mockHealthReports[0]?.id} 
        className="w-full"
        onValueChange={(value) => {
          const report = mockHealthReports.find(r => r.id === value);
          if (report) {
            setSelectedReport(report);
          }
        }}
      >
        <TabsList className="mb-4">
          {mockHealthReports.map((report) => (
            <TabsTrigger key={report.id} value={report.id}>
              {report.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {mockHealthReports.map((report) => (
          <TabsContent key={report.id} value={report.id} className="mt-0 space-y-6">
            {/* 报告头部 */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription>
                      {t("generatedOn")}: {format(new Date(report.createdAt), 'yyyy-MM-dd HH:mm', { locale: zhCN })}
                    </CardDescription>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{t(`period.${report.period}`)}</span>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {report.dataTypes.map((dataType) => (
                    <span 
                      key={dataType} 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {getDataTypeText(dataType)}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* 报告洞察 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {report.insights.map((insight: HealthInsight, index: number) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-medium">{insight.title}</CardTitle>
                      {getTrendIcon(insight.trend)}
                    </div>
                    <CardDescription>
                      {getDataTypeText(insight.dataType)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    <div className="flex items-center">
                      <span className={cn("text-xs font-medium", getTrendStyle(insight.trend))}>
                        {t(`trend.${insight.trend}`)}
                      </span>
                      {insight.comparisonValue && insight.comparisonPeriod && (
                        <span className="text-xs text-muted-foreground ml-2">
                          vs {insight.comparisonValue} ({t(`period.${insight.comparisonPeriod}`)})
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* 报告建议 */}
            <Card>
              <CardHeader>
                <CardTitle>{t("recommendations")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 flex h-2 w-2 rounded-full bg-primary"></span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {t("generateDetailedPlan")}
                </Button>
              </CardFooter>
            </Card>
            
            {/* 数据摘要 */}
            <Card>
              <CardHeader>
                <CardTitle>{t("dataSummary")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {report.dataTypes.includes(HealthDataType.HEART_RATE) && (
                    <StatsCard
                      title={t("heartRate")}
                      value="72 bpm"
                      description={t("avgHeartRate")}
                      icon={TrendingUp}
                      trend="neutral"
                      trendValue="0.5%"
                    />
                  )}
                  {report.dataTypes.includes(HealthDataType.SLEEP) && (
                    <StatsCard
                      title={t("sleep")}
                      value="7.2 小时"
                      description={t("avgSleep")}
                      icon={TrendingUp}
                      trend="up"
                      trendValue="7.5%"
                    />
                  )}
                  {report.dataTypes.includes(HealthDataType.STEPS) && (
                    <StatsCard
                      title={t("steps")}
                      value="7,500 步"
                      description={t("avgSteps")}
                      icon={TrendingDown}
                      trend="down"
                      trendValue="6.3%"
                    />
                  )}
                  {report.dataTypes.includes(HealthDataType.WEIGHT) && (
                    <StatsCard
                      title={t("weight")}
                      value="70.8 kg"
                      description={t("avgWeight")}
                      icon={TrendingDown}
                      trend="up"
                      trendValue="1.0%"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* 历史报告 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("reportHistory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 border-b px-4 py-2 font-medium">
              <div>{t("reportTitle")}</div>
              <div>{t("period")}</div>
              <div>{t("date")}</div>
              <div>{t("actions")}</div>
            </div>
            <div className="divide-y">
              {mockHealthReports.map((report) => (
                <div key={report.id} className="grid grid-cols-4 px-4 py-3">
                  <div>{report.title}</div>
                  <div>{t(`period.${report.period}`)}</div>
                  <div>{format(new Date(report.createdAt), 'yyyy-MM-dd', { locale: zhCN })}</div>
                  <div>
                    <Button variant="ghost" size="sm">
                      {t("view")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 工具函数
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
