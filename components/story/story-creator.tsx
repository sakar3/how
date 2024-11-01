"use client"

import { StoryTemplate } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MediaUploader } from "@/components/story/media-uploader"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface StoryCreatorProps {
  template: StoryTemplate
}

export function StoryCreator({ template }: StoryCreatorProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [media, setMedia] = useState<File[]>([])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || media.length === 0) {
      toast({
        title: "Missing required fields",
        description: "Please add a title and at least one media file",
        variant: "destructive",
      })
      return
    }

    // TODO: Implement story creation logic
    toast({
      title: "Story created!",
      description: "Your story has been created successfully.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Your Story</h1>
          <p className="text-muted-foreground">Using {template.name} template</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your story title"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your story (optional)"
            rows={4}
          />
        </div>

        <MediaUploader
          media={media}
          onChange={setMedia}
          maxFiles={10}
          maxSize={10 * 1024 * 1024} // 10MB
        />

        <Button type="submit" className="w-full">
          Create Story
        </Button>
      </form>
    </div>
  )
}