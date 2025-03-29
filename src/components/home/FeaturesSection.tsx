"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Heart, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations("HomePage.features");
  
  const features = [
    {
      icon: <Activity className="h-10 w-10 text-blue-500" />,
      title: t("physicalHealth.title"),
      description: t("physicalHealth.description"),
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Brain className="h-10 w-10 text-indigo-500" />,
      title: t("mentalHealth.title"),
      description: t("mentalHealth.description"),
      gradient: "from-indigo-500 to-purple-400",
    },
    {
      icon: <Heart className="h-10 w-10 text-sky-500" />,
      title: t("emotionManagement.title"),
      description: t("emotionManagement.description"),
      gradient: "from-sky-500 to-blue-400",
    },
    {
      icon: <Shield className="h-10 w-10 text-cyan-500" />,
      title: t("healthRisk.title"),
      description: t("healthRisk.description"),
      gradient: "from-cyan-500 to-teal-400",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: t("aiAssistant.title"),
      description: t("aiAssistant.description"),
      gradient: "from-purple-500 to-indigo-400",
    },
    {
      icon: <Activity className="h-10 w-10 text-blue-500" />,
      title: t("multiDevice.title"),
      description: t("multiDevice.description"),
      gradient: "from-blue-500 to-cyan-400",
    },
  ];

  return (
    <section
      id="features-section"
      className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 flex justify-center"
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-300 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-blue-600 dark:text-blue-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group w-full max-w-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -m-1 p-1"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-blue-100 dark:border-gray-700">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full`}></div>
                
                <div className="mb-4">{feature.icon}</div>
                
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">{feature.title}</h3>
                
                <p className="text-blue-600 dark:text-blue-400">{feature.description}</p>
                
                <div className={`h-1 w-16 bg-gradient-to-r ${feature.gradient} rounded-full mt-6`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
