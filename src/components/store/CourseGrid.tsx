"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Course } from "@/types/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStoreStore } from "@/stores/store.store";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Coins, Clock, User, Tag, CheckCircle } from "lucide-react";
import { CourseDetailDialog } from "./CourseDetailDialog";
import { motion } from "framer-motion";

interface CourseGridProps {
  courses: Course[];
  isLoading: boolean;
  locale: string;
}

export function CourseGrid({ courses, isLoading, locale }: CourseGridProps) {
  const t = useTranslations("Store");
  const { purchaseCourse, userPoints, purchasedCourses } = useStoreStore();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // 处理购买课程
  const handlePurchase = async (course: Course) => {
    // 检查是否已购买
    if (purchasedCourses.includes(course.id)) {
      toast.info(t("notifications.alreadyPurchased"));
      return;
    }
    
    // 检查积分是否足够
    if (userPoints.total < course.points) {
      toast.error(t("notifications.insufficientPoints"));
      return;
    }
    
    setPurchasingId(course.id);
    
    try {
      const success = await purchaseCourse(course.id);
      
      if (success) {
        toast.success(t("notifications.purchaseSuccess", { title: course.title }));
      } else {
        toast.error(t("notifications.purchaseError"));
      }
    } catch (error) {
      toast.error(t("notifications.purchaseError"));
      console.error("Purchase error:", error);
    } finally {
      setPurchasingId(null);
    }
  };
  
  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // 获取徽章变体类型
  const getBadgeVariant = (category: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (category) {
      case "yoga":
        return "default";
      case "fitness":
        return "destructive";
      case "nutrition":
        return "outline";
      default:
        return "secondary";
    }
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video relative">
              <Skeleton className="absolute inset-0" />
            </div>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="pt-2">
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (courses.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        <div className="py-10 flex flex-col items-center">
          <Tag className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-lg font-medium mb-2">{t("noCourses")}</p>
          <p className="text-sm text-muted-foreground">{t("tryDifferentCategory")}</p>
        </div>
      </Card>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const isPurchased = purchasedCourses.includes(course.id);
          const isPurchasing = purchasingId === course.id;
          const canPurchase = userPoints.total >= course.points;
          
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/10">
                <div className="relative aspect-video">
                  <Image 
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                  
                  {/* 课程标签 */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {course.new && (
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-none">
                        {t("new")}
                      </Badge>
                    )}
                    {course.popular && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
                        {t("popular")}
                      </Badge>
                    )}
                  </div>
                  
                  {/* 课程难度 */}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="outline" className="bg-black/50 text-white border-none backdrop-blur-sm">
                      {t(`levels.${course.level}`)}
                    </Badge>
                  </div>
                  
                  {/* 已购买标记 */}
                  {isPurchased && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center transform rotate-[-10deg] shadow-lg">
                        <CheckCircle className="h-5 w-5 mr-1.5" />
                        <span className="font-bold">{t("purchased")}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold line-clamp-2">{course.title}</h3>
                    <Badge 
                      variant={getBadgeVariant(course.category)}
                      className="capitalize shrink-0 ml-2"
                    >
                      {t(`categories.${course.category}`)}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>{course.instructor}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {course.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-3 border-t mt-auto">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-full">
                      <Coins className="h-4 w-4 mr-1.5 text-amber-600 dark:text-amber-400" />
                      <span className="font-bold">{course.points}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(course)}
                        className="transition-all duration-300 hover:bg-primary/10"
                      >
                        {t("viewDetails")}
                      </Button>
                      <Button
                        onClick={() => handlePurchase(course)}
                        disabled={isPurchased || isPurchasing || !canPurchase}
                        size="sm"
                        className={`transition-all duration-300 ${
                          isPurchased ? "bg-green-600 hover:bg-green-700" : ""
                        }`}
                      >
                        {isPurchased 
                          ? t("viewCourse") 
                          : isPurchasing 
                            ? t("purchasing") 
                            : t("purchaseCourse")}
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {selectedCourse && (
        <CourseDetailDialog
          course={selectedCourse}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onPurchase={handlePurchase}
        />
      )}
    </>
  );
}
