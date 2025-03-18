"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Heart, Shield, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Activity className="h-10 w-10 text-blue-500" />,
      title: "身体健康监测",
      description: "全面记录和分析您的身体健康数据，包括运动、睡眠、饮食等多维度信息。",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Brain className="h-10 w-10 text-indigo-500" />,
      title: "心理健康评估",
      description: "通过科学的心理测评工具，帮助您了解自己的心理状态，及时调整心理健康。",
      gradient: "from-indigo-500 to-purple-400",
    },
    {
      icon: <Heart className="h-10 w-10 text-sky-500" />,
      title: "情绪管理",
      description: "记录情绪变化，提供情绪调节方法，帮助您保持积极乐观的心态。",
      gradient: "from-sky-500 to-blue-400",
    },
    {
      icon: <Shield className="h-10 w-10 text-cyan-500" />,
      title: "健康风险预警",
      description: "基于您的健康数据，预测潜在健康风险，提供个性化的健康建议。",
      gradient: "from-cyan-500 to-teal-400",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "AI健康助手",
      description: "智能AI助手为您提供24小时健康咨询服务，解答健康问题，提供专业建议。",
      gradient: "from-purple-500 to-indigo-400",
    },
    {
      icon: <Activity className="h-10 w-10 text-blue-500" />,
      title: "多设备数据同步",
      description: "支持多种健康设备数据同步，整合各类健康数据，提供全面的健康视图。",
      gradient: "from-blue-500 to-cyan-400",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white flex justify-center">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            全维健康管理特色
          </h2>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            我们的平台提供全方位的健康管理功能，帮助您实现身心健康的协同发展。
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
              <div className="relative bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-blue-100">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full`}></div>
                
                <div className="mb-4">{feature.icon}</div>
                
                <h3 className="text-xl font-bold text-blue-800 mb-3">{feature.title}</h3>
                
                <p className="text-blue-600">{feature.description}</p>
                
                <div className={`h-1 w-16 bg-gradient-to-r ${feature.gradient} rounded-full mt-6`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
