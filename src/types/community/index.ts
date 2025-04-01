// 社区模块类型定义

// 帖子类型
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  commentsCount: number;
  tags: string[];
  imageUrls?: string[];
  isLiked?: boolean;
}

// 评论类型
export interface Comment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  parentId?: string; // 父评论ID，如果是回复其他评论
  replies?: Comment[];
}

// 帖子创建参数
export interface CreatePostParams {
  title: string;
  content: string;
  tags: string[];
  imageUrls?: string[];
}

// 评论创建参数
export interface CreateCommentParams {
  postId: string;
  content: string;
  parentId?: string; // 如果是回复其他评论
}

// 社区分类
export interface Category {
  id: string;
  name: string;
  description: string;
  postCount: number;
  iconName: string; // Lucide图标名称
}

// 帖子列表查询参数
export interface PostsQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  tag?: string;
  searchQuery?: string;
  sortBy?: 'latest' | 'popular' | 'trending';
}

// 帖子列表响应
export interface PostsResponse {
  posts: Post[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
}