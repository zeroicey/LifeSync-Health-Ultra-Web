import { Category, Comment, Post } from "@/types/community";
import { faker } from "@faker-js/faker";

// 生成随机用户头像
const generateAvatar = () => {
  return `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
};

// 健康相关的高质量图片集合
const healthImages = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 健身
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 瑜伽
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 健康食品
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 冥想
  "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 跑步
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 健康蔬菜
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 瑜伽冥想
  "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 健身器材
  "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 水果
  "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 睡眠
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 心理健康
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // 健康早餐
];

// 获取随机健康图片
const getRandomHealthImage = () => {
  return healthImages[Math.floor(Math.random() * healthImages.length)];
};

// 模拟分类数据
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "健身",
    description: "分享健身经验和技巧",
    postCount: 128,
    iconName: "Dumbbell"
  },
  {
    id: "2",
    name: "营养",
    description: "健康饮食与营养知识",
    postCount: 95,
    iconName: "Apple"
  },
  {
    id: "3",
    name: "心理健康",
    description: "心理健康与情绪管理",
    postCount: 76,
    iconName: "Brain"
  },
  {
    id: "4",
    name: "睡眠",
    description: "睡眠质量与改善方法",
    postCount: 54,
    iconName: "Moon"
  },
  {
    id: "5",
    name: "生活方式",
    description: "健康生活方式与习惯养成",
    postCount: 112,
    iconName: "Leaf"
  }
];

// 模拟标签数据
export const mockTags = [
  "健身", "营养", "瑜伽", "跑步", "冥想", 
  "健康食谱", "减肥", "增肌", "压力管理", "睡眠",
  "户外活动", "心理健康", "饮食计划", "健康习惯", "运动恢复"
];

// 生成随机帖子
const generateRandomPosts = (count: number): Post[] => {
  const posts: Post[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomTagCount = Math.floor(Math.random() * 3) + 1;
    const randomTags: string[] = [];
    
    for (let j = 0; j < randomTagCount; j++) {
      const randomTag = mockTags[Math.floor(Math.random() * mockTags.length)];
      if (!randomTags.includes(randomTag)) {
        randomTags.push(randomTag);
      }
    }
    
    const hasImages = Math.random() > 0.5;
    const imageCount = hasImages ? Math.floor(Math.random() * 3) + 1 : 0;
    const imageUrls = hasImages 
      ? Array(imageCount).fill(0).map(() => getRandomHealthImage())
      : undefined;
    
    const createdAt = faker.date.recent({ days: 30 }).toISOString();
    const updatedAt = Math.random() > 0.7 
      ? faker.date.between({ from: createdAt, to: new Date() }).toISOString()
      : createdAt;
    
    posts.push({
      id: `post-${i + 1}`,
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs({ min: 1, max: 3 }),
      authorId: `user-${Math.floor(Math.random() * 10) + 1}`,
      authorName: faker.person.fullName(),
      authorAvatar: generateAvatar(),
      createdAt,
      updatedAt,
      likes: Math.floor(Math.random() * 100),
      commentsCount: Math.floor(Math.random() * 20),
      tags: randomTags,
      imageUrls,
      isLiked: Math.random() > 0.7
    });
  }
  
  return posts;
};

// 生成随机评论
const generateRandomComments = (postId: string, count: number): Comment[] => {
  const comments: Comment[] = [];
  
  for (let i = 0; i < count; i++) {
    const hasReplies = Math.random() > 0.7;
    const replyCount = hasReplies ? Math.floor(Math.random() * 3) + 1 : 0;
    
    const replies: Comment[] = [];
    for (let j = 0; j < replyCount; j++) {
      replies.push({
        id: `comment-${postId}-reply-${j + 1}`,
        postId,
        content: faker.lorem.sentences({ min: 1, max: 2 }),
        authorId: `user-${Math.floor(Math.random() * 10) + 1}`,
        authorName: faker.person.fullName(),
        authorAvatar: generateAvatar(),
        createdAt: faker.date.recent({ days: 7 }).toISOString(),
        likes: Math.floor(Math.random() * 10),
        isLiked: Math.random() > 0.7
      });
    }
    
    comments.push({
      id: `comment-${postId}-${i + 1}`,
      postId,
      content: faker.lorem.sentences({ min: 1, max: 3 }),
      authorId: `user-${Math.floor(Math.random() * 10) + 1}`,
      authorName: faker.person.fullName(),
      authorAvatar: generateAvatar(),
      createdAt: faker.date.recent({ days: 14 }).toISOString(),
      likes: Math.floor(Math.random() * 20),
      isLiked: Math.random() > 0.7,
      replies: hasReplies ? replies : undefined
    });
  }
  
  return comments;
};

// 导出模拟帖子数据
export const mockPosts = generateRandomPosts(30);

// 为每个帖子生成评论
export const mockComments: Record<string, Comment[]> = {};
mockPosts.forEach(post => {
  const commentCount = post.commentsCount;
  mockComments[post.id] = generateRandomComments(post.id, commentCount);
});

// 模拟用户关注数据
export const mockFollowing = [
  "user-1", "user-3", "user-5", "user-7", "user-9"
];

// 模拟当前用户数据
export const mockCurrentUser = {
  id: "current-user",
  name: "张健康",
  avatar: generateAvatar(),
  following: mockFollowing,
  followers: 42,
  postsCount: 15
};