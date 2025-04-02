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
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import { mockTags } from "@/mock/communityData";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

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
  
  // 如果提交成功，显示成功消息并提供导航链接
  if (isSubmitted && submittedPostId) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
            {postToEdit ? t("postUpdated") : t("postPublished")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {postToEdit ? t("postUpdatedDescription") : t("postPublishedDescription")}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href={`/community/posts/${submittedPostId}`}>
              {t("viewPost")}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/community">
              {t("backToCommunity")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{currentUser.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {postToEdit ? t("editingPost") : t("creatingPost")}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">{t("postTitle")}</Label>
          <Input
            id="title"
            placeholder={t("postTitlePlaceholder")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="content">{t("postContent")}</Label>
          <Textarea
            id="content"
            placeholder={t("postContentPlaceholder")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 min-h-[200px]"
            required
          />
        </div>
        
        <div>
          <Label>{t("tags")}</Label>
          <div className="mt-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map(tag => (
                <Badge key={tag} className="px-3 py-1">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className="ml-2 text-xs"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              {selectedTags.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("noTagsSelected")}
                </p>
              )}
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTagSelector(!showTagSelector)}
              className="text-sm"
            >
              {showTagSelector ? t("hideTags") : t("selectTags")}
            </Button>
            
            {showTagSelector && (
              <div className="mt-2 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex flex-wrap gap-2">
                  {mockTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleTagToggle(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <Label>{t("images")}</Label>
          <div className="mt-1">
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 rounded-md overflow-hidden">
                      <Image
                        src={url}
                        alt={`Post image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleImageUpload}
              disabled={isUploading || imageUrls.length >= 4}
              className="w-full py-8 border-dashed"
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
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          asChild
        >
          <Link href="/community">
            {t("cancel")}
          </Link>
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
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
