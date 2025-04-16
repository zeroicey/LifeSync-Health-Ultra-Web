import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { 
  AIAssistant, 
  AIModelType, 
  ChatMessage, 
  ChatSession 
} from "@/types/assistant";
import { 
  mockAssistants, 
  mockUserSettings, 
  generateMockSessions 
} from "@/mock/assistantData";

interface AssistantStore {
  // 助手数据
  assistants: AIAssistant[];
  currentAssistant: AIAssistant | null;
  favoriteAssistants: string[];
  recentAssistants: string[];
  
  // 会话数据
  chatSessions: ChatSession[];
  currentSession: ChatSession | null;
  
  // 设置
  preferredModel: AIModelType;
  isLoading: boolean;
  
  // 操作方法
  getAssistantById: (id: string) => AIAssistant | undefined;
  getSessionById: (id: string) => ChatSession | undefined;
  selectAssistant: (id: string) => void;
  selectSession: (id: string) => void;
  createNewSession: (assistantId: string, modelType?: AIModelType) => void;
  sendMessage: (content: string) => void;
  toggleFavorite: (assistantId: string) => void;
  changeModel: (modelType: AIModelType) => void;
  deleteSession: (sessionId: string) => void;
}

export const useAssistantStore = create<AssistantStore>((set, get) => ({
  // 初始状态
  assistants: mockAssistants,
  currentAssistant: null,
  favoriteAssistants: mockUserSettings.favoriteAssistants,
  recentAssistants: mockUserSettings.recentAssistants,
  chatSessions: mockUserSettings.chatHistory,
  currentSession: null,
  preferredModel: mockUserSettings.preferredModel,
  isLoading: false,
  
  // 根据ID获取助手
  getAssistantById: (id: string) => {
    return get().assistants.find(assistant => assistant.id === id);
  },
  
  // 根据ID获取会话
  getSessionById: (id: string) => {
    return get().chatSessions.find(session => session.id === id);
  },
  
  // 选择助手
  selectAssistant: (id: string) => {
    const assistant = get().getAssistantById(id);
    if (!assistant) return;
    
    set(state => ({
      currentAssistant: assistant,
      recentAssistants: [
        id,
        ...state.recentAssistants.filter(aid => aid !== id)
      ].slice(0, 5)
    }));
    
    // 查找该助手的最新会话
    const session = get().chatSessions.find(session => session.assistantId === id);
    if (session) {
      get().selectSession(session.id);
    } else {
      get().createNewSession(id);
    }
  },
  
  // 选择会话
  selectSession: (id: string) => {
    const session = get().getSessionById(id);
    if (!session) return;
    
    const assistant = get().getAssistantById(session.assistantId);
    if (!assistant) return;
    
    set({
      currentSession: session,
      currentAssistant: assistant
    });
  },
  
  // 创建新会话
  createNewSession: (assistantId: string, modelType?: AIModelType) => {
    const assistant = get().getAssistantById(assistantId);
    if (!assistant) return;
    
    const model = modelType || get().preferredModel;
    const newSessionId = uuidv4();
    const now = new Date().toISOString();
    
    const newSession: ChatSession = {
      id: newSessionId,
      assistantId: assistantId,
      modelType: model,
      title: `与${assistant.name}的对话`,
      messages: [
        {
          id: uuidv4(),
          role: "assistant",
          content: assistant.greeting,
          timestamp: now
        }
      ],
      createdAt: now,
      updatedAt: now
    };
    
    set(state => ({
      chatSessions: [newSession, ...state.chatSessions],
      currentSession: newSession,
      currentAssistant: assistant
    }));
  },
  
  // 发送消息
  sendMessage: (content: string) => {
    if (!content.trim() || !get().currentSession) return;
    
    const currentSession = get().currentSession;
    const now = new Date().toISOString();
    
    // 添加用户消息
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: content,
      timestamp: now
    };
    
    set(state => ({
      currentSession: state.currentSession ? {
        ...state.currentSession,
        messages: [...state.currentSession.messages, userMessage],
        updatedAt: now
      } : null,
      isLoading: true
    }));
    
    // 更新会话列表
    set(state => ({
      chatSessions: state.chatSessions.map(session => 
        session.id === currentSession?.id 
          ? { ...session, messages: [...session.messages, userMessage], updatedAt: now }
          : session
      )
    }));
    
    // 模拟AI响应延迟
    setTimeout(() => {
      if (!get().currentSession) return;
      
      // 生成助手思考消息
      const thinkingMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
        isThinking: true
      };
      
      set(state => ({
        currentSession: state.currentSession ? {
          ...state.currentSession,
          messages: [...state.currentSession.messages, thinkingMessage]
        } : null
      }));
      
      // 更新会话列表
      set(state => ({
        chatSessions: state.chatSessions.map(session => 
          session.id === currentSession?.id 
            ? { ...session, messages: [...session.messages, thinkingMessage] }
            : session
        )
      }));
      
      // 模拟生成回复
      setTimeout(() => {
        if (!get().currentSession) return;
        
        const currentTime = new Date().toISOString();
        const responseContent = `这是对"${content}"的回复。我会根据您的问题提供个性化的建议和解决方案。请记住，保持健康的生活习惯和积极的心态对于整体健康非常重要。如果您有更多问题，欢迎随时提问。`;
        
        // 生成助手回复消息
        const assistantMessage: ChatMessage = {
          id: uuidv4(),
          role: "assistant",
          content: responseContent,
          timestamp: currentTime
        };
        
        // 更新当前会话
        set(state => {
          // 获取当前会话最新状态
          const currentSessionState = state.currentSession;
          if (!currentSessionState) return { isLoading: false };
          
          // 过滤掉思考中消息
          const filteredMessages = currentSessionState.messages.filter(msg => !msg.isThinking);
          
          return {
            currentSession: {
              ...currentSessionState,
              messages: [...filteredMessages, assistantMessage],
              updatedAt: currentTime
            },
            isLoading: false
          };
        });
        
        // 更新会话列表
        set(state => {
          return {
            chatSessions: state.chatSessions.map(session => {
              if (session.id !== currentSession?.id) return session;
              
              // 过滤掉思考中消息
              const filteredMessages = session.messages.filter(msg => !msg.isThinking);
              
              return {
                ...session,
                messages: [...filteredMessages, assistantMessage],
                updatedAt: currentTime
              };
            })
          };
        });
      }, 1500);
    }, 500);
  },
  
  // 切换收藏状态
  toggleFavorite: (assistantId: string) => {
    set(state => {
      const isFavorite = state.favoriteAssistants.includes(assistantId);
      
      return {
        favoriteAssistants: isFavorite
          ? state.favoriteAssistants.filter(id => id !== assistantId)
          : [...state.favoriteAssistants, assistantId]
      };
    });
  },
  
  // 更改模型
  changeModel: (modelType: AIModelType) => {
    set({
      preferredModel: modelType
    });
    
    // 如果有当前会话，更新会话的模型
    if (get().currentSession) {
      const sessionId = get().currentSession.id;
      
      set(state => ({
        currentSession: state.currentSession 
          ? { ...state.currentSession, modelType } 
          : null,
        chatSessions: state.chatSessions.map(session => 
          session.id === sessionId 
            ? { ...session, modelType }
            : session
        )
      }));
    }
  },
  
  // 删除会话
  deleteSession: (sessionId: string) => {
    const isCurrentSession = get().currentSession?.id === sessionId;
    
    set(state => ({
      chatSessions: state.chatSessions.filter(session => session.id !== sessionId),
      currentSession: isCurrentSession ? null : state.currentSession
    }));
    
    // 如果删除的是当前会话，选择最近的一个会话
    if (isCurrentSession && get().chatSessions.length > 0) {
      get().selectSession(get().chatSessions[0].id);
    }
  }
}));
