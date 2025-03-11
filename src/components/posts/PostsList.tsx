
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare, Share2, Bookmark } from 'lucide-react';

interface PostAuthor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Post {
  id: string;
  content: string;
  mediaUrls: string[];
  author: PostAuthor;
  createdAt: string;
  likes?: number;
  comments?: number;
}

interface PostsListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostsListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No posts to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostItem = ({ post }: { post: Post }) => {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-xs text-muted-foreground">{timeAgo}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        {post.content && (
          <p className="whitespace-pre-line mb-4">{post.content}</p>
        )}
        
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className={`grid gap-2 ${post.mediaUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {post.mediaUrls.map((url, index) => {
              // Check if it's a video by looking at the file extension
              const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
              
              return isVideo ? (
                <video
                  key={index}
                  src={url}
                  controls
                  className="rounded-md w-full max-h-96 object-cover"
                />
              ) : (
                <img
                  key={index}
                  src={url}
                  alt={`Post media ${index}`}
                  className="rounded-md w-full max-h-96 object-cover"
                />
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.likes || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments || 0}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Bookmark className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostsList;
