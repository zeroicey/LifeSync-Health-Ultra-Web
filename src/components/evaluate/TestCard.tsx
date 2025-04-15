"use client";

import { EvaluationTest } from "@/types/evaluate";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface TestCardProps {
  test: EvaluationTest;
  locale: string;
}

export function TestCard({ test, locale }: TestCardProps) {
  const t = useTranslations("Evaluate");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={test.imageUrl}
            alt={test.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none text-white mb-2"
            >
              {t(`categories.${test.category}`)}
            </Badge>
            <h3 className="text-xl font-bold text-white truncate">{test.title}</h3>
          </div>
        </div>
        
        <CardContent className="flex-1 p-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {test.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-400" />
              {test.duration} {t("minutes")}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Tag className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-400" />
              {test.questionCount} {t("questions")}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Users className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-400" />
              {test.popularity}% {t("popularity")}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            asChild
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Link href={`/evaluate/${test.id}`}>
              {t("startTest")}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
