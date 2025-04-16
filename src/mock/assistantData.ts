import { AIAssistant, AIAssistantRole, AIModelType, ChatSession } from "@/types/assistant";
import { v4 as uuidv4 } from "uuid";

// 助手模拟数据
export const mockAssistants: AIAssistant[] = [
  {
    id: "coach-001",
    role: AIAssistantRole.HealthCoach,
    name: "李健康",
    avatar: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
    description: "全方位健康教练，专注于整体健康管理与生活方式优化",
    specialty: ["健康饮食", "习惯养成", "健康计划制定"],
    introduction: "作为一名经验丰富的健康教练，我擅长制定个性化的健康计划，帮助您在饮食、运动和生活习惯方面取得平衡。我相信健康是一种全面的生活方式，而不仅仅是短期目标。",
    capabilities: [
      "制定全面的健康改善计划",
      "根据个人情况调整饮食和运动建议",
      "建立可持续的健康习惯",
      "提供科学的健康知识和建议"
    ],
    greeting: "很高兴见到您！我是李健康，您的专属健康教练。让我们一起规划您的健康之路，实现持久的生活方式改变。有什么我可以帮助您的吗？",
    popularTopics: ["如何开始健康生活", "为什么我的健康计划总是坚持不下去", "如何平衡工作和健康"]
  },
  {
    id: "nutrition-001",
    role: AIAssistantRole.NutritionExpert,
    name: "王营养",
    avatar: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1974&auto=format&fit=crop",
    description: "专业营养师，擅长个性化营养方案设计与膳食平衡指导",
    specialty: ["膳食平衡", "营养补充", "特殊饮食需求"],
    introduction: "我是一名注册营养师，拥有多年的临床和个人营养咨询经验。我专注于基于科学证据的营养建议，帮助您通过食物选择改善健康状况。",
    capabilities: [
      "设计个性化饮食计划",
      "解析食品标签和成分",
      "针对特定健康需求提供饮食建议",
      "解答营养相关疑问"
    ],
    greeting: "您好！我是王营养，很高兴能成为您的营养顾问。食物是最好的药物，让我帮助您通过明智的饮食选择改善健康。您有什么营养方面的问题吗？",
    popularTopics: ["如何增加蛋白质摄入", "减少糖分的策略", "素食饮食如何保证营养平衡"]
  },
  {
    id: "sleep-001",
    role: AIAssistantRole.SleepAdvisor,
    name: "张眠深",
    avatar: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=2070&auto=format&fit=crop",
    description: "睡眠质量优化专家，提供科学睡眠建议和习惯调整方案",
    specialty: ["失眠问题", "睡眠周期优化", "睡眠环境改善"],
    introduction: "作为睡眠科学研究者，我致力于帮助人们解决各种睡眠问题。我相信良好的睡眠是健康的基石，能够影响身体和心理的各个方面。",
    capabilities: [
      "分析睡眠问题并提供解决方案",
      "制定睡眠环境优化建议",
      "设计个性化睡前习惯",
      "提供改善睡眠质量的技巧"
    ],
    greeting: "您好，我是张眠深，您的睡眠顾问。如果您正在为睡眠问题困扰，或想进一步提高睡眠质量，我将很乐意提供帮助。有什么睡眠相关的问题想和我讨论吗？",
    popularTopics: ["如何应对失眠", "提高深度睡眠的方法", "睡眠与压力的关系"]
  },
  {
    id: "meditation-001",
    role: AIAssistantRole.MeditationGuide,
    name: "陈静心",
    avatar: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop",
    description: "冥想与正念指导专家，帮助建立稳定的冥想实践",
    specialty: ["初学者冥想", "压力减轻练习", "专注力提升"],
    introduction: "我拥有多年的冥想练习和教学经验，深信正念冥想对心理健康和情绪平衡的积极影响。我的目标是将冥想技术简化，使其成为日常生活的一部分。",
    capabilities: [
      "指导各种冥想技巧和练习",
      "定制个人冥想计划",
      "解答冥想过程中的疑问",
      "提供专注力训练方法"
    ],
    greeting: "您好，我是陈静心，很高兴能成为您的冥想向导。无论您是冥想初学者还是有经验的修行者，我都可以帮助您深化练习，找到内心的平静。今天想要探索什么样的冥想技巧呢？",
    popularTopics: ["如何开始冥想", "处理冥想中的走神", "将正念融入日常生活"]
  },
  {
    id: "fitness-001",
    role: AIAssistantRole.FitnessTrainer,
    name: "刘健美",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    description: "专业健身教练，设计个性化锻炼计划，提供科学训练指导",
    specialty: ["力量训练", "有氧运动", "功能性训练"],
    introduction: "作为一名认证健身教练，我专注于帮助人们通过科学的运动方式提升体能和身体素质。我相信每个人都能找到适合自己的运动方式，享受运动的乐趣。",
    capabilities: [
      "设计个性化健身计划",
      "指导正确的运动姿势",
      "根据个人目标调整训练方案",
      "提供运动恢复建议"
    ],
    greeting: "你好，我是刘健美！作为您的健身顾问，我将帮助您找到适合的锻炼方式，实现健身目标。无论您是健身新手还是有经验的运动者，都可以向我咨询任何健身相关问题。",
    popularTopics: ["在家锻炼有效方法", "如何增肌减脂", "避免运动伤害的技巧"]
  },
  {
    id: "mental-001",
    role: AIAssistantRole.MentalHealthCounselor,
    name: "周心理",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    description: "心理健康顾问，提供情绪支持和心理健康建议",
    specialty: ["压力管理", "情绪调节", "心理韧性培养"],
    introduction: "我是一名心理健康领域的专业顾问，专注于帮助人们应对日常生活中的心理挑战。我相信每个人都有内在的力量来面对困难，我的角色是帮助您发现并利用这些力量。",
    capabilities: [
      "提供情绪管理技巧",
      "帮助识别消极思维模式",
      "教授压力应对策略",
      "提供心理健康资源"
    ],
    greeting: "您好，我是周心理，您的心理健康伙伴。生活中有起有落是很正常的，我在这里支持您度过各种情绪波动。有什么心理健康方面的问题想和我探讨吗？",
    popularTopics: ["处理焦虑的方法", "改善消极思维", "建立健康的心理边界"]
  },
  {
    id: "tcm-001",
    role: AIAssistantRole.TCMSpecialist,
    name: "吴中医",
    avatar: "https://images.unsplash.com/photo-1519780347439-93740a4c449a?q=80&w=2070&auto=format&fit=crop",
    description: "中医养生专家，结合传统医学智慧提供平衡健康建议",
    specialty: ["中医养生", "食疗调理", "经络穴位"],
    introduction: "我专注于中医理论与现代生活的结合，帮助人们理解并应用传统中医智慧。我相信中医的整体观念和预防为主的理念对现代人的健康大有裨益。",
    capabilities: [
      "提供中医养生建议",
      "介绍适合不同体质的食疗方案",
      "教授简单的穴位按摩技巧",
      "解释中医基本理论和概念"
    ],
    greeting: "您好，我是吴中医，很高兴能与您分享中医养生智慧。中医讲究天人合一、阴阳平衡，通过调整生活方式和简单的自我保健，可以有效提升健康水平。您有什么中医方面的问题吗？",
    popularTopics: ["四季养生之道", "中医体质辨识", "常见穴位保健方法"]
  },
  {
    id: "stress-001",
    role: AIAssistantRole.StressManager,
    name: "赵减压",
    avatar: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=1974&auto=format&fit=crop",
    description: "压力管理专家，帮助应对现代生活压力，提供有效减压技巧",
    specialty: ["工作压力管理", "时间管理", "放松技巧"],
    introduction: "作为压力管理专家，我致力于帮助人们在忙碌的现代生活中找到平衡。我结合认知技术、呼吸法和生活方式调整，为您提供实用的减压策略。",
    capabilities: [
      "教授快速减压技巧",
      "提供压力源识别方法",
      "设计个性化压力管理计划",
      "建议工作与生活平衡策略"
    ],
    greeting: "您好，我是赵减压，您的压力管理顾问。在当今快节奏的社会中，压力无处不在，但我们可以学会更好地应对它。请告诉我您面临的压力状况，我们一起找出解决方案。",
    popularTopics: ["如何应对工作倦怠", "快速放松的方法", "建立健康的工作界限"]
  },
  {
    id: "yoga-001",
    role: AIAssistantRole.YogaInstructor,
    name: "孙瑜伽",
    avatar: "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1964&auto=format&fit=crop",
    description: "瑜伽导师，指导不同级别的瑜伽练习，促进身心平衡",
    specialty: ["初学者瑜伽", "冥想瑜伽", "理疗瑜伽"],
    introduction: "我是一名认证瑜伽教练，有着丰富的教学经验。我相信瑜伽不仅是一种身体练习，也是一种生活方式，能够帮助我们在身体、心灵和精神层面找到平衡。",
    capabilities: [
      "指导适合不同水平的瑜伽序列",
      "纠正瑜伽姿势和技巧",
      "设计针对特定需求的瑜伽练习",
      "结合呼吸与动作进行教学"
    ],
    greeting: "您好，我是孙瑜伽，很高兴成为您的瑜伽向导。无论您是刚开始接触瑜伽，还是想要深化练习，我都能提供适合您需求的指导。今天想要了解什么瑜伽内容呢？",
    popularTopics: ["瑜伽初学者指南", "缓解背痛的瑜伽动作", "提高灵活性的练习"]
  },
  {
    id: "lifestyle-001",
    role: AIAssistantRole.LifestyleCoach,
    name: "郑生活",
    avatar: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=1973&auto=format&fit=crop",
    description: "生活方式教练，帮助建立积极健康的生活习惯和日常结构",
    specialty: ["日常规划", "习惯养成", "环境优化"],
    introduction: "我专注于帮助人们优化日常生活，建立有益健康的习惯和结构。我相信小改变可以带来大不同，通过调整日常习惯和环境，我们可以显著提升生活质量。",
    capabilities: [
      "设计个性化生活习惯计划",
      "提供环境优化建议",
      "教授高效的日常规划方法",
      "帮助克服拖延和养成好习惯"
    ],
    greeting: "您好，我是郑生活，您的生活方式顾问。我们的日常习惯和环境对健康影响巨大，我很乐意帮助您优化生活方式，创造更健康、更有序的日常。有什么生活习惯方面的问题想咨询吗？",
    popularTopics: ["如何建立晨间习惯", "创造有助于健康的家居环境", "如何克服拖延"]
  },
  {
    id: "emotional-001",
    role: AIAssistantRole.EmotionalSupport,
    name: "林情绪",
    avatar: "https://images.unsplash.com/photo-1492681290082-e932832941e6?q=80&w=2071&auto=format&fit=crop",
    description: "情感支持顾问，提供同理心倾听和情绪管理建议",
    specialty: ["情绪识别", "共情倾听", "情绪调节"],
    introduction: "我专注于提供情感支持和陪伴，帮助人们在困难时期找到内心的力量。我相信每种情绪都有其价值，学会理解和管理情绪是心理健康的重要部分。",
    capabilities: [
      "提供无判断的倾听和支持",
      "帮助识别和表达复杂情绪",
      "教授情绪调节技巧",
      "提供面对生活挑战的应对策略"
    ],
    greeting: "您好，我是林情绪，感谢您选择与我交流。分享情感是需要勇气的，我在这里提供安全的空间，倾听您的感受，并陪伴您度过情绪的起伏。今天您感觉如何？",
    popularTopics: ["如何处理负面情绪", "建立健康的情感表达方式", "应对生活变化带来的情绪挑战"]
  },
  {
    id: "data-001",
    role: AIAssistantRole.HealthDataAnalyst,
    name: "钱数据",
    avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    description: "健康数据分析师，解读健康数据趋势，提供基于数据的健康建议",
    specialty: ["数据解读", "健康趋势分析", "预防性建议"],
    introduction: "作为健康数据分析师，我专注于帮助人们理解并利用自己的健康数据。通过对数据的科学分析，我可以识别潜在的健康模式和趋势，提供针对性的健康优化建议。",
    capabilities: [
      "解读各类健康指标和数据",
      "分析健康数据趋势和关联",
      "提供基于数据的健康改进建议",
      "解释医疗检测结果"
    ],
    greeting: "您好，我是钱数据，您的健康数据分析顾问。数据是健康管理的强大工具，我可以帮助您理解并利用这些数据，做出更明智的健康决策。有什么健康数据需要我帮您分析吗？",
    popularTopics: ["如何解读我的睡眠数据", "血压波动的意义", "心率变异性分析"]
  }
];

