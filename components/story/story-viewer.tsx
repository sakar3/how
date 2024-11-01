"use client"

import { Story } from "@/lib/types"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { templates } from "@/lib/templates"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StoryViewerProps {
  story: Story
}

export function StoryViewer({ story }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const template = templates.find(t => t.id === story.template)
  const currentMedia = story.media[currentIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        handleNext()
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex, isTransitioning])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true)
      setCurrentIndex(currentIndex - 1)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const handleNext = () => {
    if (currentIndex < story.media.length - 1) {
      setIsTransitioning(true)
      setCurrentIndex(currentIndex + 1)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  return (
    <Card className="relative overflow-hidden group">
      <div className="aspect-video relative">
        {currentMedia.type === "image" ? (
          <img
            src={currentMedia.url}
            alt={`Story media ${currentIndex + 1}`}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              isTransitioning ? "opacity-0" : "opacity-100",
              template?.animation === "fade" && "transition-all duration-500",
              template?.animation === "slide" && "transition-transform duration-500",
              template?.animation === "zoom" && "transition-transform duration-500 hover:scale-105"
            )}
          />
        ) : (
          <video
            src={currentMedia.url}
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
          />
        )}

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleNext}
          disabled={currentIndex === story.media.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Progress indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {story.media.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 w-8 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary"
                  : "bg-primary/30"
              )}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}