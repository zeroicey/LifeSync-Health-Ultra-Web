import { Category, Comment, CreateCommentParams, CreatePostParams, Post, PostsQueryParams } from '@/types/community';
import { mockCategories, mockComments, mockCurrentUser, mockPosts } from '@/mock/communityData';
import { create } from 'zustand';

interface CommunityState {
  // 数据状态
  posts: Post[];
  currentPost: Post | null;
  comments: Comment[];
  categories: Category[];
  currentUser: typeof mockCurrentUser;
  
  // 查询参数
  queryParams: PostsQueryParams;
  
  // 加载状态
  isLoading: boolean;
  isSubmitting: boolean;
  
  // 操作方法
  fetchPosts: (params?: PostsQueryParams) => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  createPost: (params: CreatePostParams) => Promise<void>;
  updatePost: (id: string, params: Partial<CreatePostParams>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  createComment: (params: CreateCommentParams) => Promise<void>;
  likeComment: (id: string) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  // 初始状态
  posts: [],
  currentPost: null,
  comments: [],
  categories: mockCategories,
  currentUser: mockCurrentUser,
  queryParams: {
    page: 1,
    limit: 10,
    sortBy: 'latest'
  },
  isLoading: false,
  isSubmitting: false,
  
  // 模拟获取帖子列表
  fetchPosts: async (params) => {
    set({ isLoading: true });
    
    // 合并查询参数
    const queryParams = { ...get().queryParams, ...params };
    set({ queryParams });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 根据查询参数过滤帖子
      let filteredPosts = [...mockPosts];
      
      // 按分类过滤
      if (queryParams.categoryId) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.some(tag => {
            const category = mockCategories.find(c => c.id === queryParams.categoryId);
            return category && tag === category.name;
          })
        );
      }
      
