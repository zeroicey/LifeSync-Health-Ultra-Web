"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaSection() {
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
            <Sparkles className="inline-block h-4 w-4 mr-1" /> 开启健康之旅
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            开启您的全维健康之旅
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            加入我们，体验身心协同健康管理的全新方式，让健康管理变得简单而有效。
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-opacity-90 shadow-lg shadow-white/20"
            >
              立即注册 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
