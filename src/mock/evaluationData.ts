import { EvaluationTest, TestCategory, TestQuestion, TestResult } from "@/types/evaluate";

// 模拟评估测试数据
export const mockEvaluationTests: EvaluationTest[] = [
  {
    id: "mbti-test",
    title: "MBTI 人格类型测试",
    description: "迈尔斯-布里格斯类型指标（MBTI）是一种流行的人格测试，帮助您了解自己的性格特点和与他人交往的方式。",
    imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2071&auto=format&fit=crop",
    category: TestCategory.Personality,
    duration: 15,
    questionCount: 20,
    popularity: 95,
    tags: ["人格", "性格", "自我认知"]
  },
  {
    id: "anxiety-test",
    title: "焦虑自评量表",
    description: "焦虑自评量表（SAS）是一种用于评估个体焦虑水平的工具，帮助您了解自己的焦虑状态。",
    imageUrl: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=2070&auto=format&fit=crop",
    category: TestCategory.Anxiety,
    duration: 10,
    questionCount: 20,
    popularity: 88,
    tags: ["焦虑", "情绪", "心理健康"]
  },
  {
    id: "depression-test",
    title: "抑郁自评量表",
    description: "抑郁自评量表（SDS）是一种用于评估个体抑郁症状的工具，帮助您了解自己的情绪状态。",
    imageUrl: "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1974&auto=format&fit=crop",
    category: TestCategory.Depression,
    duration: 10,
    questionCount: 20,
    popularity: 85,
    tags: ["抑郁", "情绪", "心理健康"]
  },
  {
    id: "sleep-quality-test",
    title: "匹兹堡睡眠质量指数",
    description: "匹兹堡睡眠质量指数（PSQI）是一种评估睡眠质量的工具，帮助您了解自己的睡眠状况。",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop",
    category: TestCategory.Sleep,
    duration: 8,
    questionCount: 19,
    popularity: 82,
    tags: ["睡眠", "健康", "生活质量"]
  },
  {
    id: "stress-test",
    title: "压力知觉量表",
    description: "压力知觉量表（PSS）是一种评估个体感知压力水平的工具，帮助您了解自己的压力状态。",
    imageUrl: "https://images.unsplash.com/photo-1623107274042-25962b22b29e?q=80&w=1974&auto=format&fit=crop",
    category: TestCategory.Stress,
    duration: 8,
    questionCount: 14,
    popularity: 80,
    tags: ["压力", "情绪", "心理健康"]
  },
  {
    id: "relationship-test",
    title: "亲密关系评估",
    description: "亲密关系评估是一种评估个体人际关系质量的工具，帮助您了解自己的人际关系状况。",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop",
    category: TestCategory.Relationship,
    duration: 12,
    questionCount: 25,
    popularity: 75,
    tags: ["关系", "亲密", "人际交往"]
  }
];

// MBTI测试问题示例
export const mbtiQuestions: TestQuestion[] = [
  {
    id: "q1",
    text: "在社交场合中，您通常会：",
    options: [
      { id: "q1-a", text: "认识很多新朋友，感到精力充沛", value: "E" },
      { id: "q1-b", text: "与少数几个人深入交谈，或者独自待着", value: "I" }
    ]
  },
  {
    id: "q2",
    text: "您更倾向于关注：",
    options: [
      { id: "q2-a", text: "具体的事实和细节", value: "S" },
      { id: "q2-b", text: "概念和可能性", value: "N" }
    ]
  },
  {
    id: "q3",
    text: "做决定时，您更看重：",
    options: [
      { id: "q3-a", text: "逻辑和客观分析", value: "T" },
      { id: "q3-b", text: "个人价值观和对他人的影响", value: "F" }
    ]
  },
  {
    id: "q4",
    text: "在工作和生活中，您更喜欢：",
    options: [
      { id: "q4-a", text: "有计划和组织的方式", value: "J" },
      { id: "q4-b", text: "灵活和适应性强的方式", value: "P" }
    ]
  },
  {
    id: "q5",
    text: "您更喜欢的工作环境是：",
    options: [
      { id: "q5-a", text: "充满活力和互动的团队环境", value: "E" },
      { id: "q5-b", text: "安静和专注的独立工作空间", value: "I" }
    ]
  }
];

