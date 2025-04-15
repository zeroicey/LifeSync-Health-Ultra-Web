"use client";

import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { motion } from "framer-motion";

export default function SidebarClient({ locale }: { locale: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <CommunitySidebar locale={locale} />
    </motion.div>
  );
}
