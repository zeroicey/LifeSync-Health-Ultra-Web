"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useStoreStore } from "@/stores/store.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Calendar, Clock, Info } from "lucide-react";

export function PointsHistory() {
  const t = useTranslations("Store");
  const { userPoints, fetchUserPoints } = useStoreStore();
  
  useEffect(() => {
    fetchUserPoints();
  }, [fetchUserPoints]);
  
  // 获取积分原因对应的文本和颜色
  const getReasonInfo = (reason: string) => {
    switch (reason) {
      case 'post_creation':
        return {
          text: t("pointReasons.postCreation"),
          color: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
          icon: <ArrowUpRight className="h-4 w-4" />
        };
      case 'comment':
        return {
          text: t("pointReasons.comment"),
          color: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
          icon: <ArrowUpRight className="h-4 w-4" />
        };
      case 'daily_check_in':
        return {
          text: t("pointReasons.dailyCheckIn"),
          color: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
          icon: <ArrowUpRight className="h-4 w-4" />
        };
      case 'health_data_sync':
        return {
          text: t("pointReasons.healthDataSync"),
          color: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
          icon: <ArrowUpRight className="h-4 w-4" />
        };
      case 'challenge_completion':
        return {
          text: t("pointReasons.challengeCompletion"),
          color: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
          icon: <ArrowUpRight className="h-4 w-4" />
        };
      case 'course_purchase':
        return {
          text: t("pointReasons.coursePurchase"),
          color: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
          icon: <ArrowDownRight className="h-4 w-4" />
        };
      default:
        return {
          text: t("pointReasons.other"),
          color: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
          icon: <Info className="h-4 w-4" />
        };
    }
  };
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // 格式化时间
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="space-y-6 relative">
      {/* 背景装饰元素 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-indigo-300/10 rounded-full blur-3xl dark:from-purple-900/20 dark:to-indigo-900/10 -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-300/20 to-blue-300/10 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-blue-900/10 -z-10"></div>
      
      <Card className="border-[1.5px] border-indigo-100 dark:border-indigo-900/60 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 pb-4">
          <CardTitle className="flex justify-between items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              {t("pointsHistory")}
            </span>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 text-sm font-medium rounded-full">
              {t("totalPoints")}: {userPoints.total}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-indigo-100 dark:divide-indigo-900/30">
            {userPoints.history.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                {t("noPointsHistory")}
              </div>
            ) : (
              userPoints.history.map((item, index) => {
                const { text, color, icon } = getReasonInfo(item.reason);
                const isPositive = item.amount > 0;
                
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
                          {icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{text}</p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatDate(item.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{formatTime(item.date)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {isPositive ? '+' : ''}{item.amount}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
