import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCommunityStore } from "@/stores/community.store";
import { CreatePostParams, Post } from "@/types/community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Image as ImageIcon, Loader2, Check, Tag } from "lucide-react";
import { mockTags } from "@/mock/communityData";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface CreatePostFormProps {
  postToEdit?: Post;
  locale: string;
}

export function CreatePostForm({ postToEdit, locale }: CreatePostFormProps) {
  const t = useTranslations("Community");
  const { createPost, updatePost, isSubmitting, currentUser } = useCommunityStore();
  
  // 表单状态
  const [title, setTitle] = useState(postToEdit?.title || "");
  const [content, setContent] = useState(postToEdit?.content || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(postToEdit?.tags || []);
  const [imageUrls, setImageUrls] = useState<string[]>(postToEdit?.imageUrls || []);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPostId, setSubmittedPostId] = useState<string | null>(null);
  
  // 表单验证
  const isFormValid = content.trim().length > 0;
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    const postData: CreatePostParams = {
      title,
      content,
      tags: selectedTags,
      imageUrls: imageUrls.length > 0 ? imageUrls : undefined
    };
    
    if (postToEdit) {
      // 更新帖子
      await updatePost(postToEdit.id, postData);
      setIsSubmitted(true);
      setSubmittedPostId(postToEdit.id);
    } else {
      // 创建新帖子
      try {
        // 创建帖子后，使用模拟的ID
        await createPost(postData);
        // 由于store中的createPost不返回ID，我们使用模拟ID
        const mockPostId = `post-${Date.now()}`;
        setIsSubmitted(true);
        setSubmittedPostId(mockPostId);
      } catch (error) {
        console.error('创建帖子失败', error);
      }
    }
  };
  
  // 处理标签选择
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // 模拟图片上传
  const handleImageUpload = () => {
    setIsUploading(true);
    
    // 模拟上传延迟
    setTimeout(() => {
      // 生成随机图片URL
      const randomWidth = Math.floor(Math.random() * 200) + 600;
      const randomHeight = Math.floor(Math.random() * 200) + 400;
      const newImageUrl = `https://picsum.photos/${randomWidth}/${randomHeight}?random=${Date.now()}`;
      
      setImageUrls(prev => [...prev, newImageUrl]);
      setIsUploading(false);
    }, 1500);
  };
  
  // 移除图片
  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  // 根据标签获取渐变色
  const getTagGradient = (tag: string) => {
    const tagMap: Record<string, string> = {
      "健身": "from-blue-500 to-indigo-600 text-white",
      "营养": "from-green-500 to-emerald-600 text-white",
      "瑜伽": "from-purple-500 to-pink-600 text-white",
      "跑步": "from-orange-500 to-amber-600 text-white",
      "冥想": "from-indigo-500 to-purple-600 text-white",
      "健康食谱": "from-emerald-500 to-teal-600 text-white",
      "减肥": "from-rose-500 to-pink-600 text-white",
      "增肌": "from-blue-600 to-indigo-700 text-white",
      "压力管理": "from-violet-500 to-purple-600 text-white",
      "睡眠": "from-blue-400 to-indigo-500 text-white",
      "户外活动": "from-green-600 to-emerald-700 text-white",
      "心理健康": "from-pink-500 to-rose-600 text-white",
      "饮食计划": "from-teal-500 to-green-600 text-white",
      "健康习惯": "from-cyan-500 to-blue-600 text-white",
      "运动恢复": "from-amber-500 to-orange-600 text-white",
    };
    
    return tagMap[tag] || "from-gray-500 to-gray-600 text-white";
  };
  
  // 如果提交成功，显示成功消息并提供导航链接
  if (isSubmitted && submittedPostId) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-8"
      >
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20 rounded-full p-8 mb-6 shadow-md">
          <Check className="w-12 h-12 text-green-500 dark:text-green-400" />
        </div>
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400 mb-3">
            {postToEdit ? t("postUpdated") : t("postPublished")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            {postToEdit ? t("postUpdatedDescription") : t("postPublishedDescription")}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button 
            asChild
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 rounded-lg"
          >
            <Link href={`/community/posts/${submittedPostId}`}>
              {t("viewPost")}
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm rounded-lg"
          >
            <Link href="/community">
              {t("backToCommunity")}
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <Avatar className="h-10 w-10 mr-3 border-2 border-indigo-100 dark:border-indigo-800 shadow-sm">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            {currentUser.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {currentUser.name}
          </div>
          <div className="text-sm text-indigo-600/80 dark:text-indigo-400/80">
            {t("postingAs")}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-gray-700 dark:text-gray-300 font-medium">
            {t("postTitle")} <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">({t("optional")})</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("postTitlePlaceholder")}
            className="mt-1 bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50 focus:border-indigo-300 dark:focus:border-indigo-700 rounded-lg"
          />
        </div>
        
        <div>
          <Label htmlFor="content" className="text-gray-700 dark:text-gray-300 font-medium">
            {t("postContent")} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("postContentPlaceholder")}
            className="mt-1 min-h-[150px] bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50 focus:border-indigo-300 dark:focus:border-indigo-700 rounded-lg"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              {t("tags")}
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowTagSelector(!showTagSelector)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg"
            >
              <Tag className="h-4 w-4 mr-1" />
              {showTagSelector ? t("hideTags") : t("selectTags")}
            </Button>
          </div>
          
          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-lg">
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {selectedTags.map(tag => (
                <Badge 
                  key={tag}
                  className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getTagGradient(tag)} shadow-sm`}
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className="ml-1 bg-white/20 rounded-full p-0.5 hover:bg-white/30"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              {selectedTags.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  {t("noTagsSelected")}
                </p>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {showTagSelector && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 p-4 border border-indigo-100 dark:border-indigo-800/50 rounded-lg bg-white dark:bg-gray-800/80 shadow-sm overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  {mockTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer text-sm px-3 py-1 transition-all duration-200 ${
                        selectedTags.includes(tag) 
                          ? `bg-gradient-to-r ${getTagGradient(tag)} shadow-sm` 
                          : "border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      }`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div>
          <Label className="text-gray-700 dark:text-gray-300 font-medium">
            {t("images")}
          </Label>
          <div className="mt-1">
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {imageUrls.map((url, index) => (
                  <motion.div 
                    key={index} 
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-32 rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-800/50 shadow-sm">
                      <Image
                        src={url}
                        alt={`Post image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleImageUpload}
              disabled={isUploading || imageUrls.length >= 4}
              className="w-full py-8 border-dashed border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("uploading")}
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-5 w-5" />
                  {imageUrls.length === 0 ? t("addImages") : t("addMoreImages")}
                </>
              )}
            </Button>
            
            {imageUrls.length >= 4 && (
              <p className="text-xs text-amber-500 mt-1">
                {t("maxImagesReached")}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-indigo-100 dark:border-indigo-800/30">
        <Button
          type="button"
          variant="outline"
          asChild
          className="border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm rounded-lg"
        >
          <Link href="/community">
            {t("cancel")}
          </Link>
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 rounded-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {postToEdit ? t("updating") : t("publishing")}
            </>
          ) : (
            postToEdit ? t("updatePost") : t("publishPost")
          )}
        </Button>
      </div>
    </form>
  );
}
