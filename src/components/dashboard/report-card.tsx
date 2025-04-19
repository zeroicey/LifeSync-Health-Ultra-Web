"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HealthInsight, HealthReport, ReportPeriod, TrendType } from "@/types/health";
import { format } from "date-fns";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReportCardProps {
  report: HealthReport;
  className?: string;
}

export function ReportCard({ report, className }: ReportCardProps) {
  const t = useTranslations("Dashboard");
  
  // 获取报告周期的本地化文本
  const getPeriodText = (period: ReportPeriod) => {
    switch (period) {
      case ReportPeriod.DAILY:
        return t("period.daily");
      case ReportPeriod.WEEKLY:
        return t("period.weekly");
      case ReportPeriod.MONTHLY:
        return t("period.monthly");
      case ReportPeriod.YEARLY:
        return t("period.yearly");
      case ReportPeriod.CUSTOM:
        return t("period.custom");
      default:
        return period;
    }
  };
  
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
  
  const createdDate = new Date(report.createdAt);
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{report.title}</CardTitle>
          <span className="text-xs text-muted-foreground">
            {getPeriodText(report.period)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {format(createdDate, 'yyyy-MM-dd')}
        </p>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-3">
          {report.insights.slice(0, 2).map((insight: HealthInsight, index: number) => (
            <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium">{insight.title}</h4>
                {getTrendIcon(insight.trend)}
              </div>
              <p className="text-xs text-muted-foreground mb-1">{insight.description}</p>
              <div className="flex items-center">
                <span className={cn("text-xs font-medium", getTrendStyle(insight.trend))}>
                  {t(`trend.${insight.trend}`)}
                </span>
                {insight.comparisonValue && insight.comparisonPeriod && (
                  <span className="text-xs text-muted-foreground ml-2">
                    vs {insight.comparisonValue} ({getPeriodText(insight.comparisonPeriod)})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button variant="ghost" size="sm" className="w-full justify-between">
          <span>{t("viewFullReport")}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
