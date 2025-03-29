"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CtaSection() {
  const t = useTranslations("HomePage.cta");
  
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 text-white relative overflow-hidden flex justify-center">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto flex justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="inline-block h-4 w-4 mr-1" /> {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {t("description")}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-opacity-90 shadow-lg shadow-white/20"
              >
                {t("button")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
