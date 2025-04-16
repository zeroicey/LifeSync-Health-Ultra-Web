"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  icon,
  actions,
}: PageHeaderProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          {icon && (
            <div className="p-2 bg-indigo-100 dark:bg-indigo-950 rounded-lg">
              <div className="h-6 w-6 text-indigo-600 dark:text-indigo-400">
                {icon}
              </div>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </motion.div>
        
        {actions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </div>
  );
}
