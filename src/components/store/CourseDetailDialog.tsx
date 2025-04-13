"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Course } from "@/types/store";
import { useStoreStore } from "@/stores/store.store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Clock, Award, Calendar, User, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/toast";

interface CourseDetailDialogProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (course: Course) => void;
}

export function CourseDetailDialog({ 
  course, 
  open, 
  onOpenChange, 
  onPurchase 
}: CourseDetailDialogProps) {
  const t = useTranslations("Store");
  const { userPoints, purchasedCourses } = useStoreStore();
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  const isAlreadyPurchased = purchasedCourses.includes(course.id);
  const hasEnoughPoints = userPoints.total >= course.points;
  
  const handlePurchase = async () => {
    if (isAlreadyPurchased) {
      // 如果已购买，直接打开课程
      // 这里可以添加导航到课程内容的逻辑
      toast.info(t("notifications.alreadyPurchased"));
      return;
    }
    
    if (!hasEnoughPoints) {
      toast.error(t("notifications.insufficientPoints"));
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      onPurchase(course);
      onOpenChange(false);
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(t("notifications.purchaseError"));
    } finally {
      setIsPurchasing(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{course.title}</DialogTitle>
        </DialogHeader>
        
        <div className="relative h-64 w-full mt-4">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-primary mr-2" />
            <span>
              <strong>{course.points}</strong> {t("points")}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <span>
              <strong>{course.duration}</strong> {t("minutes")}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-primary mr-2" />
            <span>
              <strong>{new Date(course.releaseDate).toLocaleDateString()}</strong>
            </span>
          </div>
          <div className="flex items-center">
            <User className="h-5 w-5 text-primary mr-2" />
            <span>
              <strong>{course.instructor}</strong>
            </span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="font-semibold text-lg mb-2">{t("courseDescription")}</h3>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">{t("whatYouWillLearn")}</h3>
          <ul className="space-y-2">
            {course.learningPoints.map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-primary/10">
            {t(`categories.${course.category}`)}
          </Badge>
          {course.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <DialogFooter className="mt-6">
          <div className="flex items-center text-sm text-muted-foreground mr-auto">
            {hasEnoughPoints ? (
              <span className="text-green-600">
                {t("youHaveEnoughPoints", { current: userPoints.total, required: course.points })}
              </span>
            ) : (
              <span className="text-red-600">
                {t("youNeedMorePoints", { current: userPoints.total, required: course.points, needed: course.points - userPoints.total })}
              </span>
            )}
          </div>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {t("close")}
          </Button>
          <Button 
            onClick={handlePurchase}
            disabled={(!hasEnoughPoints && !isAlreadyPurchased) || isPurchasing}
          >
            {isAlreadyPurchased 
              ? t("viewCourse") 
              : isPurchasing 
                ? t("purchasing") 
                : t("purchase")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