// 焦虑测试问题示例
export const anxietyQuestions: TestQuestion[] = [
  {
    id: "a1",
    text: "我感到比平常更紧张和焦虑",
    options: [
      { id: "a1-1", text: "很少或从不", value: 1 },
      { id: "a1-2", text: "有时", value: 2 },
      { id: "a1-3", text: "经常", value: 3 },
      { id: "a1-4", text: "总是或几乎总是", value: 4 }
    ]
  },
  {
    id: "a2",
    text: "我无缘无故地感到害怕",
    options: [
      { id: "a2-1", text: "很少或从不", value: 1 },
      { id: "a2-2", text: "有时", value: 2 },
      { id: "a2-3", text: "经常", value: 3 },
      { id: "a2-4", text: "总是或几乎总是", value: 4 }
    ]
  },
  {
    id: "a3",
    text: "我容易心烦意乱或惊慌",
    options: [
      { id: "a3-1", text: "很少或从不", value: 1 },
      { id: "a3-2", text: "有时", value: 2 },
      { id: "a3-3", text: "经常", value: 3 },
      { id: "a3-4", text: "总是或几乎总是", value: 4 }
    ]
  },
  {
    id: "a4",
    text: "我感到我要崩溃了",
    options: [
      { id: "a4-1", text: "很少或从不", value: 1 },
      { id: "a4-2", text: "有时", value: 2 },
      { id: "a4-3", text: "经常", value: 3 },
      { id: "a4-4", text: "总是或几乎总是", value: 4 }
    ]
  },
  {
    id: "a5",
    text: "我感到一切都很好，不会发生不幸",
    options: [
      { id: "a5-1", text: "总是或几乎总是", value: 1 },
      { id: "a5-2", text: "经常", value: 2 },
      { id: "a5-3", text: "有时", value: 3 },
      { id: "a5-4", text: "很少或从不", value: 4 }
    ]
  }
];

// 抑郁测试问题示例
export const depressionQuestions: TestQuestion[] = [
  {
    id: "d1",
    text: "我感到情绪低落，沮丧和悲伤",
    options: [
      { id: "d1-1", text: "很少或从不", value: 1 },
      { id: "d1-2", text: "有时", value: 2 },
      { id: "d1-3", text: "经常", value: 3 },
      { id: "d1-4", text: "总是或几乎总是", value: 4 }
    ]
  },
  {
    id: "d2",
    text: "早晨是我感觉最好的时候",
    options: [
      { id: "d2-1", text: "总是或几乎总是", value: 1 },
      { id: "d2-2", text: "经常", value: 2 },
      { id: "d2-3", text: "有时", value: 3 },
      { id: "d2-4", text: "很少或从不", value: 4 }
    ]
  },
  {
    id: "d3",
    text: "我会哭或想哭",
    options: [
      { id: "d3-1", text: "很少或从不", value: 1 },
      { id: "d3-2", text: "有时", value: 2 },
      { id: "d3-3", text: "经常", value: 3 },
      { id: "d3-4", text: "总是或几乎总是", value: 4 }
    ]
  },
  {
    id: "d4",
    text: "我晚上睡眠困难",
    options: [
      { id: "d4-1", text: "很少或从不", value: 1 },
      { id: "d4-2", text: "有时", value: 2 },
      { id: "d4-3", text: "经常", value: 3 },
      { id: "d4-4", text: "总是或几乎总是", value: 4 }
    ]
  },
  {
    id: "d5",
    text: "我吃得和平常一样多",
    options: [
      { id: "d5-1", text: "总是或几乎总是", value: 1 },
      { id: "d5-2", text: "经常", value: 2 },
      { id: "d5-3", text: "有时", value: 3 },
      { id: "d5-4", text: "很少或从不", value: 4 }
    ]
  }
];

// 睡眠质量测试问题示例
export const sleepQuestions: TestQuestion[] = [
  {
    id: "s1",
    text: "在过去的一个月里，您通常什么时候上床睡觉？",
    options: [
      { id: "s1-1", text: "晚上10点前", value: 0 },
      { id: "s1-2", text: "晚上10点到11点", value: 1 },
      { id: "s1-3", text: "晚上11点到12点", value: 2 },
      { id: "s1-4", text: "晚上12点以后", value: 3 }
    ]
  },
  {
    id: "s2",
    text: "在过去的一个月里，您通常需要多长时间才能入睡？",
    options: [
      { id: "s2-1", text: "15分钟以内", value: 0 },
      { id: "s2-2", text: "16-30分钟", value: 1 },
      { id: "s2-3", text: "31-60分钟", value: 2 },
      { id: "s2-4", text: "60分钟以上", value: 3 }
    ]
  },
  {
    id: "s3",
    text: "在过去的一个月里，您通常什么时候起床？",
    options: [
      { id: "s3-1", text: "早上5点前", value: 3 },
      { id: "s3-2", text: "早上5点到6点", value: 2 },
      { id: "s3-3", text: "早上6点到7点", value: 1 },
      { id: "s3-4", text: "早上7点以后", value: 0 }
    ]
  },
  {
    id: "s4",
    text: "在过去的一个月里，您每晚实际睡眠时间大约有多少？",
    options: [
      { id: "s4-1", text: "7小时以上", value: 0 },
      { id: "s4-2", text: "6-7小时", value: 1 },
      { id: "s4-3", text: "5-6小时", value: 2 },
      { id: "s4-4", text: "5小时以下", value: 3 }
    ]
  },
  {
    id: "s5",
    text: "在过去的一个月里，您因为以下原因而难以入睡的频率是？（如噪音、温度不适、上厕所等）",
    options: [
      { id: "s5-1", text: "从不", value: 0 },
      { id: "s5-2", text: "每周少于1次", value: 1 },
      { id: "s5-3", text: "每周1-2次", value: 2 },
      { id: "s5-4", text: "每周3次或更多", value: 3 }
    ]
  }
];

