"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface PointsCardProps {
  points: number;
  isLoading: boolean;
}

export function PointsCard({ points, isLoading }: PointsCardProps) {
  const t = useTranslations("Store");
  const [isHovered, setIsHovered] = useState(false);
  
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  // 动画变体
  const coinVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 360, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  
  const numberVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t("yourPoints")}</h3>
            <motion.div
              animate={isHovered ? "hover" : "rest"}
              variants={coinVariants}
            >
              <Award className="h-5 w-5 text-primary" />
            </motion.div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-900/20 rounded-lg p-4 mb-3">
            <div className="flex items-center">
              <motion.div 
                className="bg-amber-500/90 dark:bg-amber-600 p-3 rounded-full mr-3"
                animate={isHovered ? "hover" : "rest"}
                variants={coinVariants}
              >
                <Coins className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <div className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                  {t("totalPoints")}
                </div>
                <motion.div 
                  className="text-3xl font-bold text-amber-900 dark:text-amber-200"
                  animate={isHovered ? "hover" : "rest"}
                  variants={numberVariants}
                >
                  {points.toLocaleString()}
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 mb-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{t("earnMorePoints")}</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {t("pointsDescription")}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