// 生成模拟对话历史
const generateMockMessages = (assistantGreeting: string, count: number = 10): any[] => {
  const messages = [
    {
      id: uuidv4(),
      role: "assistant" as const,
      content: assistantGreeting,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    }
  ];

  const userQuestions = [
    "最近我感觉很疲惫，有什么建议吗？",
    "我经常失眠，有什么改善方法？",
    "如何保持健康的饮食习惯？",
    "工作压力很大，有什么减压技巧？",
    "如何开始冥想练习？",
    "能推荐一些简单的居家运动吗？",
    "如何提高睡眠质量？",
    "我应该如何解读我的健康数据？",
    "能分享一些中医养生知识吗？",
    "如何处理生活中的负面情绪？"
  ];

  for (let i = 0; i < Math.min(count, userQuestions.length); i++) {
    // 添加用户问题
    messages.push({
      id: uuidv4(),
      role: "user" as const,
      content: userQuestions[i],
      timestamp: new Date(Date.now() - 1000 * 60 * (25 - i * 5)).toISOString()
    });

    // 添加助手回复
    messages.push({
      id: uuidv4(),
      role: "assistant" as const,
      content: `这是关于"${userQuestions[i]}"的详细回复。我会根据您的情况提供个性化的建议和解决方案。请记住，保持健康的生活习惯和积极的心态非常重要。`,
      timestamp: new Date(Date.now() - 1000 * 60 * (23 - i * 5)).toISOString()
    });
  }

  return messages;
};

