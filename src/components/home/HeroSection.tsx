"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface HeroSectionProps {
  scrollYProgress: any;
}

export default function HeroSection({ scrollYProgress }: HeroSectionProps) {
  const t = useTranslations("HomePage");
  const splitTextVariants = (text: string): string[] => text.split("%");
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 打字机效果相关状态
  const [typingText, setTypingText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // 用于存储装饰元素的状态
  const [decorativeLines, setDecorativeLines] = useState<
    Array<{ width: string; left: string; top: string }>
  >([]);
  const [decorativeDots, setDecorativeDots] = useState<
    Array<{
      width: string;
      height: string;
      left: string;
      top: string;
      opacity: number;
    }>
  >([]);

  // 初始化装饰元素
  useEffect(() => {
    // 生成线条
    const lines = Array.from({ length: 5 }).map((_, i) => ({
      width: `${Math.random() * 30 + 20}%`,
      left: `${Math.random() * 70}%`,
      top: `${(i + 1) * 15}%`,
    }));

    // 生成圆点
    const dots = Array.from({ length: 15 }).map(() => ({
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    setDecorativeLines(lines);
    setDecorativeDots(dots);
  }, []);

  // 多个不同的文本内容
  const textVariants = splitTextVariants(t("typeText"));

  useEffect(() => {
    const handleTyping = () => {
      const currentText = textVariants[currentTextIndex];
      const isComplete = !isDeleting && typingText === currentText;
      const isDeletingComplete = isDeleting && typingText === "";

      // 设置打字速度
      if (isComplete) {
        // 完成打字后暂停
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeletingComplete) {
        // 完成删除后切换到下一个文本
        setIsDeleting(false);
        setCurrentTextIndex((currentTextIndex + 1) % textVariants.length);
        setTypingSpeed(80);
      } else {
        // 正常打字或删除的速度
        setTypingSpeed(isDeleting ? 30 : 80);
      }

      // 更新文本
      if (isDeleting) {
        setTypingText(currentText.substring(0, typingText.length - 1));
      } else {
        setTypingText(currentText.substring(0, typingText.length + 1));
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, currentTextIndex, isDeleting, typingSpeed, textVariants]);

  // 滚动到特性部分的函数
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* 渐变背景 - 动态变化的蓝色调，降低亮度 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400/80 via-purple-300/80 to-cyan-300/80 z-0"
        style={{ y: backgroundY }}
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(96, 165, 250, 0.8), rgba(167, 139, 250, 0.8), rgba(103, 232, 249, 0.8))", // 更柔和的蓝色、紫色、青色
            "linear-gradient(to bottom right, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8), rgba(34, 211, 238, 0.8))", // 中等亮度的蓝色、紫色、青色
            "linear-gradient(to bottom right, rgba(37, 99, 235, 0.8), rgba(124, 58, 237, 0.8), rgba(6, 182, 212, 0.8))", // 较深的蓝色、紫色、青色
            "linear-gradient(to bottom right, rgba(30, 64, 175, 0.8), rgba(109, 40, 217, 0.8), rgba(8, 145, 178, 0.8))", // 深蓝色、深紫色、深青色
            "linear-gradient(to bottom right, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8), rgba(34, 211, 238, 0.8))", // 中等亮度的蓝色、紫色、青色
            "linear-gradient(to bottom right, rgba(96, 165, 250, 0.8), rgba(167, 139, 250, 0.8), rgba(103, 232, 249, 0.8))", // 更柔和的蓝色、紫色、青色
          ],
        }}
        transition={{
          background: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* 新风格的背景元素 - 使用对比度更高的颜色球体，固定移动范围 */}
        <div className="absolute inset-0 opacity-60">
          {/* 大型对比色球体 - 位置分散，增加移动范围 */}
          <motion.div
            className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-gradient-to-r from-amber-400/70 to-orange-500/70 blur-xl"
            animate={{
              x: [-60, 60, -60],
              y: [-60, 60, -60],
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.div
            className="absolute top-[15%] right-[15%] w-64 h-64 rounded-full bg-gradient-to-r from-emerald-400/70 to-teal-500/70 blur-xl"
            animate={{
              x: [80, -80, 80],
              y: [40, -40, 40],
              scale: [0.9, 1, 0.9],
            }}
            transition={{
              x: {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.div
            className="absolute bottom-[15%] right-[20%] w-80 h-80 rounded-full bg-gradient-to-r from-pink-400/70 to-rose-500/70 blur-xl"
            animate={{
              x: [-70, 70, -70],
              y: [50, -50, 50],
              scale: [1, 0.9, 1],
            }}
            transition={{
              x: {
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.div
            className="absolute bottom-[20%] left-[15%] w-56 h-56 rounded-full bg-gradient-to-r from-purple-400/70 to-violet-500/70 blur-xl"
            animate={{
              x: [60, -60, 60],
              y: [-55, 55, -55],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              x: {
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          {/* 几何线条元素 - 使用客户端状态 */}
          {decorativeLines.length > 0 && (
            <div className="absolute inset-0 overflow-hidden">
              {decorativeLines.map((line, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="absolute h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{
                    width: line.width,
                    left: line.left,
                    top: line.top,
                    opacity: 0.3,
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0.1, 0.4, 0.1],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 2,
                  }}
                />
              ))}
            </div>
          )}

          {/* 浮动圆点 - 使用客户端状态 */}
          {decorativeDots.length > 0 && (
            <div className="absolute inset-0 overflow-hidden">
              {decorativeDots.map((dot, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute rounded-full bg-white/50"
                  style={{
                    width: dot.width,
                    height: dot.height,
                    left: dot.left,
                    top: dot.top,
                    opacity: dot.opacity,
                  }}
                  animate={{
                    y: [0, -100],
                    x: [0, Math.random() * 50 - 25],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 12,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* 主要内容 */}
      <motion.div
        className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent mb-6 select-none"
            animate={{
              backgroundImage: [
                "linear-gradient(to right, rgba(96, 165, 250, 1), rgba(167, 139, 250, 1), rgba(103, 232, 249, 1))",
                "linear-gradient(to right, rgba(59, 130, 246, 1), rgba(139, 92, 246, 1), rgba(34, 211, 238, 1))",
                "linear-gradient(to right, rgba(37, 99, 235, 1), rgba(124, 58, 237, 1), rgba(6, 182, 212, 1))",
                "linear-gradient(to right, rgba(30, 64, 175, 1), rgba(109, 40, 217, 1), rgba(8, 145, 178, 1))",
                "linear-gradient(to right, rgba(59, 130, 246, 1), rgba(139, 92, 246, 1), rgba(34, 211, 238, 1))",
                "linear-gradient(to right, rgba(96, 165, 250, 1), rgba(167, 139, 250, 1), rgba(103, 232, 249, 1))",
              ],
            }}
            transition={{
              backgroundImage: {
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {t("title")}
          </motion.h1>

          {/* 打字机效果的文本 */}
          <div className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md h-24 flex items-center justify-center select-none">
            <p>
              {typingText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* 四个服务框框 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-md md:max-w-4xl mx-auto px-2 sm:px-0"
          >
            {[
              { icon: "📊", title: t("services.dataTracking") },
              { icon: "🧠", title: t("services.mentalHealth") },
              { icon: "👥", title: t("services.communitySupport") },
              { icon: "🛡️", title: t("services.dataProtection") },
            ].map((item, index) => (
              <motion.div
                key={`service-${index}`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl py-2 md:py-3 px-3 md:px-4 flex flex-row items-center justify-start text-white shadow-lg border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="text-xl md:text-2xl mr-2 md:mr-3">
                  {item.icon}
                </div>
                <div className="text-xs md:text-sm font-medium">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 justify-center select-none max-w-md md:max-w-none mx-auto w-full px-2 md:px-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Link href="/community">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 w-full shadow-lg shadow-blue-500/20"
                >
                  {t("beginNow")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 border-white hover:bg-white/90 w-full"
                onClick={scrollToFeatures}
              >
                {t("viewMore")}
              </Button>
            </motion.div>

            {/* 移动端按钮 */}
            <Link href="/community" className="md:hidden w-full">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 w-full shadow-lg shadow-blue-500/20"
              >
                {t("beginNow")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 border-white hover:bg-white/90 w-full md:hidden"
              onClick={scrollToFeatures}
            >
              {t("viewMore")}
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row gap-6 sm:gap-12 md:gap-24 mb-4 md:mb-8 text-center"
        >
          {[
            { number: "5000+", label: t("stats.dailyUsers") },
            { number: "4.8", label: t("stats.userRating") },
            { number: "3+", label: t("stats.aiIterations") },
          ].map((stat, index) => (
            <motion.div
              key={`stat-${index}`}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-0.5 md:mb-1">
                {stat.number}
              </div>
              <div className="text-2xs sm:text-xs md:text-sm text-white/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* <p className="mb-2 text-sm select-none">{t("scrollDown")}</p> */}
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
