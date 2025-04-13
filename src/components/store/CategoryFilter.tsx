"use client";
import { useTranslations } from "next-intl";
import { CourseCategory } from "@/types/store";
import { Button } from "@/components/ui/button";
import { 
  Flower2, 
  Dumbbell, 
  Apple, 
  Brain, 
  Moon, 
  Leaf, 
  Heart,
  LayoutGrid
} from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: CourseCategory | "all";
  onSelectCategory: (category: CourseCategory | "all") => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const t = useTranslations("Store");
  
  const categories: { id: CourseCategory | "all"; icon: React.ReactNode }[] = [
    { id: "all", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "yoga", icon: <Flower2 className="h-4 w-4" /> },
    { id: "fitness", icon: <Dumbbell className="h-4 w-4" /> },
    { id: "nutrition", icon: <Apple className="h-4 w-4" /> },
    { id: "meditation", icon: <Brain className="h-4 w-4" /> },
    { id: "mental_health", icon: <Heart className="h-4 w-4" /> },
    { id: "sleep", icon: <Moon className="h-4 w-4" /> },
    { id: "traditional_medicine", icon: <Leaf className="h-4 w-4" /> }
  ];
  
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-3">{t("categories.title")}</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              selectedCategory === category.id 
                ? "" 
                : "hover:bg-muted"
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            {category.id === "all" 
              ? t("categories.all") 
              : t(`categories.${category.id}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}
