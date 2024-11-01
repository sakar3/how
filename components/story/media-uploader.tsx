"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImagePlus, X } from "lucide-react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useToast } from "@/components/ui/use-toast"

interface MediaUploaderProps {
  media: File[]
  onChange: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
}

export function MediaUploader({
  media,
  onChange,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024,
}: MediaUploaderProps) {
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (media.length + acceptedFiles.length > maxFiles) {
        toast({
          title: "Too many files",
          description: `You can only upload up to ${maxFiles} files`,
          variant: "destructive",
        })
        return
      }

      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxSize) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than ${maxSize / 1024 / 1024}MB`,
            variant: "destructive",
          })
          return false
        }
        return true
      })

      onChange([...media, ...validFiles])
    },
    [media, maxFiles, maxSize, onChange, toast]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "video/*": [".mp4", ".webm"],
    },
  })

  const removeFile = (index: number) => {
    onChange(media.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}`}
      >
        <input {...getInputProps()} />
        <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop files here, or click to select
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supports images and videos up to {maxSize / 1024 / 1024}MB
        </p>
      </div>

      {media.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((file, index) => (
            <Card key={index} className="relative p-2">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full aspect-video object-cover rounded"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full aspect-video object-cover rounded"
                  controls
                />
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}