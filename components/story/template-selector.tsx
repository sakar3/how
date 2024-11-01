"use client"

import { Card } from "@/components/ui/card"
import { templates } from "@/lib/templates"
import { StoryTemplate } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface TemplateSelectorProps {
  onSelect: (template: StoryTemplate) => void
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Choose a Template</h1>
          <p className="text-muted-foreground">Select a template to start creating your story</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
            onClick={() => onSelect(template)}
          >
            <div className="aspect-video relative bg-muted">
              <img
                src={template.preview}
                alt={template.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}