      // 按标签过滤
      if (queryParams.tag) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.includes(queryParams.tag!)
        );
      }
      
      // 按搜索词过滤
      if (queryParams.searchQuery) {
        const query = queryParams.searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(query) || 
          post.content.toLowerCase().includes(query)
        );
      }
      
      // 排序
      if (queryParams.sortBy === 'latest') {
        filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (queryParams.sortBy === 'popular') {
        filteredPosts.sort((a, b) => b.likes - a.likes);
      } else if (queryParams.sortBy === 'trending') {
        filteredPosts.sort((a, b) => (b.likes + b.commentsCount) - (a.likes + a.commentsCount));
      }
      
      // 分页
      const startIndex = ((queryParams.page || 1) - 1) * (queryParams.limit || 10);
      const endIndex = startIndex + (queryParams.limit || 10);
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      
      set({ posts: paginatedPosts, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ isLoading: false });
    }
  },
  
  // 模拟获取帖子详情
  fetchPostById: async (id) => {
    set({ isLoading: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const post = mockPosts.find(p => p.id === id) || null;
      set({ currentPost: post, isLoading: false });
      
      // 如果找到帖子，同时获取评论
      if (post) {
        get().fetchComments(id);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      set({ isLoading: false });
    }
  },
  
  // 模拟获取评论
  fetchComments: async (postId) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const comments = mockComments[postId] || [];
      set({ comments });
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  },
  
  // 模拟创建帖子
  createPost: async (params) => {
    set({ isSubmitting: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newPost: Post = {
        id: `post-${Date.now()}`,
        title: params.title,
        content: params.content,
        authorId: get().currentUser.id,
        authorName: get().currentUser.name,
        authorAvatar: get().currentUser.avatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        commentsCount: 0,
        tags: params.tags,
        imageUrls: params.imageUrls,
        isLiked: false
      };
      
      // 将新帖子添加到列表开头
      set(state => ({ 
        posts: [newPost, ...state.posts],
        isSubmitting: false 
      }));
      
      // 更新当前用户的帖子数量
      set(state => ({
        currentUser: {
          ...state.currentUser,
          postsCount: state.currentUser.postsCount + 1
        }
      }));
    } catch (error) {
      console.error('Failed to create post:', error);
      set({ isSubmitting: false });
    }
  },
  
  // 模拟更新帖子
  updatePost: async (id, params) => {
    set({ isSubmitting: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 更新帖子列表中的帖子
      set(state => ({
        posts: state.posts.map(post => 
          post.id === id 
            ? { 
                ...post, 
                ...params, 
                updatedAt: new Date().toISOString() 
              } 
            : post
        ),
        isSubmitting: false
      }));
      
      // 如果当前查看的是这个帖子，也更新currentPost
      if (get().currentPost?.id === id) {
        set(state => ({
          currentPost: state.currentPost 
            ? { 
                ...state.currentPost, 
                ...params, 
                updatedAt: new Date().toISOString() 
              } 
            : null
        }));
      }
    } catch (error) {
      console.error('Failed to update post:', error);
      set({ isSubmitting: false });
    }
  },
  
  // 模拟删除帖子
  deletePost: async (id) => {
    set({ isSubmitting: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 从帖子列表中移除帖子
      set(state => ({
        posts: state.posts.filter(post => post.id !== id),
        isSubmitting: false
      }));
      
      // 如果当前查看的是这个帖子，清空currentPost
      if (get().currentPost?.id === id) {
        set({ currentPost: null });
      }
      
      // 更新当前用户的帖子数量
      set(state => ({
        currentUser: {
          ...state.currentUser,
          postsCount: Math.max(0, state.currentUser.postsCount - 1)
        }
      }));
    } catch (error) {
      console.error('Failed to delete post:', error);
      set({ isSubmitting: false });
    }
  },
  
  // 模拟点赞帖子
  likePost: async (id) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 更新帖子列表中的帖子点赞状态
      set(state => ({
        posts: state.posts.map(post => 
          post.id === id 
            ? { 
                ...post, 
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked 
              } 
            : post
        )
      }));
      
      // 如果当前查看的是这个帖子，也更新currentPost
      if (get().currentPost?.id === id) {
        set(state => ({
          currentPost: state.currentPost 
            ? { 
                ...state.currentPost, 
                likes: state.currentPost.isLiked 
                  ? state.currentPost.likes - 1 
                  : state.currentPost.likes + 1,
                isLiked: !state.currentPost.isLiked 
              } 
            : null
        }));
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  },
  
  // 模拟创建评论
  createComment: async (params) => {
    set({ isSubmitting: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newComment: Comment = {
        id: `comment-${params.postId}-${Date.now()}`,
        postId: params.postId,
        content: params.content,
        authorId: get().currentUser.id,
        authorName: get().currentUser.name,
        authorAvatar: get().currentUser.avatar,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false
      };
      
      // 如果是回复评论
      if (params.parentId) {
        set(state => ({
          comments: state.comments.map(comment => 
            comment.id === params.parentId 
              ? { 
                  ...comment, 
                  replies: [...(comment.replies || []), newComment] 
                } 
              : comment
          ),
          isSubmitting: false
        }));
      } else {
        // 如果是直接评论帖子
        set(state => ({ 
          comments: [newComment, ...state.comments],
          isSubmitting: false 
        }));
      }
      
      // 更新帖子的评论数
      set(state => ({
        posts: state.posts.map(post => 
          post.id === params.postId 
            ? { ...post, commentsCount: post.commentsCount + 1 } 
            : post
        )
      }));
      
      // 如果当前查看的是这个帖子，也更新currentPost
      if (get().currentPost?.id === params.postId) {
        set(state => ({
          currentPost: state.currentPost 
            ? { 
                ...state.currentPost, 
                commentsCount: state.currentPost.commentsCount + 1 
              } 
            : null
        }));
      }
    } catch (error) {
      console.error('Failed to create comment:', error);
      set({ isSubmitting: false });
    }
  },
  
  // 模拟点赞评论
  likeComment: async (id) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 更新评论列表中的评论点赞状态
      set(state => {
        // 处理主评论
        const updatedComments = state.comments.map(comment => {
          if (comment.id === id) {
            return { 
              ...comment, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked 
            };
          }
          
          // 处理回复评论
          if (comment.replies && comment.replies.some(reply => reply.id === id)) {
            return {
              ...comment,
              replies: comment.replies.map(reply => 
                reply.id === id
                  ? { 
                      ...reply, 
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !reply.isLiked 
                    }
                  : reply
              )
            };
          }
          
          return comment;
        });
        
        return { comments: updatedComments };
      });
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  },
  
  // 模拟关注用户
  followUser: async (userId) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 更新当前用户的关注列表
      set(state => {
        const isFollowing = state.currentUser.following.includes(userId);
        
        return {
          currentUser: {
            ...state.currentUser,
            following: isFollowing
              ? state.currentUser.following.filter(id => id !== userId)
              : [...state.currentUser.following, userId]
          }
        };
      });
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  },
  
  // 模拟取消关注用户
  unfollowUser: async (userId) => {
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 从当前用户的关注列表中移除用户
      set(state => ({
        currentUser: {
          ...state.currentUser,
          following: state.currentUser.following.filter(id => id !== userId)
        }
      }));
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  }
}));