// 模拟测试结果
export const mockTestResults: Record<string, TestResult[]> = {
  "mbti-test": [
    {
      id: "INTJ",
      title: "INTJ - 建筑师",
      description: "您是一个具有战略思维的创新者，注重独立性和追求知识与能力。您擅长制定复杂系统和理论模型，喜欢挑战和解决问题。",
      recommendations: [
        "尝试参与需要战略规划和系统思考的活动",
        "给自己留出独处和反思的时间",
        "学习表达情感和理解他人的感受",
        "培养与不同思维方式的人合作的能力"
      ]
    },
    {
      id: "ENFP",
      title: "ENFP - 冒险家",
      description: "您是一个热情、创造性和社交性强的人，充满活力和想象力。您擅长发现可能性并激励他人，对新想法和项目充满热情。",
      recommendations: [
        "参与创意和表达性活动",
        "寻找能让您与他人建立有意义联系的机会",
        "学习如何完成长期项目和处理细节",
        "给自己设定现实的目标和期限"
      ]
    }
  ],
  "anxiety-test": [
    {
      id: "anxiety-low",
      title: "轻微焦虑",
      description: "您的焦虑水平较低，这表明您通常能够有效地管理压力和焦虑情绪。",
      recommendations: [
        "继续保持健康的生活方式和应对策略",
        "定期进行放松活动，如冥想或深呼吸练习",
        "保持社交联系和支持网络",
        "注意识别可能导致焦虑增加的触发因素"
      ]
    },
    {
      id: "anxiety-moderate",
      title: "中度焦虑",
      description: "您的焦虑水平处于中等程度，这可能会对您的日常生活产生一些影响。",
      recommendations: [
        "学习并实践更多的放松技巧，如渐进式肌肉放松",
        "考虑寻求专业心理咨询",
        "规律锻炼以减轻焦虑症状",
        "保持健康的睡眠习惯和饮食模式"
      ]
    },
    {
      id: "anxiety-high",
      title: "严重焦虑",
      description: "您的焦虑水平较高，这可能会显著影响您的日常功能和生活质量。",
      recommendations: [
        "强烈建议寻求专业心理健康服务",
        "学习认知行为疗法技巧来管理焦虑思维",
        "建立日常放松和自我照顾的习惯",
        "考虑与医生讨论可能的治疗选择，包括心理治疗和/或药物治疗"
      ]
    }
  ],
  "depression-test": [
    {
      id: "depression-low",
      title: "无或轻微抑郁",
      description: "您的抑郁症状很少或轻微，这表明您的情绪状态总体良好。",
      recommendations: [
        "继续保持积极的生活方式和社交活动",
        "定期锻炼以维持良好的情绪",
        "实践正念和感恩练习",
        "保持健康的睡眠习惯和饮食模式"
      ]
    },
    {
      id: "depression-moderate",
      title: "中度抑郁",
      description: "您的抑郁症状处于中等程度，这可能会对您的日常生活和情绪产生影响。",
      recommendations: [
        "考虑寻求专业心理咨询",
        "增加社交活动和与支持性朋友/家人的联系",
        "建立规律的锻炼习惯",
        "学习认知行为疗法技巧来管理消极思维"
      ]
    },
    {
      id: "depression-high",
      title: "严重抑郁",
      description: "您的抑郁症状较为严重，这可能会显著影响您的日常功能和生活质量。",
      recommendations: [
        "强烈建议寻求专业心理健康服务",
        "与医生讨论治疗选择，包括心理治疗和/或药物治疗",
        "建立日常自我照顾的习惯",
        "确保有支持系统并与亲友保持联系"
      ]
    }
  ],
  "sleep-quality-test": [
    {
      id: "sleep-good",
      title: "良好睡眠质量",
      description: "您的睡眠质量良好，这对您的整体健康和日常功能有积极影响。",
      recommendations: [
        "继续保持规律的睡眠时间表",
        "维持健康的睡前习惯",
        "保持卧室环境舒适和适合睡眠",
        "限制咖啡因和酒精的摄入，特别是在晚上"
      ]
    },
    {
      id: "sleep-fair",
      title: "一般睡眠质量",
      description: "您的睡眠质量一般，可能会对您的日常精力和情绪产生一些影响。",
      recommendations: [
        "建立更规律的睡眠时间表",
        "创建放松的睡前习惯",
        "减少屏幕时间，特别是在睡前",
        "考虑使用放松技巧，如深呼吸或渐进式肌肉放松"
      ]
    },
    {
      id: "sleep-poor",
      title: "较差睡眠质量",
      description: "您的睡眠质量较差，这可能会对您的健康、情绪和日常功能产生负面影响。",
      recommendations: [
        "考虑咨询医生或睡眠专家",
        "严格遵守规律的睡眠时间表",
        "创建有利于睡眠的环境（安静、黑暗、凉爽）",
        "避免在床上进行非睡眠活动（如看电视、工作）",
        "限制咖啡因、酒精和尼古丁的摄入"
      ]
    }
  ]
};
