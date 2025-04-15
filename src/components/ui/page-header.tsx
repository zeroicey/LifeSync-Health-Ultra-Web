"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  gradient?: string;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  gradient = "from-blue-600 to-indigo-600", 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("py-12 px-4 text-center", className)}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 
          className={cn(
            "text-3xl md:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            gradient,
            "dark:from-opacity-80 dark:to-opacity-80 mb-4"
          )}
        >
          {title}
        </h1>
        
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
