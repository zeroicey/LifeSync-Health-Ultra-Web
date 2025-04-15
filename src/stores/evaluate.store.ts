import { create } from "zustand";
import { 
  EvaluationTest, 
  TestQuestion, 
  TestResult, 
  TestState 
} from "@/types/evaluate";
import { 
  mockEvaluationTests, 
  mbtiQuestions, 
  anxietyQuestions, 
  depressionQuestions, 
  sleepQuestions,
  mockTestResults
} from "@/mock/evaluationData";

interface EvaluateStore {
  // 测试列表
  tests: EvaluationTest[];
  
  // 当前测试状态
  currentTest: EvaluationTest | null;
  testState: TestState;
  testQuestions: TestQuestion[];
  
  // 历史测试记录
  testHistory: {
    testId: string;
    date: string;
    result: TestResult;
  }[];
  
  // 操作方法
  getTests: () => EvaluationTest[];
  getTestById: (id: string) => EvaluationTest | undefined;
  startTest: (testId: string) => void;
  answerQuestion: (questionId: string, answer: string | number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  completeTest: () => TestResult;
  resetTest: () => void;
}

export const useEvaluateStore = create<EvaluateStore>((set, get) => ({
  // 初始状态
  tests: mockEvaluationTests,
  currentTest: null,
  testState: {
    currentQuestionIndex: 0,
    answers: {},
    isCompleted: false,
    result: null
  },
  testQuestions: [],
  testHistory: [],
  
  // 获取所有测试
  getTests: () => {
    return get().tests;
  },
  
  // 根据ID获取测试
  getTestById: (id: string) => {
    return get().tests.find(test => test.id === id);
  },
  
  // 开始测试
  startTest: (testId: string) => {
    const test = get().tests.find(test => test.id === testId);
    if (!test) return;
    
    // 根据测试类型获取问题
    let questions: TestQuestion[] = [];
    switch (testId) {
      case "mbti-test":
        questions = mbtiQuestions;
        break;
      case "anxiety-test":
        questions = anxietyQuestions;
        break;
      case "depression-test":
        questions = depressionQuestions;
        break;
      case "sleep-quality-test":
        questions = sleepQuestions;
        break;
      default:
        // 默认使用MBTI问题作为示例
        questions = mbtiQuestions;
    }
    
    set({
      currentTest: test,
      testQuestions: questions,
      testState: {
        currentQuestionIndex: 0,
        answers: {},
        isCompleted: false,
        result: null
      }
    });
  },
  
  // 回答问题
  answerQuestion: (questionId: string, answer: string | number) => {
    set(state => ({
      testState: {
        ...state.testState,
        answers: {
          ...state.testState.answers,
          [questionId]: answer
        }
      }
    }));
  },
  
  // 下一个问题
  nextQuestion: () => {
    set(state => {
      const nextIndex = state.testState.currentQuestionIndex + 1;
      const isLastQuestion = nextIndex >= state.testQuestions.length;
      
      return {
        testState: {
          ...state.testState,
          currentQuestionIndex: isLastQuestion ? state.testState.currentQuestionIndex : nextIndex
        }
      };
    });
  },
  
  // 上一个问题
  prevQuestion: () => {
    set(state => ({
      testState: {
        ...state.testState,
        currentQuestionIndex: Math.max(0, state.testState.currentQuestionIndex - 1)
      }
    }));
  },
  
  // 完成测试并计算结果
  completeTest: () => {
    const { currentTest, testState } = get();
    if (!currentTest) throw new Error("No active test");
    
    // 模拟计算测试结果
    // 在实际应用中，这里应该有基于答案的复杂计算逻辑
    const testResults = mockTestResults[currentTest.id];
    const randomIndex = Math.floor(Math.random() * testResults.length);
    const result = testResults[randomIndex];
    
    // 更新状态
    set(state => ({
      testState: {
        ...state.testState,
        isCompleted: true,
        result
      },
      testHistory: [
        ...state.testHistory,
        {
          testId: currentTest.id,
          date: new Date().toISOString(),
          result
        }
      ]
    }));
    
    return result;
  },
  
  // 重置测试
  resetTest: () => {
    set({
      currentTest: null,
      testState: {
        currentQuestionIndex: 0,
        answers: {},
        isCompleted: false,
        result: null
      },
      testQuestions: []
    });
  }
}));