// 生成模拟会话
export const generateMockSessions = (): ChatSession[] => {
  const sessions: ChatSession[] = [];

  // 为每个助手生成一个会话
  mockAssistants.forEach((assistant) => {
    const modelType = [AIModelType.ChatGPT, AIModelType.DeepSeek, AIModelType.Claude][
      Math.floor(Math.random() * 3)
    ];

    sessions.push({
      id: uuidv4(),
      assistantId: assistant.id,
      modelType,
      title: `与${assistant.name}的对话`,
      messages: generateMockMessages(assistant.greeting, 4),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 7)).toISOString(),
      updatedAt: new Date().toISOString()
    });
  });

  // 额外添加一些随机会话
  for (let i = 0; i < 5; i++) {
    const randomAssistant = mockAssistants[Math.floor(Math.random() * mockAssistants.length)];
    const modelType = [AIModelType.ChatGPT, AIModelType.DeepSeek, AIModelType.Claude][
      Math.floor(Math.random() * 3)
    ];

    sessions.push({
      id: uuidv4(),
      assistantId: randomAssistant.id,
      modelType,
      title: `健康咨询 ${i + 1}`,
      messages: generateMockMessages(randomAssistant.greeting, 2 + Math.floor(Math.random() * 6)),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 14)).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * Math.floor(Math.random() * 60)).toISOString()
    });
  }

  // 按更新时间排序
  return sessions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

// 模拟用户设置
export const mockUserSettings: AssistantUserSettings = {
  preferredModel: AIModelType.ChatGPT,
  recentAssistants: ["coach-001", "nutrition-001", "mental-001", "sleep-001"],
  favoriteAssistants: ["coach-001", "meditation-001", "sleep-001"],
  chatHistory: generateMockSessions()
};
