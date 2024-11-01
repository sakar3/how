export interface StoryTemplate {
  id: string
  name: string
  description: string
  preview: string
  animation: string
}

export interface Media {
  id: string
  url: string
  type: string
  order: number
}

export interface Story {
  id: string
  title: string
  description?: string
  template: string
  media: Media[]
  createdAt: string
  user: {
    name: string
    image?: string
  }
}