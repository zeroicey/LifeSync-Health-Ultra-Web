import { Course } from "@/types/store";

// 模拟课程数据
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "瑜伽基础：平衡身心的艺术",
    description: "这门课程将带您了解瑜伽的基本姿势和呼吸技巧，帮助您建立身体意识，提高灵活性和力量，同时减轻压力。适合所有水平的练习者。",
    points: 300,
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "yoga",
    level: "beginner",
    duration: "1h 45m",
    instructor: "李明",
    tags: ["瑜伽", "初学者", "冥想", "放松"],
    featured: true,
    popular: true,
    releaseDate: "2024-03-15",
    learningPoints: [
      "掌握15个基础瑜伽姿势和正确的呼吸技巧",
      "学习如何安全地进入和退出各种瑜伽姿势",
      "理解瑜伽哲学和冥想的基础知识",
      "建立日常瑜伽练习计划"
    ]
  },
  {
    id: "course-2",
    title: "高效燃脂：30天挑战计划",
    description: "这个30天的挑战计划专为忙碌的现代人设计，每天只需20分钟，通过高强度间歇训练最大化燃脂效果，帮助您在短时间内看到明显的身体变化。",
    points: 450,
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "fitness",
    level: "intermediate",
    duration: "20m/day",
    instructor: "王强",
    tags: ["HIIT", "燃脂", "挑战", "健身"],
    popular: true,
    releaseDate: "2024-02-20",
    learningPoints: [
      "掌握高效的HIIT训练技巧和方法",
      "学习如何根据个人体能水平调整训练强度",
      "理解燃脂原理和身体代谢机制",
      "建立可持续的健身习惯和饮食计划"
    ]
  },
  {
    id: "course-3",
    title: "营养均衡：健康饮食指南",
    description: "了解如何规划均衡的饮食，掌握食物营养成分的知识，学习简单实用的健康食谱。本课程将帮助您建立可持续的健康饮食习惯。",
    points: 250,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "nutrition",
    level: "beginner",
    duration: "2h 30m",
    instructor: "张营养师",
    tags: ["营养", "健康饮食", "食谱", "生活方式"],
    releaseDate: "2024-01-10",
    learningPoints: [
      "了解各类食物的营养价值和合理搭配方法",
      "学习如何阅读食品标签和选择健康食品",
      "掌握10个简单健康的食谱和烹饪技巧",
      "制定个人化的饮食计划和购物清单"
    ]
  },
  {
    id: "course-4",
    title: "正念冥想：缓解焦虑与压力",
    description: "通过正念冥想技巧，学习如何专注当下，减轻焦虑和压力。本课程包含多种冥想练习，帮助您在繁忙的生活中找到内心的平静。",
    points: 350,
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "meditation",
    level: "beginner",
    duration: "3h 15m",
    instructor: "陈静",
    tags: ["冥想", "正念", "减压", "心理健康"],
    featured: true,
    releaseDate: "2024-03-05",
    learningPoints: [
      "掌握5种不同类型的正念冥想技巧",
      "学习如何在日常生活中保持正念状态",
      "理解压力和焦虑的心理机制",
      "建立个人化的冥想习惯和应对压力的策略"
    ]
  },
  {
    id: "course-5",
    title: "情绪管理：认识与调节情绪",
    description: "学习识别、理解和管理情绪的技巧，提高情绪智力，建立健康的情绪表达方式，改善人际关系和生活质量。",
    points: 400,
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "mental_health",
    level: "intermediate",
    duration: "4h",
    instructor: "林心理师",
    tags: ["情绪管理", "心理健康", "自我成长"],
    releaseDate: "2024-02-15",
    learningPoints: [
      "学习识别和命名各种复杂情绪的方法",
      "掌握有效的情绪调节和表达技巧",
      "理解情绪与思维、行为之间的关系",
      "建立健康的情绪应对模式和沟通方式"
    ]
  },
  {
    id: "course-6",
    title: "健康睡眠：改善睡眠质量指南",
    description: "了解影响睡眠质量的因素，学习科学的睡眠习惯和技巧，通过实用方法改善睡眠质量，提高日间精力和整体健康。",
    points: 300,
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "sleep",
    level: "beginner",
    duration: "2h",
    instructor: "赵睡眠专家",
    tags: ["睡眠", "放松", "生活习惯", "健康"],
    releaseDate: "2024-01-25",
    learningPoints: [
      "了解睡眠周期和影响睡眠质量的因素",
      "学习创建有利于睡眠的环境和晚间习惯",
      "掌握放松技巧和应对失眠的方法",
      "制定个人化的睡眠改善计划"
    ]
  },
  {
    id: "course-7",
    title: "中医养生：四季调理指南",
    description: "基于中医理论，学习四季养生的原则和方法，包括饮食调理、穴位按摩、简单的中医保健操等，增强身体免疫力和适应能力。",
    points: 500,
    imageUrl: "https://images.unsplash.com/photo-1519780296191-d8ada9b77cca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "traditional_medicine",
    level: "intermediate",
    duration: "5h 30m",
    instructor: "吴中医师",
    tags: ["中医", "养生", "季节调理", "自然疗法"],
    popular: true,
    releaseDate: "2024-03-20",
    learningPoints: [
      "理解中医基本理论和四季养生原则",
      "学习根据季节调整饮食和生活习惯",
      "掌握常用穴位按摩和中医保健操",
      "制定个人化的四季养生计划"
    ]
  },
  {
    id: "course-8",
    title: "高级力量训练：突破身体极限",
    description: "针对有一定训练基础的健身爱好者，提供科学的力量训练方案，帮助突破平台期，实现肌肉增长和力量提升的目标。",
    points: 600,
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "fitness",
    level: "advanced",
    duration: "6h",
    instructor: "刘教练",
    tags: ["力量训练", "肌肉增长", "健身", "进阶"],
    releaseDate: "2024-02-05",
    learningPoints: [
      "掌握高级力量训练技术和原理",
      "学习如何设计周期化训练计划",
      "理解肌肉生长机制和恢复策略",
      "制定个人化的营养补充和训练方案"
    ]
  },
  {
    id: "course-9",
    title: "流动瑜伽：提升身体柔韧性",
    description: "通过流畅连贯的瑜伽序列，提高身体柔韧性和核心力量，改善姿势，减轻背部疼痛，适合有一定瑜伽基础的练习者。",
    points: 400,
    imageUrl: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "yoga",
    level: "intermediate",
    duration: "3h 45m",
    instructor: "孙瑜伽师",
    tags: ["瑜伽", "流动", "柔韧性", "核心力量"],
    releaseDate: "2024-01-15",
    learningPoints: [
      "掌握流动瑜伽序列和过渡技巧",
      "学习如何安全地加深瑜伽姿势",
      "理解呼吸与动作协调的重要性",
      "建立个人化的瑜伽练习计划"
    ]
  },
  {
    id: "course-10",
    title: "植物性饮食：21天转变计划",
    description: "探索植物性饮食的健康益处，学习如何逐步过渡到更多植物性饮食，包含21天的详细膳食计划和美味食谱。",
    points: 350,
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "nutrition",
    level: "beginner",
    duration: "4h 20m",
    instructor: "郑营养师",
    tags: ["植物性饮食", "素食", "健康饮食", "食谱"],
    new: true,
    releaseDate: "2024-03-25",
    learningPoints: [
      "了解植物性饮食的健康益处和营养考虑",
      "学习如何确保植物性饮食的营养均衡",
      "掌握21天的植物性饮食转变计划和食谱",
      "制定个人化的植物性饮食购物清单和餐点准备"
    ]
  },
  {
    id: "course-11",
    title: "深度睡眠：声波冥想技术",
    description: "结合特定频率的声波和引导式冥想，帮助您更快入睡，延长深度睡眠时间，醒来后感到更加焕然一新和精力充沛。",
    points: 450,
    imageUrl: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "sleep",
    level: "beginner",
    duration: "2h 15m",
    instructor: "黄音乐治疗师",
    tags: ["睡眠", "声波", "冥想", "放松"],
    new: true,
    releaseDate: "2024-03-30",
    learningPoints: [
      "了解声波冥想的科学原理和效果",
      "学习如何使用声波冥想技术改善睡眠",
      "掌握入睡前的放松和准备技巧",
      "制定个人化的睡眠冥想计划"
    ]
  },
  {
    id: "course-12",
    title: "自我关怀：建立健康的自我关系",
    description: "学习如何培养自我同情和接纳，建立健康的自我对话方式，设定合理的边界，提高自尊和幸福感。",
    points: 400,
    imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "mental_health",
    level: "intermediate",
    duration: "3h 30m",
    instructor: "钱心理咨询师",
    tags: ["自我关怀", "心理健康", "自我成长", "幸福感"],
    featured: true,
    releaseDate: "2024-02-28",
    learningPoints: [
      "理解自我关怀的心理学基础和重要性",
      "学习培养自我同情和接纳的方法",
      "掌握设定健康边界和自我对话的技巧",
      "建立个人化的自我关怀日常习惯"
    ]
  }
];
