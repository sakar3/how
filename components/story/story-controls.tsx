"use client"

import { Story } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"

interface StoryControlsProps {
  story: Story
}

export function StoryControls({ story }: StoryControlsProps) {
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      await navigator.share({
        title: story.title,
        text: story.description,
        url: window.location.href,
      })
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Story link has been copied to your clipboard",
      })
    }
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={story.user.image} alt={story.user.name} />
          <AvatarFallback>{story.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{story.user.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}