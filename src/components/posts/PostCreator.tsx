
import { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Image, FileVideo, Link as LinkIcon, AtSign, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostCreatorProps {
  onPostCreated?: (post: any) => void;
}

const PostCreator = ({ onPostCreated }: PostCreatorProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleMediaSelect = (type: 'image' | 'video') => {
    if (type === 'image' && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (type === 'video' && videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setMediaFiles([...mediaFiles, ...newFiles]);

    // Create preview URLs for the selected files
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setMediaPreviewUrls([...mediaPreviewUrls, ...newPreviewUrls]);
  };

  const removeMedia = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(mediaPreviewUrls[index]);
    
    // Remove the file and its preview
    const updatedFiles = [...mediaFiles];
    updatedFiles.splice(index, 1);
    setMediaFiles(updatedFiles);
    
    const updatedPreviewUrls = [...mediaPreviewUrls];
    updatedPreviewUrls.splice(index, 1);
    setMediaPreviewUrls(updatedPreviewUrls);
  };

  const handleSubmit = async () => {
    if (!content.trim() && mediaFiles.length === 0) {
      toast({
        title: 'Empty post',
        description: 'Please add some text or media to your post.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would use Supabase to upload the files and create the post
      // For this demo, we'll simulate a successful post creation
      toast({
        title: 'Post created',
        description: 'Your post has been published successfully.',
      });

      // If the onPostCreated callback is provided, call it with the post data
      if (onPostCreated) {
        const mockPost = {
          id: Date.now().toString(),
          content,
          mediaUrls: mediaPreviewUrls,
          author: {
            id: user?.id || '',
            name: profile?.full_name || 'Anonymous',
            avatarUrl: profile?.avatar_url || '',
          },
          createdAt: new Date().toISOString(),
        };
        onPostCreated(mockPost);
      }

      // Reset form
      setContent('');
      
      // Revoke all object URLs to avoid memory leaks
      mediaPreviewUrls.forEach(url => URL.revokeObjectURL(url));
      setMediaFiles([]);
      setMediaPreviewUrls([]);
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'There was an error creating your post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
            <AvatarFallback>
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <Tabs defaultValue="post" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="post">Create Post</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="What's on your mind? Share updates, skills, or portfolio work..."
          className="min-h-24 resize-none border-0 focus-visible:ring-0 p-0 text-base md:text-sm"
          value={content}
          onChange={handleContentChange}
        />
        
        {mediaPreviewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {mediaPreviewUrls.map((url, index) => (
              <div key={index} className="relative group">
                {mediaFiles[index]?.type.startsWith('image/') ? (
                  <img 
                    src={url} 
                    alt={`Preview ${index}`} 
                    className="rounded-md object-cover w-full h-40"
                  />
                ) : (
                  <video 
                    src={url} 
                    controls 
                    className="rounded-md object-cover w-full h-40"
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeMedia(index)}
                >
                  <span className="sr-only">Remove</span>
                  <span aria-hidden>×</span>
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <input
          type="file"
          ref={videoInputRef}
          accept="video/*"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
            onClick={() => handleMediaSelect('image')}
          >
            <Image className="mr-2 h-4 w-4" />
            Image
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
            onClick={() => handleMediaSelect('video')}
          >
            <FileVideo className="mr-2 h-4 w-4" />
            Video
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            Link
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
          >
            <AtSign className="mr-2 h-4 w-4" />
            Mention
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
          >
            <Smile className="mr-2 h-4 w-4" />
            Emoji
          </Button>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || (content.trim() === '' && mediaFiles.length === 0)}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCreator;
